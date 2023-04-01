import React, {useState} from "react";
import CustomNavbar from "../../components/navbar";
import {Grid} from "@mui/material";
import Mod from "../../components/mod";
import axios from "axios";

export default function Mods() {
    const [mods, setMods] = useState();
    const [isModsSet, setIsModsSet] = useState(false);

    let url = `${process.env.REACT_APP_API_URL}/mods/all`

    useState(() => {
       if(!isModsSet) {
           axios.get(url).then(res => {
               setIsModsSet(true);
               if(res.data !== null) {
                   setMods(res.data);
               }
           });
       }
    });

    return(
        <>
            <CustomNavbar/>
            <div style={{paddingLeft: "15px"}}>
                <Grid container spacing={2} columnSpacing={2} rowSpacing={2}>
                    {mods && mods.map(x =>
                        <Mod data={x}/>
                    )}
                </Grid>
            </div>
        </>
    );
}