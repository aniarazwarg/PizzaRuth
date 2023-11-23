import { Navbar, Container, Image, Row, Col, Nav, Button } from "react-bootstrap";
import Menu from "./Menu";
import CardPizzas from "../components/cardPizzas";
import CardEntradinhas from "../components/cardEntradinhas";
import CardSobremesas from "../components/cardSobremesas";
import UserProfile from '../components/userProfile';
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
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';



function Cardapio() {
  const location = useLocation();
  const [user, setUser] = useState(null);

  // useEffect para buscar os dados do usuário quando o componente é montado
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost/api/login');
        const userData = await response.json();
        console.log('Dados do usuário após a chamada da API:', userData);
        setUser(userData);
      } catch (error) {
        console.error('Erro ao obter dados do usuário', error);
      }
    };
  
    fetchUserData();
  }, []);



  useEffect(() => {
    fetch('http://localhost/api/usuario')
      .then((response) => response.json())
      .then((json) => setUsuarios (json));
  }, []);

  // usuarios.forEach(u => {
  //   if(u.funcao == "cliente") {
  //     setFuncaoUsuario("cliente")
  //   }
  // });


  // useEffect(() => {
  //   const funcaoArmazenada = localStorage.getItem("funcaoUsuario");
  //   if (funcaoArmazenada) {
  //     setFuncaoUsuario(funcaoArmazenada);
  //   }
  // }, []);
  const [cep, setCep] = useState('');
  function data() {
    fetch('https://viacep.com.br/ws/01001000/json/')
      .then((response) => response.json())
      .then((json) => setCep(json));
  }

  useEffect(() => {
    data();
  }, []);


  return (
    <><Navbar expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="/Cardapio">
        <Image src={Logo} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link style={{ color: "red" }} href="/">
            Início
          </Nav.Link>
          <Nav.Link href="/Cadastro">Cadastrar Produto</Nav.Link>
          <Nav.Link href="#link"></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
      <Container style={{ width: "70%", marginTop: 40 }}>

      <Row style={{ marginTop: 20 }}>
    <UserProfile user={user} />
  </Row>

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
          <Row>
            <p>{cep.logradouro}</p>
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
