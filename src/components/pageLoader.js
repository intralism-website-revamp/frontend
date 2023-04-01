import React from "react";

export const PageLoader = () => {
    const loadingImg = `${process.env.PUBLIC_URL}/loader.svg`;

    return (
        <div className="loader">
            <img src={loadingImg} alt="Loading..." style={{width: "200px", height:"200px"}}/>
        </div>
    );
};