import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from "react";
import CustomNavbar from "../components/navbar";
import axios from "axios";
import {useParams} from "react-router-dom";
import TableLeaderboardCountry from "../components/tableLeaderboardCountry";
export default function LeaderboardCountry() {
    const {country} = useParams();

    const [players, setPlayers] = useState([]);
    const [arePlayersSet, setArePlayersSet] = useState(false);

    let url;

    if(process.env.REACT_APP_STATE === "TEST") {
        url = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/leaderboard/` + country;
    } else {
        url = `https://${process.env.REACT_APP_API_URL}/leaderboard/` + country;
    }

    useEffect(() => {
        if(!arePlayersSet) {
            axios.get(url).then(res => {
                setPlayers(res.data);
                setArePlayersSet(true);
            });
        }
    });

    let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
    let countryName;

    if(country.toLowerCase() === "none") {
        countryName = "Unknown Country";
    } else {
        countryName = regionNames.of(country.toUpperCase());
    }

    return (
        <>
            <CustomNavbar/>
            <h1>Country Ranking: <img style={{height: '42px', width: '26px'}} src={process.env.PUBLIC_URL + '/flags/' + country.toLowerCase() + '.svg'} alt={"flag of " + countryName}/> {countryName}</h1>
            <br/>
            <TableLeaderboardCountry data={players} rowsPerPage={10} />
        </>

    );
}