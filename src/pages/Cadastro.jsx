import { Navbar, Container, Image, Row, Col, Nav, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../assets/logo_ruth2.png";




function Cadastro() {

    const [senha, setSenha] = useState('');
    const [email, setEmail] = useState('');
    const [cep, setCep] = useState(null);
    const [endereco, setEndereco] = useState([]);

    const handleCepChange = (e) => {
        const newCep = e.target.value;
        setCep(newCep);
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
    };

    const handleSenhaChange = (e) => {
        const newSenha = e.target.value;
        setSenha(newSenha);
    };



    function data() {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then((response) => response.json())
            .then((json) => setEndereco(json))
    }

    function cadastro() {
        fetch('http://localhost/api/cadastrar', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                senha: senha,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },

        })
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(err => console.log(err));
    }

    function cadastrar() {
        if (!email || !senha) {
            return alert("Preencha todos os campos");
        }
        else {
            cadastro();
            return alert("Cadastro realizado com sucesso!")
        }


    }


    useEffect(() => {
    }, []);



    return (
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
            <Container style={{ marginBottom: 40 }}>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3 mt-5" controlId="email">
                                <Form.Label>Endereço de email</Form.Label>
                                <Form.Control type="email" placeholder="Digite seu email" onChange={handleEmailChange} />
                                {/* <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text> */}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="senha">
                                <Form.Label>Senha</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={handleSenhaChange} />
                            </Form.Group>
                            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group> */}
                            <Form.Group className="mb-3" controlId="cep">
                                <Form.Label>CEP</Form.Label>
                                <Row>
                                    <Col md={10}>
                                        <Form.Control type="number" placeholder="Digite seu CEP" onChange={handleCepChange} />
                                    </Col>
                                    <Col >
                                        <Button style={{ width: '100%' }} onClick={() => { data() }}>Procurar</Button>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="endereco">
                                <Form.Label>Endereço</Form.Label>
                                <Form.Control type="text" placeholder="Endereço" value={endereco.logradouro} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="bairro">
                                <Form.Label>Bairro</Form.Label>
                                <Form.Control type="text" placeholder="Bairro" value={endereco.bairro} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="cidade">
                                <Form.Label>Cidade</Form.Label>
                                <Form.Control type="text" placeholder="Cidade" value={endereco.localidade} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="estado">
                                <Form.Label>Estado</Form.Label>
                                <Form.Control type="text" placeholder="Estado" value={endereco.uf} onChange={(e) => setEndereco(e)} />
                            </Form.Group>
                            <Col className="d-flex justify-content-center">
                                <Button style={{ width: '100%' }} variant="primary" type="submit" href="/" onClick={() => cadastrar()}>
                                    Cadastrar
                                </Button>
                            </Col>
                            <Col className="d-flex justify-content-center mt-3">
                                <Link style={{ width: '100%' }} to={"/Home"}>
                                    <Button style={{ width: '100%' }} variant="primary" type="submit">
                                        Voltar
                                    </Button>
                                </Link>
                            </Col>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Cadastro;
