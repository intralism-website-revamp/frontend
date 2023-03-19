import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/home';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import NotFound from "./pages/notfound";
import Profile from "./pages/profile";
import Leaderboard from "./pages/leaderboard";
import LeaderboardCountry from "./pages/leaderboardCountry";
import Maps from "./pages/maps";
import Map from "./pages/map";

function Index() {
    return (
            <BrowserRouter>
                <Routes>
                    <Route exact path={`${process.env.PUBLIC_URL}/`} element={<Home/>}></Route>
                    <Route exact path={`${process.env.PUBLIC_URL}/home`} element={<Home/>}></Route>
                    <Route exact path={`${process.env.PUBLIC_URL}/profile/:id`} element={<Profile/>}></Route>
                    <Route exact path={`${process.env.PUBLIC_URL}/leaderboard/global`} element={<Leaderboard/>}></Route>
                    <Route exact path={`${process.env.PUBLIC_URL}/leaderboard/:country`} element={<LeaderboardCountry/>}></Route>
                    <Route exact path={`${process.env.PUBLIC_URL}/maps`} element={<Maps/>}></Route>
                    <Route exact path={`${process.env.PUBLIC_URL}/map/:id`} element={<Map/>}></Route>
                    <Route path={`${process.env.PUBLIC_URL}/*`} element={<NotFound></NotFound>} ></Route>
                </Routes>
            </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Index />);