import CustomNavbar from "../components/navbar";
import React from "react";

export default function NotFound() {
    return(
        <div>
            <CustomNavbar />
            <h1>
                Not Found
            </h1>
            <span>
                The page you requested was not found
            </span>
        </div>
    )
}