import React, { useState } from "react";

import useTable from "../hooks/useTable.js";
import styles from "./tableLeaderboard.module.css";
import TableFooter from "./tableFooter.jsx";
import {Tooltip} from "@mui/material";

const TableLeaderboardCountry = ({ data, rowsPerPage }) => {
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);

    // noinspection JSUnresolvedReference
    return (
        <>
            <table className={styles.table}>
                <thead className={styles.tableRowHeader}>
                <tr>
                    <th className={styles.tableHeader}>Rank</th>
                    <th className={styles.tableHeader}>Player</th>
                    <th className={styles.tableHeader}>PP</th>
                    <th className={styles.tableHeader}>AVG Accuracy</th>
                    <th className={styles.tableHeader}>AVG Misses</th>
                </tr>
                </thead>
                <tbody>
                {slice && slice.map && slice.map((el) => (
                    <tr className={styles.tableRowItems} key={el.id}>
                        <td className={styles.tableCell}>{el.country_rank}</td>
                        <td className={styles.tableCell}><img src={el.image} style={{width: '70px', height: '70px'}} alt={"picture of " + el.name}/> <a href={process.env.PUBLIC_URL + "/profile/" + el.id} style={{textDecoration: 'none'}}>{el.name}</a></td>
                        <Tooltip title={el.points}>
                            <td className={styles.tableCell}>{el.pp}</td>
                        </Tooltip>
                        <td className={styles.tableCell}>{el.accuracy}</td>
                        <td className={styles.tableCell}>{el.misses}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
        </>
    );
};

export default TableLeaderboardCountry;