import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from "../components/navbar";
import React from "react";

export default function NotFound() {
    return(<div>
        <CustomNavbar></CustomNavbar>
        <h1>Not Found</h1>
        <p>The page you requested was not found</p>
    </div>)
}