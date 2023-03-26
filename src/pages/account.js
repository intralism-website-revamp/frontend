import {useAuth0} from "@auth0/auth0-react";
import React, {useEffect, useState} from "react";
import CustomNavbar from "../components/navbar";
import axios from 'axios';

export default function Account() {
    const { user, getAccessTokenSilently} = useAuth0();
    const [userInfo, setUserInfo] = useState();
    const [isUserInfoSet, setIsUserInfoSet] = useState(false);

    useEffect(() => {
        if(!isUserInfoSet) {
            getUserInfo();
        }
    });

    const getUserInfo = async () => {
        const accessToken = await getAccessTokenSilently();

        const config = {
            url: `${process.env.REACT_APP_API_URL}/userInfo/` + user.email,
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        };

        let res = await axios(config);
        setIsUserInfoSet(true);
        setUserInfo(res.data);
    };

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
            {userInfo &&
                <>
                    {userInfo.discord_id &&
                        <span style={{display: "block"}}>
                            Discord: {userInfo.discord_id}
                        </span>
                    }
                    {userInfo.steam_id &&
                        <span>
                            Steam: {userInfo.steam_id}
                        </span>
                    }
                </>
            }
        </>
    );
}