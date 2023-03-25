import TableMaps from "../components/tables/tableMaps";
import React, {useEffect, useState} from "react";
import CustomNavbar from "../components/navbar";
import axios from "axios";

export default function Maps() {
    const [maps, setMaps] = useState([]);
    const [isMapsSet, setIsMapsSet] = useState(false);

    let url = `${process.env.REACT_APP_API_URL}/maps`;

    useEffect(() => {
        if(!isMapsSet) {
            axios.get(url).then(res => {
                setMaps(res.data);
                setIsMapsSet(true);
            });
        }
    });

    return (
        <>
            <CustomNavbar />
            <h1>
                Ranked Maps
            </h1>
            <br/>
            <TableMaps data={maps} rowsPerPage={10} />
        </>
    );
}