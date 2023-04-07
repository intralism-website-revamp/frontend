import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LoginButton() {
    const { loginWithRedirect } = useAuth0();
    const handleLogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: "/intralism/",
            },
        });
    };

    return (
        <button className="bg-light" onClick={handleLogin} style={{border: "none"}}>
            <img src={import.meta.env.BASE_URL + "right-to-bracket-solid.svg"} style={{width: "15px", height: "15px"}} alt={"login button"}/>
        </button>
    );
}