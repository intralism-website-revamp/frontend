import React, {useEffect, useState} from "react";
import useTable from "../hooks/useTable.js";
import styles from "./tableMaps.module.css";
import TableFooter from "./tableFooter.jsx";
import {Tooltip} from "@mui/material";
import axios from "axios";

const TableMaps = ({ data, rowsPerPage }) => {
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);

    const [players, setPlayers] = useState([]);
    const [isPlayersSet, setIsPlayersSet] = useState(false);

    let url;

    if(process.env.REACT_APP_STATE === "TEST") {
        url = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/leaderboard`;
    } else {
        url = `https://${process.env.REACT_APP_API_URL}/leaderboard`;
    }

    useEffect(() => {
        if(!isPlayersSet) {
            axios.get(url).then(res => {
                setIsPlayersSet(true);
                if(res.data !== null) {
                    setPlayers(res.data);
                }
            });
        }
    });

    // noinspection JSUnresolvedReference
    return (
        <>
            <table className={styles.table}>
                <thead className={styles.tableRowHeader}>
                <tr>
                    <th className={styles.tableHeader}></th>
                    <th className={styles.tableHeader}>Name</th>
                    <th className={styles.tableHeader}>PP</th>
                    <th className={styles.tableHeader}>Status</th>
                    <th className={styles.tableHeader}>Author</th>
                </tr>
                </thead>
                <tbody>
                {slice && slice.map && slice.map((el) => (
                    <tr className={styles.tableRowItems} key={el.id}>
                        <td className={styles.tableCell}><img src={el.image} style={{width: '70px', height: '70px'}} alt={"cover"}/></td>
                        <td className={styles.tableCell}><a href={process.env.PUBLIC_URL + "/map/" + el.id}>{el.name}</a></td>
                        <td className={styles.tableCell}>
                            <Tooltip title={el.points}>
                                <p>{el.pp}</p>
                            </Tooltip>
                        </td>
                        <td className={styles.tableCell}>{el.status}</td>
                        <td className={styles.tableCell}>
                            <a href={process.env.PUBLIC_URL + "/profile/" + el.author} style={{textDecoration: 'none'}}>
                                {players && players.find(x => x.id === el.author) === undefined ? el.author : players.find(x => x.id === el.author).name}
                            </a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
        </>
    );
};

export default TableMaps;