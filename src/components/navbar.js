import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CustomNavbar() {
    return(<div>
        <Container fluid className="p-3">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand as={Link} to={`${process.env.PUBLIC_URL}/home`}>
                    <img src={process.env.PUBLIC_URL + "/favicon.ico"} alt={"logo"} style={{height: '30px', width: '30px'}}/>
                    {' '}Intralism Revamp
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={`${process.env.PUBLIC_URL}/leaderboard/global`}>Leaderboard</Nav.Link>
                        <Nav.Link as={Link} to={`${process.env.PUBLIC_URL}/maps`}>Maps</Nav.Link>
                    </Nav>
                    <Nav className="justify-content-end">
                        <Nav.Link as={Link} to={`https://github.com/intralism-website-revamp`} target='_blank'>GitHub</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    </div>)
}