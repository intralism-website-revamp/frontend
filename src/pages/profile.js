import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from "../components/navbar";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from 'axios';
import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Tooltip} from "@mui/material";
import styles from "./profile.module.css";

export default function Profile() {
    const {id} = useParams();
    const [player, setPlayer] = useState([]);
    const [isPlayerSet, setIsPlayerSet] = useState(false);

    const [tags, setTags] = useState([]);
    const [isTagsSet, setIsTagsSet] = useState(false);

    let url;
    let url2;

    if(process.env.REACT_APP_STATE === "TEST") {
        url = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/player/${id}`;
        url2 = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/tags/${id}`;
    } else {
        url = `https://${process.env.REACT_APP_API_URL}/player/${id}`;
        url2 = `https://${process.env.REACT_APP_API_URL}/tags/${id}`;
    }

    useEffect(() => {
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
                            <a href={"https://intralism.khb-soft.ru/?player=" + id}><img src={process.env.PUBLIC_URL + "/official_intralism.png"} alt={"steam"} style={{height: '25px', width: '25px'}}/></a>
                            <a style={{paddingLeft: '15px'}} href={"https://steamcommunity.com/id/" + id}><img src={process.env.PUBLIC_URL + "/steam.png"} alt={"steam"} style={{height: '25px', width: '25px'}}/></a>
                        </Col>
                        <Col xs={8}>
                            <h1 style={{transform: textRotation}}>{player.name}</h1>
                            {tags && tags.length && tags.length >= 1 &&
                                <span className={styles.firstBadge}>{tags[0].name}</span>
                            }
                            {tags && tags.map && tags.length > 1 && tags.slice((tags.length * -1) + 1).map(x =>
                                <span className={styles.badge}>{x.name}</span>
                            )}

                            <p style={{transform: textRotation, fontSize: '30px'}}>#{player.globalRank}</p>
                            <p style={{transform: textRotation}}>
                                <Tooltip title={player.country}>
                                    <a href={process.env.PUBLIC_URL + '/leaderboard/' + player.countryShort}><img style={{height: '34px', width: '20px'}} src={process.env.PUBLIC_URL + '/flags/' + player.countryShort + '.svg'} alt={"country flag"}/></a>
                                </Tooltip> #{player.countryRank}
                            </p>
                            <Tooltip title={player.points}>
                                <p style={{transform: textRotation}}>{player.weightedpp}pp</p>
                            </Tooltip>
                        </Col>

                    </Row>
                </Container>
                <br/>
                <Container>
                    <Row xs={12} className="border-top border-start border-end" style={{height: '40px'}}>
                        <Col md={2} style={{transform: textRotation}}></Col>
                        <Col md={6} style={{transform: textRotation}}>Map Name</Col>
                        <Col md={1} style={{transform: textRotation}}></Col>
                        <Col md={1} style={{transform: textRotation}}>Accuracy</Col>
                        <Col md={1} style={{transform: textRotation}}>Misses</Col>
                        <Col md={1} style={{transform: textRotation}}>PP</Col>
                    </Row>
                </Container>

                {player.scores && player.scores.map && player.scores.map(x =>
                    <Container>
                        <Row xs={12} className="border-top border-start border-end">
                            <Col md={1}><img src={x.image} style={{height: '52px', width: '50px', paddingTop: '2px', transform: textRotation}} alt={"map"}/></Col>
                            <Col md={1}><img src={process.env.PUBLIC_URL + '/' + x.grade} style={{transform: textRotation}} alt={"grade"}/></Col>
                            <Col md={6}><p style={{fontSize: '20px', marginBottom: '0px', transform: textRotation}}>{x.mapname}</p><p style={{display: 'inline', paddingRight: '20px', transform: textRotation}}>{x.maxpoints}</p><p style={{padding: '-10px 0px 0px 25px', display: 'inline', transform: textRotation}}>{x.date}</p></Col>
                            <Col md={1} style={{transform: textRotation}}>{x.hardcore && <p style={{color: 'red'}}>Hardcore</p>}</Col>
                            <Col md={1}><p style={{fontSize: '20px', transform: textRotation}}>{x.accuracy}</p></Col>
                            <Col md={1}><p style={{fontSize: '20px', transform: textRotation}}>{x.misses}</p></Col>
                            <Col md={1}>
                                <Tooltip title={x.weightedpp}>
                                    <p style={{fontSize: '20px', transform: textRotation}}>{x.pp}</p>
                                </Tooltip>
                            </Col>
                        </Row>
                    </Container>
                    )
                }
        </div>
    );
}