import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CustomNavbar() {
    return(<div>
        <Container fluid className="p-3">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand as={Link} to={`${process.env.PUBLIC_URL}/home`}></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={`${process.env.PUBLIC_URL}/maps`}>Maps</Nav.Link>
                        <Nav.Link as={Link} to={`${process.env.PUBLIC_URL}/team`}>Team</Nav.Link>
                        <Nav.Link as={Link} to={`${process.env.PUBLIC_URL}/search`}>Search</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    </div>)
}