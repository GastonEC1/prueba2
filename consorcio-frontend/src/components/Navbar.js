import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import {Link} from "react-router-dom"

function AppNavbar(){
    return(
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand as={Link} to="/" >Gestion de Consorcios</Navbar.Brand>
                <Navbar.Brand aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/consorcios">Consorcios</Nav.Link>
                        <Nav.Link as={Link} to="/inquilinos">Inquilinos</Nav.Link>
                        <Nav.Link as={Link} to="/activos">Activos</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AppNavbar