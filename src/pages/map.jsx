import CustomNavbar from "../components/navbar";
import TableLeaderboardMap from "../components/tables/tableLeaderboardMap";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import {Tooltip} from "@mui/material";

export default function Map() {
    const {id} = useParams();

    const [map, setMap] = useState([]);
    const [isMapSet, setIsMapSet] = useState(false);

    const [scores, setScores] = useState([]);
    const [isScoresSet, setIsScoresSet] = useState(false);

    const [players, setPlayers] = useState([]);
    const [isPlayersSet, setIsPlayersSet] = useState(false);

    let url = `${import.meta.env.VITE_API_URL}/maps/byid/` + id;
    let url2 = `${import.meta.env.VITE_API_URL}/maps/scores/` + id;
    let url3 = `${import.meta.env.VITE_API_URL}/leaderboard/global`;

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
            <CustomNavbar />
            <Container style={{margin: '0'}}>
                <Row>
                    <Col xs={3}>
                        {map.image &&
                            <img src={map.image} alt={"map"} style={{width: '250px', height: '250px'}} />
                        }
                    </Col>
                    <Col xs={9} style={{fontSize: '30px'}}>
                        <h1>
                            {map.name}
                        </h1>
                        <span>
                            by {" "}
                            <a href={import.meta.env.BASE_URL + 'profile/' + map.author}>
                                {players && players.find(x => x.id === map.author) ? players.find(x => x.id === map.author).name : map.author}
                            </a>
                        </span>
                        <br/>
                        <span>
                            {map.status}
                        </span>
                        <br/>
                        <Tooltip title={map.points}>
                            <span>
                                {map.pp}pp
                            </span>
                        </Tooltip>
                    </Col>
                </Row>
            </Container>
            <br/>
            <TableLeaderboardMap data={scores} rowsPerPage={10} players={players}/>
        </>
    )
}