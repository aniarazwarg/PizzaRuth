import { Navbar, Container, Image, Row, Col, Nav, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Pizza from "../assets/pizza.jpg";
import Logo from "../assets/logo_ruth2.png";
import tartaruga from "../assets/tartarugas.png";
import promocao1 from "../assets/promocao1.jpeg"
import promocao2 from "../assets/promocao2.jpg"
import promocao3 from "../assets/promocao3.jpeg"
import qr from "../assets/qrc.jpg"
import ios from "../assets/ios.png"
import play from "../assets/play.png"
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Login() {

    const [usuarios, setUsuarios] = useState([]);
    const [senha, setSenha] = useState('');
    const [email, setEmail] = useState('');
    const [param, setParam] = useState('');

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
    };

    const handleSenhaChange = (e) => {
        const newSenha = e.target.value;
        setSenha(newSenha);
    };

    function data() {
        fetch('http://localhost/api/usuario')
            .then((response) => response.json())
            .then((json) => setUsuarios(json))
    }

    function validaUsuario() {
        usuarios.forEach((usuario) => {
            if (usuario.email === email && usuario.senha === senha) {
                alert("Login realizado com sucesso!");
            }
        })
    }

    if(usuarios.length == 0) {
        data();
        console.log('oi')
    }
    if(usuarios.length !== 0) {
        console.log('tchau')
        
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
                        <Nav className="me-auto d-flex justify-content-between w-100">
                            <Container className="d-flex flex-row">
                                <Nav.Link style={{ color: "red" }} href="/Home">
                                    Início
                                </Nav.Link>
                                <Nav.Link href="/CadastroPizzas">Cadastrar pizzas</Nav.Link>
                            </Container>

                            <Container className="d-flex flex-row align-items-center justify-content-center">
                                <Link className="me-1 ms-1" to={"/Entrar"}>
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
            <Container className="border border-5 rounded-5 border border-dark bg-danger" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '40%',
                height: '100%',
                marginTop: 50,
            }}>
                <Form style={{ width: '100%', height: '100%', minHeight: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Form.Group style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginBottom: 20 }}>
                        <Form.Label style={{ display: 'flex', justifyContent: 'center', width: '20%', fontWeight: 'bold' }}>Usuário:</Form.Label>
                        <Form.Control placeholder="Digite seu nome de usuário" style={{ width: '80%' }} onChange={handleEmailChange} />
                    </Form.Group>
                    <Form.Group style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                        <Form.Label style={{ display: 'flex', justifyContent: 'center', width: '20%', fontWeight: 'bold' }}>Senha:</Form.Label>
                        <Form.Control placeholder="Digite sua senha" style={{ width: '80%' }} onChange={handleSenhaChange} />
                    </Form.Group>
                    <Link style={{ width: '100%', display:'flex', justifyContent:'center', alignItems:'center', marginTop: 40, textDecoration:'none' }} to={`/Home/${param}`}>
                        <Button style={{ width: '30%' }} variant="secondary" type="submit" onClick={validaUsuario}>
                            Entrar
                        </Button>
                    </Link>
                </Form>
                {/* {usuarios.map((usuario) => {
                    <h1>{usuario.cd_cliente}</h1>
                })} */}
            </Container>
        </>
    )
}

export default Login;