import Menu from "./Menu";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Logo from "../assets/logo_ruth.png";
import Banner from "../assets/banner.png";
import Card from "react-bootstrap/Card";
import Pizza from "../assets/pizza.jpg";
import queijo from "../assets/queijo2.jpg";
import tartaruga from "../assets/tartarugas.png";
import qr from "../assets/qrc.jpg";
import ios from "../assets/ios.png";
import play from "../assets/play.png";
import { InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";



// function Form() {
//   const[cep, setCep] = useState('');

//   function data() {
//     fetch('viacep.com.br/ws/${cep}/json/')
//     .then((response) => response.json())
//     .then((json) => setUsers(json))
// }

// }


function Home() {

  const [cep, setCep] = useState('');
  const handleChange = (e) => {
    setCep(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Realizar ações com o valor de 'nome', como enviar para um servidor
    console.log('Valor enviado:', cep);
  };
  const dataToSend = cep;



  return (
    <div>
      <Navbar expand="lg" className="bg-body-primary">
        <Container>
          <Image src={Logo} rounded />
          <Menu />
        </Container>
      </Navbar>
      <Container fluid style={{ width: "100%", height: 500 }}>
        <Row>
          <Col
            md={12}
            className="bg-Light mt-5 text-white"
            style={{ position: "absolute" }}
          >
            <Image style={{ width: "100%" }} src={Banner} />
          </Col>
          <Col xs={3}></Col>
          <Col
            xs={8}
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 100,
            }}
          >
            <Card
              style={{
                border: "none",
                width: "75%",
                height: 350,
                position: "relative",
                backgroundImage: `url("${Pizza}")`,
                backgroundRepeat: "no-repeat",
                backgroundPositionX: "100%",
                boxShadow: "0px 1px 10px #9B9B9B",
                paddingTop: 50,
              }}
            >
              <Card.Body
                style={{
                  margin: 60,
                }}
              >
                <Card.Title style={{ width: "35%" }}>
                  Peça sua pizza em casa ou retire na loja mais próxima
                </Card.Title>
                <Card.Text>
                  Informe seu endereço para encontrarmos a Pizza Hut mais
                  próxima de você
                </Card.Text>
                <Form onSubmit={handleSubmit}>
                  <InputGroup className="mb-3" style={{ marginTop: 30 }}>
                    <Form.Control
                      placeholder="Informar CEP"
                      aria-label="Example text with button addon"
                      aria-describedby="basic-addon1"
                      value={cep}
                      onChange={handleChange}
                    />
                    <Button variant="dark outline">
                      <Link style={{ color: 'white' }} to={{ pathname: '/Cardapio', state: { data: dataToSend } }}>
                        Buscar
                      </Link>
                    </Button>
                  </InputGroup>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <Col md={4}>
            <Image style={{ width: "100%" }} src={queijo} />
          </Col>
        </Row>
        <Row
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <Col
            md={6}
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <h1>Temos novidades saindo do forno.</h1>
          </Col>
          <Col md={8}>
            <h5>
              Aproveite! Peça agora nossas novidades informando seu endereço
              acima e dê um Hut no seu dia
            </h5>
          </Col>
        </Row>
        <Row
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <Col md={10}>
            <Image style={{ width: "100%" }} src={tartaruga} />
          </Col>
        </Row>

        <Row
          style={{
            alignItems: "center",
            justifyContent: "center",
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
    </div>
  );
}
export default Home;
