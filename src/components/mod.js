import React from "react";
import {Grid} from "@mui/material";

export default function Mod({data}) {
    return(
        <>
            <Grid item xs={3}>
                <div style={{border: "1px solid black"}}>
                    <div style={{padding: "10px"}}>
                        <h5 style={{display: "inline"}}>
                            {data.name} {' '}
                        </h5>
                        <span>
                            {data.version}
                        </span>
                        <br/>
                        <span>
                            by {' '}
                            <a href={`${process.env.PUBLIC_URL}/profile/${data.author}`} style={{textDecoration: "none"}}>
                                {data.authorName}
                            </a>
                        </span>
                        <br/>
                        <span>
                            <b>
                            Dependencies:
                            </b>
                            <p>
                                {data.dependencies && data.dependencies.map(x =>
                                    <>
                                        <a href={x.downloadLink} rel={"noreferrer"} target={"_blank"} style={{textDecoration: "none"}}>
                                            {x.name}
                                        </a>
                                        {' '}{x.version}
                                        {data.dependencies.indexOf(x) !== data.dependencies.length - 1 &&
                                            <>
                                                ,{' '}
                                            </>
                                        }
                                    </>
                                )}
                            </p>
                        </span>
                        <span>
                            <b>
                                Description:
                            </b>
                            <p>
                                {data.description}
                            </p>
                        </span>
                        <Grid container spacing={2} columnSpacing={2} rowSpacing={2}>
                            <Grid item xs={6}>
                                <a href={data.download_link} style={{textDecoration: "none"}} rel='noreferrer' target={"_blank"}>
                                    <div style={{border: "1px solid black", textAlign: "center"}}>
                                        <p style={{margin: "auto"}}>
                                            Download
                                        </p>
                                    </div>
                                </a>
                            </Grid>
                            <Grid item xs={6}>
                                <a href={data.source_code_link} style={{textDecoration: "none"}} rel='noreferrer' target={"_blank"}>
                                    <div style={{border: "1px solid black", textAlign: "center"}}>
                                        <p style={{margin: "auto"}}>
                                            Source Code
                                        </p>
                                    </div>
                                </a>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Grid>
        </>
    );
}