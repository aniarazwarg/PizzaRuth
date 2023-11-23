import { Navbar, Container, Image, Row, Col, Nav, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Pedido() {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/Home">
                        <Image src={Logo} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto d-flex justify-content-between w-100">
                            <Container className="d-flex flex-row">
                                <Nav.Link style={{ color: "red" }} href="/Home">
                                    Início
                                </Nav.Link>
                                <Nav.Link href="/CadastroProdutos">Cadastrar produtos</Nav.Link>
                            </Container>
                            <Container className="d-flex flex-row align-items-center justify-content-center">
                                <Link className="me-1 ms-1" to={"/Login"}>
                                    <Button style={{ width: '100%' }} variant="danger" type="submit">
                                        Entrar
                                    </Button>
                                </Link>
                                <Link className="me-1 ms-1" to={"/Cadastro"}>
                                    <Button style={{ width: '100%' }} variant="secondary" type="submit">
                                        Cadastrar
                                    </Button>
                                </Link>
                            </Container>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
}

export default Pedido;