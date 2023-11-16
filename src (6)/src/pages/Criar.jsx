import Menu from "./Menu";
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
import { Form, FormLabel, InputGroup } from "react-bootstrap";

function Criar() {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-primary">
        <Container>
          <Image src={Logo} rounded />
          <Menu />
        </Container>
      </Navbar>
      <div>
        <Container>
          <Row>
            <Col xs={6}>
              <img
                src="https://www.pizzahut.com.br/assets/account-art.97b4e2c7.svg"
                alt="new"
              />
            </Col>
            <Col xs={6}>
              <Card
                style={{
                  border: "none",
                  width: "100%",
                }}
              >
                {/* <Card.Img variant="top" src={Pizza} /> */}
                <Card.Body
                  style={{
                    margin: 60,
                  }}
                >
                  <Card.Title style={{ width: "35%" }}>
                    Criar minha conta
                  </Card.Title>
                  <Card.Text>Boa, vamos começar!</Card.Text>
                  <Form>
                    <Form.Group>
                      <Form.Label style={{ marginTop: 20 }}>
                        Qual seu nome e sobrenome?
                      </Form.Label>
                      <Form.Control
                        placeholder="Informa pra gente seu nome completo"
                        style={{
                          borderRadius: 20,
                          borderColor: "black",
                          padding: 10,
                        }}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label style={{ marginTop: 20 }}>
                        Como você prefere ser chamado?
                      </Form.Label>
                      <Form.Control
                        placeholder="Tem algum apelido ou preferência?"
                        style={{
                          borderRadius: 20,
                          borderColor: "black",
                          padding: 10,
                        }}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label style={{ marginTop: 20 }}>
                        Quando é seu aniversário?
                      </Form.Label>
                      <Form.Control
                        placeholder="Informa pra gente sua data de nascimento"
                        style={{
                          borderRadius: 20,
                          borderColor: "black",
                          padding: 10,
                        }}
                      ></Form.Control>
                    </Form.Group>
                  </Form>
                  <Button
                    style={{
                      width: "100%",
                      backgroundColor: "#D3D3D3",
                      borderRadius: 20,
                      borderWidth: 0,
                      marginTop: 20,
                      padding: 10,
                    }}
                  >
                    Continuar
                  </Button>
                  <Button
                    style={{
                      width: "100%",
                      backgroundColor: "white",
                      borderRadius: 20,
                      borderWidth: 0,
                      marginTop: 20,
                      padding: 10,
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    Cadastrar depois
                  </Button>
                  <div className="d-flex justify-content-center">
                    <p>
                      Já tem uma conta? <a href="">Acesse aqui</a>{" "}
                    </p>
                    </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
export default Criar;
