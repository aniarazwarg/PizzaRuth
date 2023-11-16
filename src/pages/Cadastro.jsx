import { Navbar, Container, Image, Row, Col, Nav, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../assets/logo_ruth2.png";
import Card from "react-bootstrap/Card"
import axios from 'axios';



 
function Cadastro() {

        const [sabor, setsabor] = useState('');
        const [descricao, setdescricao] = useState('');
        const [preco, setpreco] = useState('');
        const [imagemFile, setimagemFile] = useState(null);
    
        const handlesaborChange = (e) => setsabor(e.target.value);
        const handledescricaoChange = (e) => setdescricao(e.target.value);
        const handleprecoChange = (e) => setpreco(e.target.value);
        const handleimagemFileChange = (e) => setimagemFile(e.target.files[0]);
    
        const handleCadastro = () => {
            const formData = new FormData();
            formData.append('sabor', sabor);
            formData.append('descricao', descricao);
            formData.append('preco', preco);
            formData.append('imagem', imagemFile);
        
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
            if (!sabor || !descricao || !preco || !imagemFile) {
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
                            <Form.Group className="mb-3" controlId="sabor">
                                <Form.Label>Nome da Pizza</Form.Label>
                                <Form.Control type="text" placeholder="Digite o nome da pizza" onChange={handlesaborChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="descricao">
                                <Form.Label>Descrição da Pizza</Form.Label>
                                <Form.Control type="text" placeholder="Digite a descrição da pizza" onChange={handledescricaoChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="preco">
                                <Form.Label>Valor da Pizza</Form.Label>
                                <Form.Control type="text" placeholder="Digite o valor da pizza" onChange={handleprecoChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="imagem">
                                <Form.Label>Foto da Pizza</Form.Label>
                                <Form.Control type="file" onChange={handleimagemFileChange} />
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












