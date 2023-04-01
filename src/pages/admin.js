import React, {useEffect, useState} from "react";
import CustomNavbar from "../components/navbar";
import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";

export default function Admin() {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();

    const [permitted, setPermitted] = useState();
    const [isRecalcMessageVisible, setIsRecalcMessageVisible] = useState(false);

    useEffect(() => {
        if(isAuthenticated) {
            getPermitted();
        }
    });

    const getPermitted = async () => {
        const accessToken = await getAccessTokenSilently();

        const config = {
            url: `${process.env.REACT_APP_API_URL}/permission/admin`,
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        };

        let res = await axios(config);
        setPermitted(res.data);
    };

    async function recalcRanks() {
        setIsRecalcMessageVisible(false);
        const accessToken = await getAccessTokenSilently();

        const config = {
            url: `${process.env.REACT_APP_API_URL}/leaderboard/recalc`,
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        };

        await axios(config);
        setIsRecalcMessageVisible(true);
    }

    return(
        <>
            <CustomNavbar/>
            {permitted &&
                <div style={{padding: "5px"}}>
                    <button onClick={recalcRanks}>
                        Recalc Ranks
                    </button>
                    {isRecalcMessageVisible &&
                        <p style={{display: "inline"}}>
                            {' '}Recalculation Done
                        </p>
                    }
                </div>
            }
            {!permitted &&
                <h1>
                    You don't have permission to access this page!
                </h1>
            }
        </>
    );
}