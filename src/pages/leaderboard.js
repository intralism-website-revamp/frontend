import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from "react";
import styles from "./leaderboard.module.css";
import TableLeaderboard from "../components/tableLeaderboard.jsx";
import CustomNavbar from "../components/navbar";
import axios from "axios";

export default function Leaderboard() {
    const [players, setPlayers] = useState([]);
    const [arePlayersSet, setArePlayersSet] = useState(false);

    //for testing
    const url = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/leaderboard`;

    //for build
    //const url = `https://${process.env.REACT_APP_API_URL}/leaderboard`;

    useEffect(() => {
        if(!arePlayersSet) {
            axios.get(url).then(res => {
                setPlayers(res.data);
                setArePlayersSet(true);
                console.log(res.data);
            });
        }
    });

    return (
        <>
            <CustomNavbar/>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <TableLeaderboard data={players} rowsPerPage={10} />
                </div>
            </div>
        </>

    );
}