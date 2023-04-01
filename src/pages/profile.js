import CustomNavbar from "../components/navbar";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from 'axios';
import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Tooltip} from "@mui/material";
import styles from "./profile.module.css";
import PlayerScores from "../components/tables/playerScores";
import PlayerMissingScores from "../components/tables/playerMissingScores";
import {useAuth0} from "@auth0/auth0-react";

export default function Profile() {
    const {id} = useParams();
    const { user, getAccessTokenSilently, isLoading, isAuthenticated} = useAuth0();

    const [isInitPlayerSet, setIsInitPlayerSet] = useState(false);

    const [player, setPlayer] = useState([]);
    const [isPlayerSet, setIsPlayerSet] = useState(false);

    const [tags, setTags] = useState([]);
    const [isTagsSet, setIsTagsSet] = useState(false);

    const [userInfo, setUserInfo] = useState();
    const [isUserInfoSet, setIsUserInfoSet] = useState(false);

    let url = `${process.env.REACT_APP_API_URL}/player/update/${id}`;
    let url2 = `${process.env.REACT_APP_API_URL}/tags/${id}`;
    let url3 = `${process.env.REACT_APP_API_URL}/player/noupdate/${id}`;

    useEffect(() => {
        if(!isUserInfoSet) {
            getUserInfo();
        }
        if(!isInitPlayerSet) {
            axios.get(url3).then(res => {
                setIsInitPlayerSet(true);
                if(res.data !== null) {
                    setPlayer(res.data);
                }
            });
        } else {
            if(!isPlayerSet) {
                axios.get(url).then(res => {
                    setPlayer(res.data);
                    setIsPlayerSet(true);
                    document.getElementById("loadingIndicatorDone").innerHTML = " ";
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
        textRotation = 'scale(1, -1)';
    }

    function SwitchMissingScores() {
        document.getElementById("missingScores").classList.toggle(styles.hidden);
        document.getElementById("missingScoresDownArrow").classList.toggle(styles.hidden);
        document.getElementById("missingScoresUpArrow").classList.toggle(styles.hidden);
    }

    const getUserInfo = async () => {
        if(isLoading || !isAuthenticated) {
            return;
        }

        const accessToken = await getAccessTokenSilently();

        const config = {
            url: `${process.env.REACT_APP_API_URL}/userInfo/` + user.email,
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        };

        let res = await axios(config);
        setIsUserInfoSet(true);
        setUserInfo(res.data);
        console.log("user info set");
    };

    return(
        <div style={{transform: textRotation}}>
            <CustomNavbar></CustomNavbar>
            <Container>
                <Row>
                    <Col xs={3}>
                        <img src={player.picture} style={{borderRadius: '50%'}} alt={"player"}/>
                        <br/>
                    </Col>
                    <Col xs={7}>
                        <h1>
                            {player.name}
                            {userInfo && userInfo.steam_id === id &&
                                <span style={{fontSize: "15px"}}>
                                    {" "}(you)
                                </span>
                            }
                        </h1>
                        {tags && tags.length >= 1 &&
                            <span className={styles.firstBadge}>
                                {tags[0].name}
                            </span>
                        }
                        {tags && tags.map && tags.length > 1 && tags.slice((tags.length * -1) + 1).map(x =>
                            <span className={styles.badge}>
                                {x.name}
                            </span>
                        )}
                        <div style={{whiteSpace: 'nowrap'}}>
                            <span style={{fontSize: '30px', whiteSpace: 'nowrap'}}>
                                #{player.globalRank}
                            </span>
                            <span style={{whiteSpace: 'nowrap', paddingLeft: '30px'}}>
                                <Tooltip title={player.country}>
                                    <a href={process.env.PUBLIC_URL + '/leaderboard/' + player.countryShort}>
                                        <img style={{height: '34px', width: '20px', paddingBottom: "10px"}} src={process.env.PUBLIC_URL + '/flags/' + player.countryShort + '.svg'} alt={"country flag"}/>
                                    </a>
                                </Tooltip> #{player.countryRank}
                            </span>
                        </div>
                        <div style={{marginBottom: "10px"}}>
                            <Tooltip title={player.points}>
                                <span>
                                    {player.weightedpp}pp
                                </span>
                            </Tooltip>
                        </div>
                        <a href={"https://intralism.khb-soft.ru/?player=" + id} target='_blank' rel='noreferrer'>
                            <img src={process.env.PUBLIC_URL + "/official_intralism.png"} alt={"steam"} style={{height: '25px', width: '25px'}}/>
                        </a>
                        <a style={{paddingLeft: '15px'}} href={"https://steamcommunity.com/profiles/" + id} target='_blank' rel='noreferrer'>
                            <img src={process.env.PUBLIC_URL + "/steam.png"} alt={"steam"} style={{height: '25px', width: '25px'}}/>
                        </a>
                    </Col>
                    <Col xs={2}>
                        <br/>
                        <br/>
                        <img src={process.env.PUBLIC_URL + "/Grade_SS.svg"} alt="grade ss" style={{width: "35px", height: "35px", marginRight: "5px"}}/>
                        {player && player.scores && player.scores.filter(x => x.grade.endsWith("SS.svg")).length}
                        <img src={process.env.PUBLIC_URL + "/Grade_S.svg"} alt="grade s" style={{width: "35px", height: "35px", marginLeft: "10px", marginRight: "5px"}}/>
                        {player && player.scores && player.scores.filter(x => x.grade.endsWith("_S.svg")).length}
                        <img src={process.env.PUBLIC_URL + "/Grade_A.svg"} alt="grade a" style={{width: "35px", height: "35px", marginLeft: "10px", marginRight: "5px"}}/>
                        {player && player.scores && player.scores.filter(x => x.grade.endsWith("A.svg")).length}
                        <br/>
                        <img src={process.env.PUBLIC_URL + "/Grade_B.svg"} alt="grade b" style={{width: "35px", height: "35px", marginLeft: "10px", marginRight: "5px"}}/>
                        {player && player.scores && player.scores.filter(x => x.grade.endsWith("B.svg")).length}
                        <img src={process.env.PUBLIC_URL + "/Grade_C.svg"} alt="grade c" style={{width: "35px", height: "35px", marginLeft: "10px", marginRight: "5px"}}/>
                        {player && player.scores && player.scores.filter(x => x.grade.endsWith("C.svg")).length}
                        <img src={process.env.PUBLIC_URL + "/Grade_F.svg"} alt="grade f" style={{width: "35px", height: "35px", marginLeft: "10px", marginRight: "5px"}}/>
                        {player && player.scores && player.scores.filter(x => x.grade.endsWith("F.svg")).length}
                        <br/>
                        <br/>
                        <span style={{paddingLeft: "30px"}}>
                            {"Avg Acc: " + player.accuracy + "%"}
                        </span>
                        <span style={{display: "block", paddingLeft: "30px"}}>
                            {"Avg Misses: " + player.misses}
                        </span>
                    </Col>
                </Row>
            </Container>
            <div style={{marginBottom: "25px"}}>
                <span id={"loadingIndicatorDone"}>
                    Loading
                </span>
            </div>
            {player.scores &&
                <PlayerScores data={player.scores} rowsPerPage={10} />
            }
            {player && player.missingScores && player.missingScores.length > 1 &&
                <>
                    <br/>
                    <h3 style={{textAlign: "center"}}>
                        Missing Scores
                    </h3>
                    <img id={"missingScoresDownArrow"} src={process.env.PUBLIC_URL + "/arrow-down-solid.svg"} style={{height: "30px", width: "30px", position: "absolute", left: "49%"}} onClick={SwitchMissingScores} alt={"down arrow"}/>
                    <img id={"missingScoresUpArrow"} src={process.env.PUBLIC_URL + "/arrow-up-solid.svg"} style={{height: "30px", width: "30px", position: "absolute", left: "49%"}} onClick={SwitchMissingScores} className={styles.hidden} alt={"up arrow"}/>
                    <br/>
                    <br/>
                    <div className={styles.hidden} id={"missingScores"}>
                        <PlayerMissingScores data={player.missingScores} rowsPerPage={10} />
                    </div>
                </>
            }
        </div>
    );
}