import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export default function LogoutButton() {
    const { logout } = useAuth0();
    const handleLogout = () => {
        logout({
            logoutParams: {
                returnTo: window.location.origin + import.meta.env.BASE_URL,
            },
        });
    };

    return (
        <button onClick={handleLogout} style={{border: "none"}}>
            <img src={import.meta.env.BASE_URL + "right-from-bracket-solid.svg"} style={{width: "15px", height: "15px"}} alt={"logout button"}/>
        </button>
    );
};