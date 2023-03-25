import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LogoutButton() {
    const { logout } = useAuth0();
    const handleLogout = () => {
        logout({
            logoutParams: {
                returnTo: window.location.origin + process.env.PUBLIC_URL,
            },
        });
    };

    return (
        <button className="bg-light" onClick={handleLogout} style={{border: "none"}}>
            <img src={process.env.PUBLIC_URL + "/right-from-bracket-solid.svg"} style={{width: "15px", height: "15px"}} alt={"logout button"}/>
        </button>
    );
};