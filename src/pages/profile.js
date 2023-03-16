import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from "../components/navbar";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from 'axios';
import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Tooltip} from "@mui/material";

export default function Profile() {
    const {id} = useParams();
    const [player, setPlayer] = useState([]);
    const [isPlayerSet, setIsPlayerSet] = useState(false);

    //for testing
    const url = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/player/${id}`;

    //for build
    //const url = `https://${process.env.REACT_APP_API_URL}/player/${id}`;

    useEffect(() => {
        if(!isPlayerSet) {
            axios.get(url).then(res => {
                setPlayer(res.data);
                setIsPlayerSet(true);
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
                            <img src={player.picture} style={{borderRadius: '50%', transform: textRotation}}/>
                        </Col>
                        <Col xs={2}>
                            <h1 style={{transform: textRotation}}>{player.name}</h1>
                            <p style={{transform: textRotation, fontSize: '30px'}}>#{player.globalRank}</p>
                            <p style={{transform: textRotation}}>
                                <Tooltip title={player.country}>
                                    <img style={{height: '34px', width: '20px'}} src={process.env.PUBLIC_URL + '/flags/' + player.countryShort + '.svg'} />
                                </Tooltip> #{player.countryRank}
                            </p>
                            <p style={{transform: textRotation}}>{player.weightedpp}</p>
                        </Col>
                        <Col xs={6}></Col>
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
                            <Col md={1}><img src={x.image} style={{height: '52px', width: '50px', paddingTop: '2px', transform: textRotation}}/></Col>
                            <Col md={1}><img src={process.env.PUBLIC_URL + '/' + x.grade} style={{transform: textRotation}}/></Col>
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