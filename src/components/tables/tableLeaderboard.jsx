import React, { useState } from "react";
import useTable from "../../hooks/useTable";
import styles from "./tableLeaderboard.module.css";
import TableFooter from "./tableFooter.jsx";
import {Tooltip} from "@mui/material";

export default function TableLeaderboard({ data, rowsPerPage }) {
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);

    let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});

    return (
        <>
            <table className={styles.table}>
                <thead className={styles.tableRowHeader}>
                    <tr>
                        <th className={styles.tableHeader}>
                            Rank
                        </th>
                        <th className={styles.tableHeader}>
                            Player
                        </th>
                        <th className={styles.tableHeader}>
                            Country
                        </th>
                        <th className={styles.tableHeader}>
                            PP
                        </th>
                        <th className={styles.tableHeader}>
                            AVG Accuracy
                        </th>
                        <th className={styles.tableHeader}>
                            AVG Misses
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {slice && slice.map && slice.map((el) => (
                        <tr className={styles.tableRowItems} key={el.id}>
                            <td className={styles.tableCell}>
                                {el.rank}
                            </td>
                            <td className={styles.tableCell}>
                                <img src={el.image} style={{width: '70px', height: '70px'}} alt={"picture of " + el.name}/>
                                {" "}
                                <a href={process.env.PUBLIC_URL + "/profile/" + el.id} style={{textDecoration: 'none'}}>
                                    {el.name}
                                </a>
                            </td>
                            <td className={styles.tableCell}>
                                <Tooltip title={el.country.toUpperCase() === "NONE" ? "Unknown Country" : regionNames.of(el.country.toUpperCase())}>
                                    <a href={process.env.PUBLIC_URL + '/leaderboard/' + el.country}>
                                        <img style={{height: '42px', width: '26px'}} src={process.env.PUBLIC_URL + '/flags/' + el.country + '.svg'} alt={"image of " + el.country}/>
                                    </a>
                                </Tooltip> #{el.country_rank}
                            </td>
                            <td className={styles.tableCell}>
                                <Tooltip title={el.points}>
                                    <span>
                                        {el.pp}
                                    </span>
                                </Tooltip>
                            </td>
                            <td className={styles.tableCell}>
                                {el.accuracy}
                            </td>
                            <td className={styles.tableCell}>
                                {el.misses}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
        </>
    );
};