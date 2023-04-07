import React, { useState } from "react";
import useTable from "../../hooks/useTable";
import styles from "./playerScores.module.css";
import TableFooter from "./tableFooter.jsx";
import {Tooltip} from "@mui/material";

export default function PlayerScores({ data, rowsPerPage }) {
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);

    return (
        <>
            <table className={styles.table}>
                <thead className={styles.tableRowHeader}>
                    <tr>
                        <th className={styles.tableHeader}>

                        </th>
                        <th className={styles.tableHeader}>
                            Grade
                        </th>
                        <th className={styles.tableHeader}>
                            Map Name
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
                    </tr>
                </thead>
                <tbody>
                    {slice && slice.map && slice.map((el) => (
                        <tr className={styles.tableRowItems} key={el.id}>
                            <td className={styles.tableCell}>
                                <img src={el.image} style={{height: '52px', width: '50px', paddingTop: '2px'}} alt={"map"}/>
                            </td>
                            <td className={styles.tableCell}>
                                <img src={import.meta.env.BASE_URL + el.grade} alt={"grade"} style={{height: '52px', width: '50px'}}/>
                            </td>
                            <td className={styles.tableCell}>
                                <a href={import.meta.env.BASE_URL + "map/" + el.id} style={{textDecoration: 'none'}}>
                                    <span style={{fontSize: '20px', marginBottom: '0px', display: 'block'}}>
                                        {el.mapname}
                                    </span>
                                </a>
                                <span style={{display: 'inline-block', paddingRight: '20px', marginRight: '20px'}}>
                                    {el.maxpoints}
                                </span>
                                <span style={{padding: '-10px 0px 0px 25px', display: 'inline-block'}}>
                                    {el.date}
                                </span>
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
                                <Tooltip title={el.weightedpp}>
                                    <span style={{fontSize: '20px'}}>
                                        {el.pp}
                                    </span>
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