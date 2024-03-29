import React, {useEffect, useState} from "react";
import TableLeaderboard from "../components/tables/tableLeaderboard.jsx";
import CustomNavbar from "../components/navbar";
import axios from "axios";

export default function Leaderboard() {
    const [players, setPlayers] = useState([]);
    const [arePlayersSet, setArePlayersSet] = useState(false);

    let url = `${import.meta.env.VITE_API_URL}/leaderboard/global`;

    useEffect(() => {
        if(!arePlayersSet) {
            axios.get(url).then(res => {
                setPlayers(res.data);
                setArePlayersSet(true);
            });
        }
    });

    return (
        <>
            <CustomNavbar/>
            <h1>
                Global Ranking
            </h1>
            <br/>
            <TableLeaderboard data={players} rowsPerPage={10} />
        </>
    );
}