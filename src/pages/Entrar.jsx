import React, { useState } from "react";
import { Navbar, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Logo from "../assets/logo_ruth.png";
import Card from "react-bootstrap/Card";
import { Form } from "react-bootstrap";
import axios from "axios";

function Entrar() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  function handleLogin() {
    const data = {
      email: email,
      senha: senha,
    };

    axios
      .post("http://localhost/api/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Resposta completa da API:", response.data);

        if (response.data.message === "Login bem-sucedido") {
          // Log user data in JSON format
          console.log("User Data:", JSON.stringify(response?.data?.user));

          // Set user data in state
          setUser(response?.data?.user);

          localStorage.setItem("user", JSON.stringify(response?.data?.user));

          // Redirect to the menu screen
          navigate("/cardapio");
        } else {
          // Handle case where login was not successful
          alert("Erro ao fazer login");
        }
      })
      .catch((error) => {
        console.error("Erro durante a requisição:", error);
        alert("Erro ao fazer login");
      });
  }

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
              <Image src={Logo} rounded style={{ padding: 10, width: 700 }} />
            </Col>
            {/* Botão "Cadastrar Novo Produto" */}
            {user && user.funcao === "admin" && (
              <Col md={2} style={{ textAlign: "end" }}>
                <Button
                  style={{
                    fontWeight: "bold",
                    padding: 15,
                    borderRadius: 40,
                  }}
                  variant="outline-dark"
                >
                  <Link to="/cadastro">Cadastrar Novo Produto</Link>
                </Button>
              </Col>
            )}
          </Row>
        </Container>
      </Navbar>

      {/* Restante do código... */}
    </div>
  );
}

export default Entrar;