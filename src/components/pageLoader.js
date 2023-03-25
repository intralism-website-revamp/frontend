import React from "react";

export const PageLoader = () => {
    const loadingImg = "https://cdn.auth0.com/blog/hello-auth0/loader.svg";

    return (
        <div className="loader">
            <img src={loadingImg} alt="Loading..." style={{width: "200px", height:"200px"}}/>
        </div>
    );
};