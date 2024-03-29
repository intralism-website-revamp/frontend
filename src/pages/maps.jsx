import TableMaps from "../components/tables/tableMaps";
import React, {useEffect, useState} from "react";
import CustomNavbar from "../components/navbar";
import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function Maps() {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();

    const [permitted, setPermitted] = useState();
    const [maps, setMaps] = useState([]);
    const [isMapsSet, setIsMapsSet] = useState(false);

    let formDefaultValues = {
        id: '',
        name: '',
        points: '',
        score: '',
        status: '',
        image: '',
        author: '',
        nominator: ''
    };

    const [formValue, setformValue] = useState(formDefaultValues);

    let url = `${import.meta.env.VITE_API_URL}/maps/all`;

    const getPermitted = async () => {
        const accessToken = await getAccessTokenSilently();

        const config = {
            url: `${import.meta.env.VITE_API_URL}/permission/map`,
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        };

        let res = await axios(config);
        setPermitted(res.data);
    };

    useEffect(() => {
        if(!isMapsSet) {
            axios.get(url).then(res => {
                setMaps(res.data);
                setIsMapsSet(true);
            });
        }
        if(isAuthenticated) {
            getPermitted();
        }
    });

    const handleSubmit = async() => {
        const formData = new FormData();
        formData.append("id", formValue.id);
        formData.append("name", formValue.name);
        formData.append("points", formValue.points);
        formData.append("score", formValue.score);
        formData.append("status", formValue.status);
        formData.append("image", formValue.image);
        formData.append("author", formValue.author);
        formData.append("nominator", formValue.nominator);

        const accessToken = await getAccessTokenSilently();

        try {
            await axios({
                method: "post",
                url: `${import.meta.env.VITE_API_URL}/maps/add`,
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
        setformValue(formDefaultValues);
    }

    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    return (
        <div className={"popupBoundary"}>
            <CustomNavbar />
            <h1>
                Ranked Maps
            </h1>
            {permitted &&
                <div>
                    <Popup trigger={<button>Add map</button>} modal nested keepTooltipInside={".popupBoundary"}>
                        <div style={{padding: "10px"}}>
                            <h3>
                                Add a new map
                            </h3>
                            <form>
                                <label htmlFor={"mapid"}>
                                    ID
                                </label>
                                <br/>
                                <input type={"text"} id={"mapid"} name={"id"} value={formValue.id} onChange={handleChange}/>
                                <br/>
                                <label htmlFor={"mapname"}>
                                    Name
                                </label>
                                <br/>
                                <input type={"text"} id={"mapname"} name={"name"} value={formValue.name} onChange={handleChange}/>
                                <br/>
                                <label htmlFor={"mappoints"}>
                                    Points
                                </label>
                                <br/>
                                <input type={"text"} id={"mappoints"} name={"points"} value={formValue.points} onChange={handleChange}/>
                                <br/>
                                <label htmlFor={"mapscore"}>
                                    Score
                                </label>
                                <br/>
                                <input type={"text"} id={"mapscore"} name={"score"} value={formValue.score} onChange={handleChange}/>
                                <br/>
                                <label htmlFor={"mapstatus"}>
                                    Status
                                </label>
                                <br/>
                                <input type={"text"} id={"mapstatus"} name={"status"} value={formValue.status} onChange={handleChange}/>
                                <br/>
                                <label htmlFor={"mapimage"}>
                                    Image URL
                                </label>
                                <br/>
                                <input type={"text"} id={"mapimage"} name={"image"} value={formValue.image} onChange={handleChange}/>
                                <br/>
                                <label htmlFor={"mapauthor"}>
                                    Author ID
                                </label>
                                <br/>
                                <input type={"text"} id={"mapauthor"} name={"author"} value={formValue.author} onChange={handleChange}/>
                                <br/>
                                <label htmlFor={"mapnominator"}>
                                    Nominators
                                </label>
                                <br/>
                                <input type={"text"} id={"mapnominator"} name={"nominator"} value={formValue.nominator} onChange={handleChange}/>
                                <br/>
                                <br/>
                                <input type={"button"} value={"Add map"} onClick={handleSubmit} />
                            </form>
                        </div>
                    </Popup>
                </div>
            }
            <br/>
            <TableMaps data={maps} rowsPerPage={10} />
        </div>
    );
}