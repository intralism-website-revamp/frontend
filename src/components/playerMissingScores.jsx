import React, { useState } from "react";
import useTable from "../hooks/useTable.js";
import styles from "./playerScores.module.css";
import TableFooter from "./tableFooter.jsx";

const PlayerMissingScores = ({ data, rowsPerPage }) => {
    const [page, setPage] = useState(1);
    let { slice, range } = useTable(data, page, rowsPerPage);

    // noinspection JSUnresolvedReference
    return (
        <>
            <table className={styles.table}>
                <thead className={styles.tableRowHeader}>
                <tr>
                    <th className={styles.tableHeader}></th>
                    <th className={styles.tableHeader}>Map Name</th>
                    <th className={styles.tableHeader}>PP</th>
                </tr>
                </thead>
                <tbody>
                {slice && slice.map && slice.map((el) => (
                    <tr className={styles.tableRowItems} key={el.id}>
                        <td className={styles.tableCell}><img src={el.image} style={{height: '52px', width: '50px', paddingTop: '2px'}} alt={"map"}/></td>
                        <td className={styles.tableCell}>
                            <a href={process.env.PUBLIC_URL + "/map/" + el.id} style={{textDecoration: 'none'}}>
                                <p style={{fontSize: '20px', marginBottom: '0px'}}>{el.name}</p>
                            </a>
                            <p style={{display: 'inline', paddingRight: '20px', marginRight: '20px'}}>{el.points}</p>
                        </td>
                        <td className={styles.tableCell}>
                            <p style={{fontSize: '20px'}}>{el.pp}</p>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
        </>
    );
};

export default PlayerMissingScores;