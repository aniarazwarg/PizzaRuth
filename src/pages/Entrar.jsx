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
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Entrar() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  function handleLogin() {
    const data = {
      email: email,
      senha: senha,
    };
  
    fetch('http://localhost/api/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Accept": "application/json",
      },
  })
  .then(response => response.text())
  .then(text => {
    console.log('Resposta completa da API:', text);
    text = text.trim();
    console.log('Resposta da API (após limpeza):', text);
    
    try {
      const json = JSON.parse(text); // Tentar analisar o JSON

      if (json.message === 'Login bem-sucedido') {
        // Se o login for bem-sucedido, envie os dados diretamente para o UserProfile
        setUserProfileData(json.user);

        // Redirecione para a tela do cardápio
        navigate('/cardapio');
      } else {
        // Trate o caso em que o login não foi bem-sucedido
        alert('Erro ao fazer login');
      }
    } catch (error) {
      console.error('Erro ao analisar JSON:', error);
      alert('Erro ao fazer login');
    }
  })
  .catch(error => {
    console.error('Erro durante a requisição:', error);
    alert('Erro ao fazer login');
  });
}
  return (
    <div>
      <Navbar expand="lg" className="bg-body-primary-fixed-top" style={{
              justifyContent: "center",
              height:50,
              position: "fixed",
              zIndex:1000,
              backgroundColor:"white",
              left: 0,
          right: 0,
          width: "100%"
              }}>
        <Container>
            <Row>
                <Col md={4} style={{
              alignItems: "center",
              justifyContent: "center",
              marginLeft:100,
              marginTop:30,
              
            }}>
               
                    <p >
                       <a style={{color:"red"}} href="/"> Voltar para a Home</a>{""}
                    </p>
                    
                </Col>
                <Col md={6}><Image src={Logo} rounded style={{padding:10, width:700,}}/></Col>
            </Row>
            {/* <Row>
                <Col md={12} style={{
            height:5,
          borderTop:1,
          borderColor:"black",
          backgroundColor:"black",
          margin: 0,
          }}> </Col>
            </Row> */}
            
            
       
      
        </Container>
        
      </Navbar>
      
      <div>
        <Container style={{padding:100}}>
          <Row>
          <Col xs={6}>
              <img
                src="https://pizzahut.com.br/assets/account-art.97b4e2c7.svg"
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
                  <Card.Title style={{ width: "55%" }}>
                   Acessar minha conta 
                  </Card.Title>
                  <Card.Text>Preencha seu dados para fazer Login</Card.Text>
                  <Form>
                    <Form.Group>
                      <Form.Label style={{ marginTop: 20 }}>
                        Qual seu e-mail?
                      </Form.Label>
                      <Form.Control
                        placeholder="Informa pra gente seu e-mail"
                        style={{
                          borderRadius: 20,
                          borderColor: "black",
                          padding: 10,
                        }}value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label style={{ marginTop: 20 }}>
                        Qual sua senha?
                      </Form.Label>
                      <Form.Control
                        placeholder="Agora informe uma senha"
                        style={{
                          borderRadius: 20,
                          borderColor: "black",
                          padding: 10,
                        }}value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                      
                      ></Form.Control>
                    </Form.Group>
                    {/* <Form.Group>
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
                    </Form.Group> */}
                  </Form>
                  <Button  onClick={handleLogin}
                    style={{
                      width: "100%",
                      backgroundColor: "red",
                      borderRadius: 20,
                      borderWidth: 0,
                      marginTop: 20,
                      marginBottom:20,
                      padding: 10,
                    }}
                  >
                    Acessar
                  </Button>

                  
                  
                  <div className="d-flex justify-content-center">
                    <p>
                      Ou use outra conta 
                    </p>
                    </div>
                    <Button
                    style={{
                      width: "100%",
                      backgroundColor: "white",
                      borderRadius: 20,
                      borderWidth: 2,
                      marginTop: 20,
                      padding: 10,
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    Entrar com o Google
                  </Button>
                  <Button
                    style={{
                      width: "100%",
                      backgroundColor: "white",
                      borderRadius: 20,
                      borderWidth: 2,
                      borderColor:"black",
                      marginTop: 20,
                      padding: 10,
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    Acessar com a Apple
                  </Button>
                  <div className="d-flex justify-content-center"style={{marginTop: 20,
                      padding: 10,
                      color: "black",}}>
                    <p>
                      Ainda não tem uma conta? <a style={{color:"red"}}href="">Cadastre-se aqui</a>{" "}
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
export default Entrar;
