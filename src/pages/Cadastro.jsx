import { Navbar, Container, Image, Row, Col, Nav, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../assets/logo_ruth2.png";
import Card from "react-bootstrap/Card"
import axios from 'axios';



 
function Cadastro() {

        const [nomePizza, setNomePizza] = useState('');
        const [descricaoPizza, setDescricaoPizza] = useState('');
        const [valorPizza, setValorPizza] = useState('');
        const [fotoPizzaFile, setFotoPizzaFile] = useState(null);
    
        const handleNomePizzaChange = (e) => setNomePizza(e.target.value);
        const handleDescricaoPizzaChange = (e) => setDescricaoPizza(e.target.value);
        const handleValorPizzaChange = (e) => setValorPizza(e.target.value);
        const handleFotoPizzaFileChange = (e) => setFotoPizzaFile(e.target.files[0]);
    
        const handleCadastro = () => {
            const formData = new FormData();
            formData.append('nomePizza', nomePizza);
            formData.append('descricaoPizza', descricaoPizza);
            formData.append('valorPizza', valorPizza);
            formData.append('fotoPizza', fotoPizzaFile);
        
            axios.post('http://localhost/api/cadastrarPizza', formData)
                .then(response => {
                    console.log(response.data);
                    // Lógica para lidar com a resposta, se necessário
                })
                .catch(error => {
                    console.error('Erro ao cadastrar pizza:', error);
                    // Lógica para lidar com erros
                });
        };
    
        const handleCadastrar = () => {
            if (!nomePizza || !descricaoPizza || !valorPizza || !fotoPizzaFile) {
                return alert("Preencha todos os campos obrigatórios");
            } else {
                handleCadastro();
                return alert("Cadastro da pizza realizado com sucesso!");
            }
        };
    
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
                <Col md={6}><Image src={Logo} rounded style={{padding:10, width:350,}}/></Col>
            </Row>
           
        </Container>
      </Navbar>
      <div>
        <Container style={{ padding: 100 }}>
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
                    Cadastrar nova Pizza!
                  </Card.Title>
                  {/* <Card.Text>Boa, vamos começar!</Card.Text> */}
                  <Form enctype="multipart/form-data">
                            <Form.Group className="mb-3" controlId="nomePizza">
                                <Form.Label>Nome da Pizza</Form.Label>
                                <Form.Control type="text" placeholder="Digite o nome da pizza" onChange={handleNomePizzaChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="descricaoPizza">
                                <Form.Label>Descrição da Pizza</Form.Label>
                                <Form.Control type="text" placeholder="Digite a descrição da pizza" onChange={handleDescricaoPizzaChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="valorPizza">
                                <Form.Label>Valor da Pizza</Form.Label>
                                <Form.Control type="text" placeholder="Digite o valor da pizza" onChange={handleValorPizzaChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="fotoPizza">
                                <Form.Label>Foto da Pizza</Form.Label>
                                <Form.Control type="file" onChange={handleFotoPizzaFileChange} />
                            </Form.Group>
                            <Col className="d-flex justify-content-center">
                                <Button style={{ width: '100%' }} variant="primary" type="button" onClick={handleCadastrar}>
                                    Cadastrar Pizza
                                </Button>
                            </Col>
                        </Form>
 <div className="d-flex justify-content-center">
                    
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
        
    
    
    export default Cadastro;












