import React, { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Image,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Logo from "../assets/logo_ruth2.png";

function Criar() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [funcao, setFuncao] = useState("");
  const [endereco, setEndereco] = useState({
    cep: "",
    logradouro: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  

  const handleCepChange = (e) => {
    const newCep = e.target.value;
    const cleanedCep = newCep.replace(/\D/g, "");
    setEndereco((prevEndereco) => ({ ...prevEndereco, cep: cleanedCep }));
  };
  const handleNomeChange = (e) => setNome(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleSenhaChange = (e) => setSenha(e.target.value);
  const handleFuncaoChange = (e) => setFuncao(e.target.value);
  const handleNumeroChange = (e) =>
    setEndereco({ ...endereco, numero: e.target.value });
  const data = () => {
    if (!endereco.cep || endereco.cep.length !== 8) {
      alert("CEP inválido. Certifique-se de inserir um CEP válido.");
      return;
    }

    fetch(`https://viacep.com.br/ws/${endereco.cep}/json/`)
      .then((response) => response.json())
      .then((json) => {
        setEndereco({
          ...endereco,
          logradouro: json.logradouro,
          bairro: json.bairro,
          cidade: json.localidade, // Verifique o nome do campo na resposta da API
          estado: json.uf,
        });
      })
      .catch((error) => console.error("Erro ao obter dados do CEP:", error));
  };

  const criar = () => {
    if (!endereco.numero) {
      alert("Número é obrigatório. Preencha o número antes de cadastrar.");
      return;
    }

    fetch("http://localhost/api/cadastrar", {
      method: "POST",
      body: JSON.stringify({
        nome: nome,
        email: email,
        senha: senha,
        funcao: funcao,
        logradouro: endereco.logradouro,
        numero: endereco.numero,
        bairro: endereco.bairro,
        cidade: endereco.cidade,
        estado: endereco.estado,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        alert("Cadastro realizado com sucesso!");
        navigate("/entrar");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {}, []);

  return (
    <div>
      <Navbar
        expand="lg"
        className="bg-body-primary-fixed-top"
        style={{
          justifyContent: "center",
          height: 50,
          position: "fixed",
          zIndex: 1000,
          backgroundColor: "white",
          left: 0,
          right: 0,
          width: "100%",
        }}
      >
        <Container>
          <Row>
            <Col
              md={4}
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 100,
                marginTop: 30,
              }}
            >
              <p>
                <a style={{ color: "red" }} href="/">
                  {" "}
                  Voltar para a Home
                </a>
                {""}
              </p>
            </Col>
            <Col md={6}>
              <Image src={Logo} rounded style={{ padding: 10, width: 350 }} />
            </Col>
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
                    <Form.Group className="mb-3" controlId="nome">
                      <Form.Label>Nome</Form.Label>
                      <Form.Control
                        style={{
                          borderRadius: 20,
                          borderColor: "black",
                          padding: 10,
                        }}
                        type="text"
                        placeholder="Digite seu nome"
                        onChange={handleNomeChange}
                        value={nome}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 mt-5" controlId="email">
                      <Form.Label>Endereço de email</Form.Label>
                      <Form.Control
                        style={{
                          borderRadius: 20,
                          borderColor: "black",
                          padding: 10,
                        }}
                        type="email"
                        placeholder="Digite seu email"
                        onChange={handleEmailChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="senha">
                      <Form.Label>Senha</Form.Label>
                      <Form.Control
                        style={{
                          borderRadius: 20,
                          borderColor: "black",
                          padding: 10,
                        }}
                        type="password"
                        placeholder="Password"
                        onChange={handleSenhaChange}
                      />
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
                            type="text" // Altere para text
                            placeholder="Digite seu CEP"
                            value={endereco.cep || ""}
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
                            onClick={() => {
                              data();
                            }}
                          >
                            Procurar
                          </Button>
                        </Col>
                      </Row>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="endereco">
                      <Form.Label>Endereço</Form.Label>
                      <Form.Control
                        onChange={(e) =>
                          setEndereco({
                            ...endereco,
                            logradouro: e.target.value,
                          })
                        }
                        type="text"
                        placeholder="Endereço"
                        value={endereco.logradouro}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="numero">
                      <Form.Label>Número</Form.Label>
                      <Form.Control
                        onChange={handleNumeroChange}
                        type="text"
                        placeholder="Número"
                        value={endereco.numero}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="bairro">
                      <Form.Label>Bairro</Form.Label>
                      <Form.Control
                        onChange={(e) =>
                          setEndereco({
                            ...endereco,
                            bairro: e.target.value,
                          })
                        }
                        type="text"
                        placeholder="Bairro"
                        value={endereco.bairro}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="cidade">
                      <Form.Label>Cidade</Form.Label>
                      <Form.Control
                        onChange={(e) =>
                          setEndereco({
                            ...endereco,
                            cidade: e.target.value,
                          })
                        }
                        type="text"
                        placeholder="Cidade"
                        value={endereco.cidade}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="estado">
                      <Form.Label>Estado</Form.Label>
                      <Form.Control
                        onChange={(e) =>
                          setEndereco({
                            ...endereco,
                            estado: e.target.value,
                          })
                        }
                        type="text"
                        placeholder="Estado"
                        value={endereco.estado}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Função de Usuário">
                      <Form.Label>Função de Usuário</Form.Label>
                      <Form.Control
                        as="select"
                        onChange={handleFuncaoChange}
                        value={funcao}
                      >
                        <option value="">Selecione a Função de Usuário</option>
                        <option value="cliente">Cliente</option>
                        <option value="admin">Funcionário</option>
                      </Form.Control>
                    </Form.Group>
                    <Col className="d-flex justify-content-center">
                      <Button
                        style={{
                          width: "100%",
                          backgroundColor: "red",
                          borderRadius: 20,
                          borderWidth: 0,
                          marginTop: 20,
                          padding: 10,
                        }}
                        variant="primary"
                        onClick={() => criar()}
                      >
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
                    <a href="cardapio">Cadastrar depois</a>
                    {"/cardapio"}
                  </Button>
                  <div className="d-flex justify-content-center">
                    <p>
                      Já tem uma conta? <a href="entrar">Acesse aqui</a>
                      {"/entrar"}
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
