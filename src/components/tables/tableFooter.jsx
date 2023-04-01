import React, {useEffect, useState} from "react";
import styles from "./tableFooter.module.css";

const TableFooter = ({ range, setPage, page, slice }) => {
    const [actualRange, setActualRange] = useState([]);

    useEffect(() => {
        if (slice.length < 1 && page !== 1) {
            setPage(page - 1);
        }

        let tempRange = [];
        let startPoint = parseInt(page) - 5;
        let endPoint = startPoint + 10;

        if(startPoint < 0) {
            startPoint = 0;
            endPoint = 10;
        } else if(endPoint > range.length) {
            endPoint = range[range.length - 1];
        }

        while(startPoint < endPoint) {
            if(startPoint > range.length - 1) {
                break;
            }
            tempRange.push(range[startPoint]);
            startPoint++;
        }

        setActualRange(tempRange);
    }, [slice, page, setPage, range]);
    

    return (
        <div className={styles.tableFooter}>
            {actualRange && actualRange.map((el, index) => (
                <button
                    key={index}
                    className={`${styles.button} ${
                        page === el ? styles.activeButton : styles.inactiveButton
                    }`}
                    onClick={() => setPage(el)}
                >
                    {el}
                </button>
            ))}
        </div>
    );
};

export default TableFooter;