import React, {useEffect, useState} from "react";
import CustomNavbar from "../components/navbar";
import axios from "axios";
import {useParams} from "react-router-dom";
import TableLeaderboardCountry from "../components/tables/tableLeaderboardCountry";

export default function LeaderboardCountry() {
    const {country} = useParams();

    const [players, setPlayers] = useState([]);
    const [arePlayersSet, setArePlayersSet] = useState(false);

    let url = `${import.meta.env.VITE_API_URL}/leaderboard/country/` + country;

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
        try {
            countryName = regionNames.of(country.toUpperCase());
        } catch(err) {
            countryName = "Country doesn't exist";
        }
    }

    return (
        <>
            <CustomNavbar/>
            <h1>
                Country Ranking: {" "}
                <img style={{height: '42px', width: '26px'}} src={import.meta.env.BASE_URL + 'flags/' + country.toLowerCase() + '.svg'} alt={"flag of " + countryName}/>
                {" "}{countryName}
            </h1>
            <br/>
            <TableLeaderboardCountry data={players} rowsPerPage={10} />
        </>

    );
}