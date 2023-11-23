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
        const [imagemFile, setimagemFile] = useState(null);
        const [preco, setpreco] = useState('');
        const [categoria, setcategoria] = useState('');
    
        const handlesaborChange = (e) => setsabor(e.target.value);
        const handledescricaoChange = (e) => setdescricao(e.target.value);
        const handleimagemFileChange = (e) => setimagemFile(e.target.files[0]);
        const handleprecoChange = (e) => setpreco(e.target.value);
        const handleCategoriaChange = (e) => setcategoria(e.target.value); // Nova função para atualizar a categoria
    
        const handleCadastro = async () => {
            try {
                const formData = new FormData();
                formData.append('sabor', sabor);
                formData.append('descricao', descricao);
                formData.append('imagem', imagemFile);
                formData.append('preco', preco);
                formData.append('categoria', categoria); // Adiciona a categoria ao FormData
        
                const response = await axios.post('http://localhost/api/cadastrarPizza', formData);
        
                console.log(response.data);
                alert('Produto cadastrado com sucesso!');
            } catch (error) {
                console.error('Erro ao cadastrar produto:', error.response || error);
                alert('Erro ao cadastrar produto');
            }
        };
        const handleCadastrar = async (e) => {
            e.preventDefault(); // Evita o comportamento padrão do envio do formulário
        
            if (!sabor || !descricao || !imagemFile || !preco || !categoria) {
                alert("Preencha todos os campos obrigatórios");
            } else {
                await handleCadastro();
                // alert("Cadastro do Produto realizado com sucesso!");
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
                       <a style={{color:"red"}} href="/Cardapio"> Voltar para Cardapio </a>{""}
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
                    Cadastrar novo Produto!
                  </Card.Title>
                  {/* <Card.Text>Boa, vamos começar!</Card.Text> */}
                  <Form encType="multipart/form-data" onSubmit={handleCadastrar}>
                            <Form.Group className="mb-3" controlId="sabor">
                                <Form.Label>Nome do Produto</Form.Label>
                                <Form.Control type="text" placeholder="Digite o nome do Produto" onChange={handlesaborChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="descricao">
                                <Form.Label>Descrição do Produto</Form.Label>
                                <Form.Control type="text" placeholder="Digite a descrição do Produto" onChange={handledescricaoChange} />
                                <Form.Group className="mb-3" controlId="imagem">
                                <Form.Label>Foto do Produto</Form.Label>
                                <Form.Control type="file" onChange={handleimagemFileChange} />
                            </Form.Group>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="preco">
                                <Form.Label>Valor do Produto</Form.Label>
                                <Form.Control type="text" placeholder="Digite o valor do Produto" onChange={handleprecoChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="categoria">
        <Form.Label>Categoria</Form.Label>
        <Form.Control as="select" onChange={handleCategoriaChange} value={categoria}>
          <option value="">Selecione a categoria</option>
          <option value="pizza">Pizza</option>
          <option value="entradinha">Entradinha</option>
          <option value="sobremesa">Sobremesa</option>
          {/* Adicione outras opções de categoria conforme necessário */}
        </Form.Control>
      </Form.Group>
                            
                            <Col className="d-flex justify-content-center">
          <Button style={{ width: '100%' }} variant="primary" type="submit">
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












