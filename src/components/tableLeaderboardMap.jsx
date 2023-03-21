import React, {useState} from "react";
import useTable from "../hooks/useTable.js";
import styles from "./tableMaps.module.css";
import TableFooter from "./tableFooter.jsx";
import {Tooltip} from "@mui/material";

const TableLeaderboardMap = ({ data, rowsPerPage, players}) => {
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);

    // noinspection JSUnresolvedReference
    return (
        <>
            <table className={styles.table}>
                <thead className={styles.tableRowHeader}>
                <tr>
                    <th className={styles.tableHeader}>Rank</th>
                    <th className={styles.tableHeader}>Grade</th>
                    <th className={styles.tableHeader}>Name</th>
                    <th className={styles.tableHeader}>Mods</th>
                    <th className={styles.tableHeader}>Accuracy</th>
                    <th className={styles.tableHeader}>Misses</th>
                    <th className={styles.tableHeader}>PP</th>
                </tr>
                </thead>
                <tbody>
                {slice && slice.map && slice.map((el) => (
                    <tr className={styles.tableRowItems} key={el.id}>
                        <td className={styles.tableCell}>{data.findIndex(x => x.player_id === el.player_id) + 1}</td>
                        <td className={styles.tableCell}><img src={process.env.PUBLIC_URL + '/' + el.grade} alt={"grade"} style={{height: '52px', width: '50px'}}/></td>
                        <td className={styles.tableCell}>
                            <img src={players && players.find(x => x.id === el.player_id) && players.find(x => x.id === el.player_id).image} style={{width: '70px', height: '70px'}} alt={"player"}/>{' '}
                            <a href={process.env.PUBLIC_URL + "/profile/" + el.player_id} style={{textDecoration: 'none'}}>
                                {players && players.find(x => x.id === el.player_id) && players.find(x => x.id === el.player_id).name}
                            </a>
                        </td>
                        <td className={styles.tableCell}>{el.hardcore ? <p style={{color: 'red'}}>Hardcore</p> : ""}</td>
                        <td className={styles.tableCell}><p style={{fontSize: '20px'}}>{el.accuracy}</p></td>
                        <td className={styles.tableCell}><p style={{fontSize: '20px'}}>{el.misses}</p></td>
                        <td className={styles.tableCell}>
                            <Tooltip title={el.points}>
                                <p>{el.pp}</p>
                            </Tooltip>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
        </>
    );
};

export default TableLeaderboardMap;