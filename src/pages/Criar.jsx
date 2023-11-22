import Menu from "./Menu";
import { Navbar, Container, Image, Row, Col, Nav, Button, Form, FormLabel, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../assets/logo_ruth2.png";
import "bootstrap/dist/css/bootstrap.min.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import Banner from "../assets/banner.png";
import Card from "react-bootstrap/Card";
import Pizza from "../assets/pizza.jpg";


function Criar() {
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [funcao, setfuncao] = useState('');
  const [endereco, setEndereco] = useState({
  });
  const [logradouro,setLogradouro] = useState('');
  const [numero,setNumero] = useState('');
  const [bairro,setBairro] = useState('');
  const [cidade,setCidade] = useState('');
  const [estado,setEstado] = useState('');

  const handleCepChange = (e) => {
    const newCep = e.target.value;
  
    // Remova caracteres não numéricos do CEP
    const cleanedCep = newCep.replace(/\D/g, '');
  
    setEndereco((prevEndereco) => ({ ...prevEndereco, cep: cleanedCep }));
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  };

  const handleSenhaChange = (e) => {
    const newSenha = e.target.value;
    setSenha(newSenha);
  };

  const handlefuncaoChange = (e) => {
    const newfuncao = e.target.value;
    setfuncao(newfuncao);
  };

  const handleLogradouroChange = (e) => {
    const newLogradouro = e.target.value;
    setLogradouro(newLogradouro);
  };

  const handleNumeroChange = (e) => {
    const newNumero = e.target.value;
    setNumero(newNumero);
  };
  const handleBairroChange = (e) => {
    const newBairro = e.target.value;
    setBairro(newBairro);
  };

  const handleCidadeChange = (e) => {
    const newCidade = e.target.value;
    setCidade(newCidade);
  };

  const handleEstadoChange = (e) => {
    const newEstado = e.target.value;
    setEstado(newEstado);
  };



  function data() {
    
      // Valide o CEP antes de fazer a chamada à API
      if (!endereco.cep || endereco.cep.length !== 8) {
        alert("CEP inválido. Certifique-se de inserir um CEP válido.");
        return;
      }
      fetch(`https://viacep.com.br/ws/${endereco.cep}/json/`)
      .then((response) => response.json())
      .then((json) => setEndereco(json))
      .catch((error) => console.error("Erro ao obter dados do CEP:", error));
  }
  function criar() {
    fetch('http://localhost/api/cadastrar', {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            senha: senha,
            funcao:funcao,
            logradouro: logradouro,
            numero: numero,
            bairro: bairro,
            cidade: cidade,
            estado: estado,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Accept": "application/json", // Adicione este header
        },
    })
    .then(response => response.text())
    .then(text => {
        console.log(text); // Exibir a resposta do servidor no console
        return JSON.parse(text); // Tentar analisar o JSON
    })
    .then(json => console.log(json))
    .catch(err => console.log(err));
}

// function cadastrar() {
//   if (!email || !senha) {
//       return alert("Preencha todos os campos");
//   } else {
//       const requestBody = {
//         email:email,
//         senha:senha,
//         funcao: funcao,
//         logradouro:logradouro,
//         numero:numero,
//         bairro:bairro,
//         cidade:cidade,
//         estado:estado,   
//       };

//       criar(); // Remova o argumento aqui
//       return alert("Cadastro realizado com sucesso!");
//   }
// }
  useEffect(() => {
  }, []);

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
                    Criar minha conta
                  </Card.Title>
                  {/* <Card.Text>Boa, vamos começar!</Card.Text> */}
                  <Form>
                    <Form.Group className="mb-3 mt-5" controlId="email">
                      <Form.Label>Endereço de email</Form.Label>
                      <Form.Control style={{
                          borderRadius: 20,
                          borderColor: "black",
                          padding: 10,
                        }} type="email" placeholder="Digite seu email" onChange={handleEmailChange} />
                   
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="senha">
                      <Form.Label>Senha</Form.Label>
                      <Form.Control  style={{
                          borderRadius: 20,
                          borderColor: "black",
                          padding: 10,
                        }} type="password" placeholder="Password" onChange={handleSenhaChange} />
                    </Form.Group>
            
                    <Form.Group className="mb-3" controlId="cep">
        <Form.Label>CEP</Form.Label>
        <Row>
          <Col md={7}>
          <Form.Control
  style={{
    borderRadius: 20,
    borderColor: "black",
    padding: 10,
  }}
  type="text"  // Altere para text
  placeholder="Digite seu CEP"
  value={endereco.cep || ''}
  onChange={handleCepChange}
/>
          </Col>
          <Col md={4}>
            <Button
              style={{
                width: "100%",
                backgroundColor: "black",
                borderRadius: 20,
                borderWidth: 0,
                padding: 10,
              }}
              onClick={() => { data() }}
            >
              Procurar
            </Button>
          </Col>
        </Row>
      </Form.Group>

                    
<Form.Group className="mb-3" controlId="endereco">
  <Form.Label>Endereço</Form.Label>
  <Form.Control onChange={handleLogradouroChange}type="text" placeholder="Endereço" value={endereco.logradouro} />
              <Form.Text >{logradouro}</Form.Text>
</Form.Group>
<Form.Group className="mb-3" controlId="numero">
  <Form.Label>Número</Form.Label>
  <Form.Control onChange={handleNumeroChange} type="text" placeholder="Endereço" value={endereco.numero} />
</Form.Group>
                    <Form.Group className="mb-3" controlId="bairro">
                      <Form.Label>Bairro</Form.Label>
                      <Form.Control  onChange={handleBairroChange}type="text" placeholder="Bairro" value={endereco.bairro} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="cidade">
                      <Form.Label>Cidade</Form.Label>
                      <Form.Control onChange={handleCidadeChange}type="text" placeholder="Cidade" value={endereco.localidade} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="estado">
  <Form.Label>Estado</Form.Label>
  <Form.Control onChange={handleEstadoChange} type="text" placeholder="Estado" value={endereco.uf} />
</Form.Group>
                    <Form.Group className="mb-3" controlId="Função de Usuário">
        <Form.Label>Função de Usuário</Form.Label>
        <Form.Control as="select" onChange={handlefuncaoChange} value={funcao}>
          <option value="">Selecione a Função de Usuário</option>
          <option value="cliente">Cliente</option>
          <option value="admin">Funcionário</option>
        </Form.Control>
      </Form.Group>
                    <Col className="d-flex justify-content-center">
                      <Button style={{
                      width: "100%",
                      backgroundColor: "red",
                      borderRadius: 20,
                      borderWidth: 0,
                      marginTop: 20,
                      padding: 10,
                    }} variant="primary" onClick={() => criar()}>
                        Cadastrar
                      </Button>
                    </Col>
                  
                  </Form>
                 
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
