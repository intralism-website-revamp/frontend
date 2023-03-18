import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from "../components/navbar";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from 'axios';
import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Tooltip} from "@mui/material";
import styles from "./profile.module.css";
import PlayerScores from "../components/playerScores";

export default function Profile() {
    const {id} = useParams();

    const [isInitPlayerSet, setIsInitPlayerSet] = useState(false);

    const [player, setPlayer] = useState([]);
    const [isPlayerSet, setIsPlayerSet] = useState(false);

    const [tags, setTags] = useState([]);
    const [isTagsSet, setIsTagsSet] = useState(false);

    let url, url2, url3;

    if(process.env.REACT_APP_STATE === "TEST") {
        url = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/player/${id}`;
        url2 = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/tags/${id}`;
        url3 = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/playerNoUpdate/${id}`;
    } else {
        url = `https://${process.env.REACT_APP_API_URL}/player/${id}`;
        url2 = `https://${process.env.REACT_APP_API_URL}/tags/${id}`;
        url3 = `https://${process.env.REACT_APP_API_URL}/playerNoUpdate/${id}`;
    }

    useEffect(() => {
        if(!isInitPlayerSet) {
            axios.get(url3).then(res => {
                setPlayer(res.data);
                setIsInitPlayerSet(true);
                console.log(res.data);
            });
        } else {
            if(!isPlayerSet) {
                axios.get(url).then(res => {
                    setPlayer(res.data);
                    setIsPlayerSet(true);
                });
            }
            if(!isTagsSet) {
                axios.get(url2).then(res => {
                    setTags(res.data);
                    setIsTagsSet(true);
                });
            }
        }
    });

    let textRotation = '';

    if(id === '76561198815634731') {
        textRotation = 'scale(1, -1)'
    }

    return(
        <div>
            <CustomNavbar></CustomNavbar>
            <Container>
                <Row>
                    <Col xs={3}>
                        <img src={player.picture} style={{borderRadius: '50%', transform: textRotation}} alt={"player"}/><br/>
                    </Col>
                    <Col xs={8}>
                        <h1 style={{transform: textRotation}}>{player.name}</h1>
                        {tags && tags.length && tags.length >= 1 &&
                            <span className={styles.firstBadge}>{tags[0].name}</span>
                        }
                        {tags && tags.map && tags.length > 1 && tags.slice((tags.length * -1) + 1).map(x =>
                            <span className={styles.badge}>{x.name}</span>
                        )}
                        <div style={{transform: textRotation, whiteSpace: 'nowrap'}}>
                            <span style={{fontSize: '30px', whiteSpace: 'nowrap'}}>
                                #{player.globalRank}
                            </span>
                            <span style={{whiteSpace: 'nowrap', paddingLeft: '30px'}}>
                                <Tooltip title={player.country}>
                                    <a href={process.env.PUBLIC_URL + '/leaderboard/' + player.countryShort}><img style={{height: '34px', width: '20px'}} src={process.env.PUBLIC_URL + '/flags/' + player.countryShort + '.svg'} alt={"country flag"}/></a>
                                </Tooltip> #{player.countryRank}
                            </span>
                        </div>
                        <Tooltip title={player.points}>
                            <p style={{transform: textRotation}}>{player.weightedpp}pp</p>
                        </Tooltip>
                        <a href={"https://intralism.khb-soft.ru/?player=" + id} target='_blank'><img src={process.env.PUBLIC_URL + "/official_intralism.png"} alt={"steam"} style={{height: '25px', width: '25px'}}/></a>
                        <a style={{paddingLeft: '15px'}} href={"https://steamcommunity.com/profiles/" + id} target='_blank'><img src={process.env.PUBLIC_URL + "/steam.png"} alt={"steam"} style={{height: '25px', width: '25px'}}/></a>
                    </Col>
                </Row>
            </Container>
            <br/>
            {player.scores &&
                <PlayerScores data={player.scores} rowsPerPage={10} />
            }
        </div>
    );
}