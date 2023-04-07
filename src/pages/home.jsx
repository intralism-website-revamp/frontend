import CustomNavbar from "../components/navbar";
import React from "react";

export default function Home() {
    return (
        <div>
            <CustomNavbar />
            <div style={{paddingLeft: '15px'}}>
                <h1>
                    Welcome to the revamped Intralism website
                </h1>
                <span>
                    This is a rebuild of the Intralism website. It features a new ranking system with a custom PP system and map leaderboards.
                </span>
                <br/>
                <span>
                    To view your profile visit {window.location.origin + import.meta.env.BASE_URL}profile/[your id]
                </span>
                <br/>
                <span>
                    Afterwards your profile get's added to the leaderboards.
                </span>
            </div>
        </div>
    )
}