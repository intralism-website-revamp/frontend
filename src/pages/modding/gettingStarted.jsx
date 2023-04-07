import React from "react";
import CustomNavbar from "../../components/navbar";

export default function GettingStarted() {
    return(
        <>
            <CustomNavbar/>
            <div style={{paddingLeft: '15px'}}>
                <h1>
                    Getting started with modding
                </h1>
                <p>
                    As the first step you should download BepInEx from {" "}
                    <a href={"https://github.com/BepInEx/BepInEx/releases/latest"} target='_blank' rel='noreferrer' style={{textDecoration: "none"}}>
                        here
                    </a>
                    .
                </p>
                <img src={`${import.meta.env.BASE_URL}modding/bepinex-download.png`} alt={"bepinex download"}/>
                <br/>
                <p>
                    Make sure you download the x64 version if you are on Windows.
                </p>
                <p>
                    Next make sure that the game is closed and then go to your Intralism directory where the
                    Intralism.exe file is located.
                    <br/>
                    Default directory is C:\Program Files (x86)\Steam\steamapps\common\Intralism
                </p>
                <img src={`${import.meta.env.BASE_URL}modding/intralism-directory-before-bepinex.png`} alt={"intralism directory"}/>
                <p>
                    You can also open the properties of Intralism in Steam and click the Browse button under Local Files.
                </p>
                <img src={`${import.meta.env.BASE_URL}modding/intralism-properties.png`} alt={"intralism properties"}/>
                <p>
                    Now extract the content of the BepInEx zip file into the game directory.
                    <br/>
                    With the BepInEx files extracted it should look similar to this
                </p>
                <img src={`${import.meta.env.BASE_URL}modding/intralism-directory-after-bepinex.png`} alt={"intralism directory"}/>
                <p>
                    Start your game and make sure that it still boots correctly. Note: {' '}
                    <b>
                        Run Intralism from Steam, not from the folder!
                    </b>
                    <br/>
                    If it booted correctly, close the game and go into the BepInEx folder and check if a config
                    folder got created with at least a BepInEx.cfg inside it.
                </p>
                <img src={`${import.meta.env.BASE_URL}modding/bepinex-config-folder.png`} alt={"bepinex config folder"}/>
                <p>
                    If that's the case then you can install mods now.
                </p>
                <br/>
                <h3>
                    Installing Mods
                </h3>
                <p>
                    Head over to the {' '}
                    <a href={`${import.meta.env.BASE_URL}modding/mods`} style={{textDecoration: "none"}}>
                        mods
                    </a>
                    {' '}page and download the mods you want to install.
                    <br/>
                    Next open the plugins folder which is located in the BepInEx folder.
                    <br/>
                    Now you can put the mods you just downloaded inside that folder.
                </p>
                <img src={`${import.meta.env.BASE_URL}modding/plugins-folder.png`} alt={"plugins folder"}/>
                <p>
                    If the mods were packed in a zip file make sure to unzip the archive. {' '}
                    <b>
                        The mods have to be a dll file!
                    </b>
                    <br/>
                    Sometimes there are pdb files as well but they are just an extra file for debugging purpose {' '}
                    <b>
                        not the actual mod.
                    </b>
                </p>
            </div>
        </>
    );
}