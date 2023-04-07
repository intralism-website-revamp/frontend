import {useAuth0} from "@auth0/auth0-react";
import React, {useEffect, useState} from "react";
import CustomNavbar from "../components/navbar";
import axios from 'axios';

export default function Account() {
    const { user, getAccessTokenSilently} = useAuth0();
    const [userInfo, setUserInfo] = useState();
    const [isUserInfoSet, setIsUserInfoSet] = useState(false);
    const [isForceUpdateMessageVisible, setIsForceUpdateMessageVisible] = useState(false);
    const [forceUpdateMessage, setForceUpdateMessage] = useState();
    const [deleteScoresMessage, setDeleteScoresMessage] = useState();
    const [isDeleteScoresMessageVisible, setIsDeleteScoresMessageVisible] = useState();

    useEffect(() => {
        if(!isUserInfoSet) {
            getUserInfo();
        }
    });

    const getUserInfo = async () => {
        const accessToken = await getAccessTokenSilently();

        const config = {
            url: `${import.meta.env.VITE_API_URL}/user/info/` + user.email,
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

    async function ForceUpdateScores() {
        setIsForceUpdateMessageVisible(false);
        const accessToken = await getAccessTokenSilently();

        const config = {
            url: `${import.meta.env.VITE_API_URL}/player/forceupdate/` + user.email,
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        };

        let res = await axios(config);
        setForceUpdateMessage(res.data);
        setIsForceUpdateMessageVisible(true);
    }

    async function DeleteScores() {
        setIsDeleteScoresMessageVisible(false);
        const accessToken = await getAccessTokenSilently();

        const config = {
            url: `${import.meta.env.VITE_API_URL}/player/removescores/` + user.email,
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        };

        let res = await axios(config);
        setDeleteScoresMessage(res.data);
        setIsDeleteScoresMessageVisible(true);
    }

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
                    {userInfo.email && userInfo.steam_id &&
                        <div>
                            <button onClick={ForceUpdateScores}>
                                Force Update Scores
                            </button>
                            {isForceUpdateMessageVisible && forceUpdateMessage &&
                                <p style={{display: "inline"}}>
                                    {forceUpdateMessage}
                                </p>
                            }
                            <br/>
                            <button onClick={DeleteScores}>
                                Delete Scores
                            </button>
                            {isDeleteScoresMessageVisible && deleteScoresMessage &&
                                <p style={{display: "inline"}}>
                                    {deleteScoresMessage}
                                </p>
                            }
                        </div>
                    }
                </>
            }
        </>
    );
}