import React, { useState } from "react";
import useTable from "../hooks/useTable.js";
import styles from "./playerScores.module.css";
import TableFooter from "./tableFooter.jsx";
import {Tooltip} from "@mui/material";

const PlayerScores = ({ data, rowsPerPage }) => {
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);

    // noinspection JSUnresolvedReference
    return (
        <>
            <table className={styles.table}>
                <thead className={styles.tableRowHeader}>
                <tr>
                    <th className={styles.tableHeader}></th>
                    <th className={styles.tableHeader}>Grade</th>
                    <th className={styles.tableHeader}>Map Name</th>
                    <th className={styles.tableHeader}>Mods</th>
                    <th className={styles.tableHeader}>Accuracy</th>
                    <th className={styles.tableHeader}>Misses</th>
                    <th className={styles.tableHeader}>PP</th>
                </tr>
                </thead>
                <tbody>
                {slice && slice.map && slice.map((el) => (
                    <tr className={styles.tableRowItems} key={el.id}>
                        <td className={styles.tableCell}><img src={el.image} style={{height: '52px', width: '50px', paddingTop: '2px'}} alt={"map"}/></td>
                        <td className={styles.tableCell}><img src={process.env.PUBLIC_URL + '/' + el.grade} alt={"grade"} style={{height: '52px', width: '50px'}}/></td>
                        <td className={styles.tableCell}>
                            <a href={process.env.PUBLIC_URL + "/map/" + el.id} style={{textDecoration: 'none'}}>
                                <p style={{fontSize: '20px', marginBottom: '0px'}}>{el.mapname}</p>
                            </a>
                            <p style={{display: 'inline', paddingRight: '20px', marginRight: '20px'}}>{el.maxpoints}</p>
                            <p style={{padding: '-10px 0px 0px 25px', display: 'inline'}}>{el.date}</p>
                            </td>
                        <td className={styles.tableCell}>{el.hardcore ? <p style={{color: 'red'}}>Hardcore</p> : ""}</td>
                        <td className={styles.tableCell}><p style={{fontSize: '20px'}}>{el.accuracy}</p></td>
                        <td className={styles.tableCell}><p style={{fontSize: '20px'}}>{el.misses}</p></td>
                        <td className={styles.tableCell}>
                            <Tooltip title={el.weightedpp}>
                                <p style={{fontSize: '20px'}}>{el.pp}</p>
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

export default PlayerScores;