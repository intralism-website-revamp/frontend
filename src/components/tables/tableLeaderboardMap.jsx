import React, {useState} from "react";
import useTable from "../../hooks/useTable";
import styles from "./tableMaps.module.css";
import TableFooter from "./tableFooter.jsx";
import {Tooltip} from "@mui/material";

export default function TableLeaderboardMap({ data, rowsPerPage, players}) {
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);

    return (
        <>
            <table className={styles.table}>
                <thead className={styles.tableRowHeader}>
                    <tr>
                        <th className={styles.tableHeader}>
                            Rank
                        </th>
                        <th className={styles.tableHeader}>
                            Grade
                        </th>
                        <th className={styles.tableHeader}>
                            Name
                        </th>
                        <th className={styles.tableHeader}>
                            Mods
                        </th>
                        <th className={styles.tableHeader}>
                            Accuracy
                        </th>
                        <th className={styles.tableHeader}>
                            Misses
                        </th>
                        <th className={styles.tableHeader}>
                            PP
                        </th>
                        <th className={styles.tableHeader}>
                            Score
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {slice && slice.map && slice.map((el) => (
                        <tr className={styles.tableRowItems} key={el.id}>
                            <td className={styles.tableCell}>
                                {data.findIndex(x => x.player_id === el.player_id) + 1}
                            </td>
                            <td className={styles.tableCell}>
                                <img src={import.meta.env.BASE_URL + el.grade} alt={"grade"} style={{height: '52px', width: '50px'}}/>
                            </td>
                            <td className={styles.tableCell}>
                                <img src={players && players.find(x => x.id === el.player_id) && players.find(x => x.id === el.player_id).image} style={{width: '70px', height: '70px'}} alt={"player"} />
                                {' '}
                                <a href={import.meta.env.BASE_URL + "profile/" + el.player_id} style={{textDecoration: 'none'}}>
                                    {players && players.find(x => x.id === el.player_id) && players.find(x => x.id === el.player_id).name}
                                </a>
                            </td>
                            <td className={styles.tableCell}>
                                {el.hardcore ?
                                    <span style={{color: 'red'}}>
                                        Hardcore
                                    </span>
                                    : ""
                                }
                            </td>
                            <td className={styles.tableCell}>
                                <span style={{fontSize: '20px'}}>
                                    {el.accuracy}
                                </span>
                            </td>
                            <td className={styles.tableCell}>
                                <span style={{fontSize: '20px'}}>
                                    {el.misses}
                                </span>
                            </td>
                            <td className={styles.tableCell}>
                                <Tooltip title={el.points}>
                                    <span>
                                        {el.pp}
                                    </span>
                                </Tooltip>
                            </td>
                            <td className={styles.tableCell}>
                                <span>
                                    {el.score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
        </>
    );
};