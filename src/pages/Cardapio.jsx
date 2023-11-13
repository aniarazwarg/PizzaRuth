import { Navbar, Container, Image, Row, Col, Nav, Button, Form } from "react-bootstrap";
import Menu from "./Menu";
import CardPizzas from "../components/cardPizzas";
import CardEntradinhas from "../components/cardEntradinhas";
import CardSobremesas from "../components/cardSobremesas";
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
import { useLocation, Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";



function Cardapio() {

  const [usuarios, setUsuarios] = useState([]);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { id } = useParams() || null;

  const handleEmailChange = (text) => {
    setEmail(text.target.value)
  }
  const handleSenhaChange = (text) => {
    setSenha(text.target.value)
  }


  function data() {
      fetch('http://localhost/api/usuario')
      .then((response) => response.json())
      .then((json) => setUsuarios(json))
  }

  function validaUsuario() {
    usuarios.forEach((usuario) => {
      if (usuario.email === email && usuario.senha === senha) {
        alert("Login realizado com sucesso!");
      } else {
        window.location.reload();
        alert("Email ou senha inválidos")
      }
    })
  }


  useEffect(() => {
    data();
    console.log(id)
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
      <Container style={{ width: "70%", marginTop: 40 }}>
        <Image style={{ width: "100%" }} src={tartaruga} />
        <Container style={{ flexDirection: "row" }}>
          <Row style={{ display: "flex", justifyItems: 'center', justifyContent: 'space-between', alignItems: 'center', marginTop: 30 }}>
            <Col md={8}>
              <h4>🔥Dá um Ruth nestas ofertas!</h4>
            </Col>
            <Col md={2} >
              <a href="">Ver todas</a>
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col style={{ height: 200 }} md={4}><a href=""><Image style={{ width: "100%", height: 200 }} src={promocao1} /></a></Col>
            <Col style={{ height: 200 }} md={4}><a href=""><Image style={{ width: "100%", height: 200 }} src={promocao2} /></a></Col>
            <Col style={{ height: 200 }} md={4}><a href=""><Image style={{ width: "100%", height: 200 }} src={promocao3} /></a></Col>
          </Row>
        </Container>
        <Container style={{ marginTop: 40 }}>
          <Row>
            <h4>Tá na mão as mais recomendadas</h4>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <h5>🍕 Pizzas</h5>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <CardPizzas />
          </Row>
          <Row style={{ marginTop: 20 }}>
            <h5>🤤 Entradinhas</h5>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <CardEntradinhas />
          </Row>
          <Row style={{ marginTop: 20 }}>
            <h5>🍫 Sobremesas</h5>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <CardSobremesas />
          </Row>
          <Row style={{ marginBottom: 30 }}>
            <Button style={{ fontWeight: 'bold', padding: 15, borderRadius: 40 }} variant="outline-dark">Ver cardápio completo</Button>
          </Row>
          <Row
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Col md={5}>
              <h2>Já baixou nosso app?</h2>
              <h5>
                Baixe agora lendo o QR code ao lado e tenha acesso a preços e
                promoções exclusivas.
              </h5>
            </Col>
            <Col md={2}>
              <Image style={{ width: "70%" }} src={qr} />
            </Col>
            <Col md={2}>
              <Image style={{ width: "100%" }} src={ios} />
            </Col>
            <Col md={2}>
              <Image style={{ width: "100%" }} src={play} />
            </Col>
          </Row>
        </Container>

      </Container>
    </>
  );
}
export default Cardapio;
