import React, {useEffect, useState} from "react";
import useTable from "../../hooks/useTable";
import styles from "./tableMaps.module.css";
import TableFooter from "./tableFooter.jsx";
import {Tooltip} from "@mui/material";
import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";
import Popup from "reactjs-popup";

export default function TableMaps({ data, rowsPerPage }) {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();

    const [permitted, setPermitted] = useState();
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(data, page, rowsPerPage);

    const [players, setPlayers] = useState([]);
    const [isPlayersSet, setIsPlayersSet] = useState(false);

    let formDeleteDefaultValues = {
        removeReason: '',
        removedBy: ''
    };

    let formEditDefaultValues = {
        name: '',
        points: '',
        score: '',
        status: '',
        image: '',
    };

    const [formDeleteValue, setFormDeleteValue] = useState(formDeleteDefaultValues);
    const [formEditValue, setFormEditValue] = useState(formEditDefaultValues);

    let url = `${process.env.REACT_APP_API_URL}/leaderboard/global`;

    useEffect(() => {
        if(!isPlayersSet) {
            axios.get(url).then(res => {
                setIsPlayersSet(true);
                if(res.data !== null) {
                    setPlayers(res.data);
                }
            });
        }
        if(isAuthenticated) {
            getPermitted();
        }
    });

    const getPermitted = async () => {
        const accessToken = await getAccessTokenSilently();

        const config = {
            url: `${process.env.REACT_APP_API_URL}/permission/map`,
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        };

        let res = await axios(config);
        setPermitted(res.data);
    };

    const handleDeleteMap = async(e) => {
        const formData = new FormData();
        formData.append("removeReason", formDeleteValue.removeReason);
        formData.append("removedBy", formDeleteValue.removedBy);
        formData.append("mapId", e.target.dataset.mapid);
        formData.append("mapName", e.target.dataset.mapname);
        formData.append("mapImage", e.target.dataset.mapimage);

        const accessToken = await getAccessTokenSilently();

        try {
            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}/maps/remove`,
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${accessToken}`
                },
            });

            ClearFormData();
        } catch(error) {
            console.log(error)
        }
    }

    const handleEditMap = async(e) => {
        const formData = new FormData();
        formData.append("name", formEditValue.name);
        formData.append("status", formEditValue.status);
        formData.append("score", formEditValue.score);
        formData.append("points", formEditValue.points);
        formData.append("image", formEditValue.image);
        formData.append("mapId", e.target.dataset.mapid);

        const accessToken = await getAccessTokenSilently();

        try {
            await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}/maps/edit`,
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${accessToken}`
                },
            });

            ClearFormData();
        } catch(error) {
            console.log(error)
        }
    }

    function ClearFormData() {
        setFormDeleteValue(formDeleteDefaultValues);
        setFormEditValue(formEditDefaultValues);
    }

    const handleDeleteChange = (event) => {
        setFormDeleteValue({
            ...formDeleteValue,
            [event.target.name]: event.target.value
        });
    }

    const handleEditChange = (event) => {
        setFormEditValue({
            ...formEditValue,
            [event.target.name]: event.target.value
        });
    }

    return (
        <>
            <table className={styles.table}>
                <thead className={styles.tableRowHeader}>
                    <tr>
                        <th className={styles.tableHeader}>

                        </th>
                        <th className={styles.tableHeader}>
                            Name
                        </th>
                        <th className={styles.tableHeader}>
                            PP
                        </th>
                        <th className={styles.tableHeader}>
                            Status
                        </th>
                        <th className={styles.tableHeader}>
                            Author
                        </th>
                        {permitted &&
                            <th className={styles.tableHeader}>

                            </th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {slice && slice.map && slice.map((el) => (
                        <tr className={styles.tableRowItems} key={el.id}>
                            <td className={styles.tableCell}>
                                <img src={el.image} style={{width: '70px', height: '70px'}} alt={"cover"} />
                            </td>
                            <td className={styles.tableCell}>
                                <a href={process.env.PUBLIC_URL + "/map/" + el.id}>
                                    {el.name}
                                </a>
                            </td>
                            <td className={styles.tableCell}>
                                <Tooltip title={el.points}>
                                    <span>
                                        {el.pp}
                                    </span>
                                </Tooltip>
                            </td>
                            <td className={styles.tableCell}>
                                {el.status}
                            </td>
                            <td className={styles.tableCell}>
                                <a href={process.env.PUBLIC_URL + "/profile/" + el.author} style={{textDecoration: 'none'}}>
                                    {players && players.find(x => x.id === el.author) === undefined ? el.author : players.find(x => x.id === el.author).name}
                                </a>
                            </td>
                            {permitted &&
                                <td>
                                    <Popup trigger={<button>Edit</button>} modal nested keepTooltipInside={".popupBoundary"}>
                                        <div style={{padding: "10px"}}>
                                            <h3>
                                                Edit map
                                            </h3>
                                            <span>
                                                {el.name}
                                            </span>
                                            <form>
                                                <label htmlFor={"mapEditName"}>
                                                    Name
                                                </label>
                                                <br/>
                                                <input type={"text"} id={"mapEditName"} name={"name"} value={formEditValue.name} onChange={handleEditChange}/>
                                                <br/>
                                                <label htmlFor={"mapEditPoints"}>
                                                    Points
                                                </label>
                                                <br/>
                                                <input type={"text"} id={"mapEditPoints"} name={"points"} value={formEditValue.points} onChange={handleEditChange}/>
                                                <br/>
                                                <label htmlFor={"mapEditScore"}>
                                                    Score
                                                </label>
                                                <br/>
                                                <input type={"text"} id={"mapEditScore"} name={"score"} value={formEditValue.score} onChange={handleEditChange}/>
                                                <br/>
                                                <label htmlFor={"mapEditStatus"}>
                                                    Status
                                                </label>
                                                <br/>
                                                <input type={"text"} id={"mapEditStatus"} name={"status"} value={formEditValue.status} onChange={handleEditChange}/>
                                                <br/>
                                                <label htmlFor={"mapEditImage"}>
                                                    Image URL
                                                </label>
                                                <br/>
                                                <input type={"text"} id={"mapEditImage"} name={"image"} value={formEditValue.image} onChange={handleEditChange}/>
                                                <br/>
                                                <br/>
                                                <input type={"button"} value={"Edit map"} onClick={handleEditMap} data-mapid={el.id}/>
                                            </form>
                                        </div>
                                    </Popup>
                                    <br/>
                                    <Popup trigger={<button>Delete</button>} modal nested keepTooltipInside={".popupBoundary"}>
                                        <div style={{padding: "10px"}}>
                                            <h3>
                                                Remove map
                                            </h3>
                                            <span>
                                                {el.name}
                                            </span>
                                            <form>
                                                <label htmlFor={"mapRemoveReason"}>
                                                    Reason
                                                </label>
                                                <br/>
                                                <input type={"text"} id={"mapRemoveReason"} name={"removeReason"} value={formDeleteValue.removeReason} onChange={handleDeleteChange}/>
                                                <br/>
                                                <label htmlFor={"mapRemovedBy"}>
                                                    Removed by
                                                </label>
                                                <br/>
                                                <input type={"text"} id={"mapRemovedBy"} name={"removedBy"} value={formDeleteValue.removedBy} onChange={handleDeleteChange}/>
                                                <br/>
                                                <br/>
                                                <input type={"button"} value={"Remove map"} onClick={handleDeleteMap} data-mapid={el.id} data-mapname={el.name} data-mapimage={el.image}/>
                                            </form>
                                        </div>
                                    </Popup>
                                </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
            <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
        </>
    );
};