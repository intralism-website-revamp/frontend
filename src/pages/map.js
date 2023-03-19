import CustomNavbar from "../components/navbar";
import TableLeaderboardMap from "../components/tableLeaderboardMap";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Tooltip} from "@mui/material";

export default function Map() {
    const {id} = useParams();

    const [map, setMap] = useState([]);
    const [isMapSet, setIsMapSet] = useState(false);

    const [scores, setScores] = useState([]);
    const [isScoresSet, setIsScoresSet] = useState(false);

    const [players, setPlayers] = useState([]);
    const [isPlayersSet, setIsPlayersSet] = useState(false);

    let url, url2, url3;
    if(process.env.REACT_APP_STATE === "TEST") {
        url = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/map/` + id;
        url2 = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/scores/` + id;
        url3 = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/leaderboard`;
    } else {
        url = `https://${process.env.REACT_APP_API_URL}/map/` + id;
        url2 = `https://${process.env.REACT_APP_API_URL}/scores/` + id;
        url3 = `https://${process.env.REACT_APP_API_URL}/leaderboard`;
    }

    useEffect(() => {
        if(!isMapSet) {
            axios.get(url).then(res => {
                setMap(res.data);
                setIsMapSet(true);
            });
        }

        if(!isScoresSet) {
            axios.get(url2).then(res => {
                setScores(res.data);
                setIsScoresSet(true);
            });
        }

        if(!isPlayersSet) {
            axios.get(url3).then(res => {
                setIsPlayersSet(true);
                if(res.data !== null) {
                    setPlayers(res.data);
                }
            });
        }
    });

    return(
        <>
            <CustomNavbar></CustomNavbar>
            <Container style={{margin: '0'}}>
                <Row>
                    <Col xs={3}>
                        {map.image &&
                            <img src={map.image} alt={"map"} style={{width: '250px', height: '250px'}}/>
                        }
                    </Col>
                    <Col xs={9} style={{fontSize: '30px'}}>
                        <h1>{map.name}</h1>
                        <span>by <a href={process.env.PUBLIC_URL + '/profile/' + map.author}>{players && players.find(x => x.id === map.author) ? players.find(x => x.id === map.author).name : map.author}</a></span><br/>
                        <span>{map.status}</span><br/>
                        <Tooltip title={map.points}>
                            <span>{map.pp}pp</span>
                        </Tooltip>
                    </Col>
                </Row>
            </Container>
            <br/>
            <TableLeaderboardMap data={scores} rowsPerPage={10} players={players}/>
        </>
    )
}