import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useAuth0} from "@auth0/auth0-react";
import LoginButton from "./buttons/loginButton";
import LogoutButton from "./buttons/logoutButton";
import {NavDropdown} from "react-bootstrap";
import axios from "axios";
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./navbar.css";

export default function CustomNavbar() {
    const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

    const [userInfo, setUserInfo] = useState();
    const [isUserInfoSet, setIsUserInfoSet] = useState(false);
    const [adminPermitted, setAdminPermitted] = useState();

    useEffect(() => {
        if(!isUserInfoSet && isAuthenticated) {
            getUserInfo();
            getAdminPermitted();
        }
    });

    const getUserInfo = async () => {
        const accessToken = await getAccessTokenSilently();

        const config = {
            url: `${process.env.REACT_APP_API_URL}/user/info/` + user.email,
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        };

        let res = await axios(config);
        setIsUserInfoSet(true);
        setUserInfo(res.data);
    };

    const getAdminPermitted = async () => {
        const accessToken = await getAccessTokenSilently();

        const config = {
            url: `${process.env.REACT_APP_API_URL}/permission/admin`,
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        };

        let res = await axios(config);
        setAdminPermitted(res.data);
    };

    return(
        <div>
            <Container fluid className="p-3">
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href={`${process.env.PUBLIC_URL}/home`}>
                        <img src={process.env.PUBLIC_URL + "/favicon.ico"} alt={"logo"} style={{height: '30px', width: '30px'}}/>
                        {' '}Intralism Revamp
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href={`${process.env.PUBLIC_URL}/leaderboard/global`}>
                                Leaderboard
                            </Nav.Link>
                            <Nav.Link href={`${process.env.PUBLIC_URL}/maps`}>
                                Maps
                            </Nav.Link>
                            <NavDropdown title={"Modding"} id="basic-nav-dropdown" renderMenuOnMount={true}>
                                <NavDropdown.Item href={`${process.env.PUBLIC_URL}/modding/gettingstarted`}>Getting Started</NavDropdown.Item>
                                <NavDropdown.Item href={`${process.env.PUBLIC_URL}/modding/mods`}>Mods</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav className="justify-content-end">
                            {!isAuthenticated &&
                                <span style={{marginTop: "5px"}}>
                                    <LoginButton/>
                                </span>
                            }
                            {isAuthenticated &&
                                <>
                                    {adminPermitted &&
                                        <Nav.Link href={`${process.env.PUBLIC_URL}/admin`}>
                                            Admin
                                        </Nav.Link>
                                    }
                                    <NavDropdown title={user.name} id="basic-nav-dropdown" renderMenuOnMount={true}>
                                        {userInfo && userInfo.steam_id &&
                                            <NavDropdown.Item href={`${process.env.PUBLIC_URL}/profile/${userInfo.steam_id}`} >Profile</NavDropdown.Item>
                                        }
                                        <NavDropdown.Item href={`${process.env.PUBLIC_URL}/account`}>Settings</NavDropdown.Item>
                                        <NavDropdown.Item><LogoutButton /></NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            }
                            <Nav.Link href={`https://github.com/intralism-website-revamp`} target='_blank' rel='noreferrer'>
                                GitHub
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </div>
    )
}