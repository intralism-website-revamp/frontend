import {useAuth0} from "@auth0/auth0-react";
import React, {useEffect, useState} from "react";
import CustomNavbar from "../components/navbar";
import axios from 'axios';

export default function Account() {
    const { user, getAccessTokenSilently } = useAuth0();
    const [message, setMessage] = useState();

    const getMessage = async () => {
        const accessToken = await getAccessTokenSilently();

        const config = {
            url: `${process.env.REACT_APP_API_URL}/authtest`,
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        };

        let res = await axios(config);
        setMessage(res.data);
    };

    useEffect(() => {
        getMessage();
    });

    return(
        <>
            <CustomNavbar/>
            <span>
                This page is still in development.
            </span>
            <br/>
            <span>
                {user.name}
            </span>
            <br/>
            {message &&
                <span>
                    {message}
                </span>
            }
        </>
    );
}