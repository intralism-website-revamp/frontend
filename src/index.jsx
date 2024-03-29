import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/home';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Notfound from "./pages/notfound";
import Profile from "./pages/profile";
import Leaderboard from "./pages/leaderboard";
import LeaderboardCountry from "./pages/leaderboardCountry";
import Maps from "./pages/maps";
import Map from "./pages/map";
import Callback from "./pages/callback";
import {AuthenticationGuard} from "./components/authenticationGuard";
import Account from "./pages/account";
import {Auth0ProviderWithNavigate} from "./components/auth0-provider-with-navigate";
import GettingStarted from "./pages/modding/gettingStarted";
import Mods from "./pages/modding/mods";
import Admin from "./pages/admin";

function Index() {
    return (
        <BrowserRouter>
            <Auth0ProviderWithNavigate>
                <Routes>
                    <Route exact path={`${import.meta.env.BASE_URL}`} element={<Home/>}></Route>
                    <Route exact path={`${import.meta.env.BASE_URL}home`} element={<Home/>}></Route>
                    <Route exact path={`${import.meta.env.BASE_URL}profile/:id`} element={<Profile/>}></Route>
                    <Route exact path={`${import.meta.env.BASE_URL}leaderboard/global`} element={<Leaderboard/>}></Route>
                    <Route exact path={`${import.meta.env.BASE_URL}leaderboard/:country`} element={<LeaderboardCountry/>}></Route>
                    <Route exact path={`${import.meta.env.BASE_URL}maps`} element={<Maps/>}></Route>
                    <Route exact path={`${import.meta.env.BASE_URL}map/:id`} element={<Map/>}></Route>
                    <Route exact path={`${import.meta.env.BASE_URL}callback`} element={<Callback/>}></Route>
                    <Route exact path={`${import.meta.env.BASE_URL}account`} element={<AuthenticationGuard component={Account} />}></Route>
                    <Route exact path={`${import.meta.env.BASE_URL}modding/gettingstarted`} element={<GettingStarted/>}></Route>
                    <Route exact path={`${import.meta.env.BASE_URL}modding/mods`} element={<Mods/>}></Route>
                    <Route exact path={`${import.meta.env.BASE_URL}admin`} element={<AuthenticationGuard component={Admin} />}></Route>
                    <Route path={`${import.meta.env.BASE_URL}*`} element={<Notfound></Notfound>} ></Route>
                </Routes>
            </Auth0ProviderWithNavigate>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Index />);