import { Navbar, Container, Image, Row, Col, Nav, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../assets/logo_ruth2.png";

function CadastroPizzas() {
    return(
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/Home">
                        <Image src={Logo} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link style={{ color: "red" }} href="/Home">
                                Início
                            </Nav.Link>
                            <Nav.Link href="/Home">Cardápio</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        
        </>
    )
}

export default CadastroPizzas;