import React from "react";
import { Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserProfile = ({ user }) => {
  const showCarrinhoButton = user && user.funcao === "cliente";
  const showCadastrarProdutoButton = user && user.funcao === "admin";

  const scrollToCarrinho = () => {
    const carrinhoElement = document.getElementById("carrinho");
    if (carrinhoElement) {
      carrinhoElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      {user ? (
        <Navbar
          style={{
            width: "100%",
            minHeight: 20,
          }}
        >
          <Navbar.Brand>
            <h4 style={{ whiteSpace: "nowrap" }}>Olá 🤤 {user.nome}, faça seu pedido e o entregaremos em {user.logradouro},nº  {user.numero}, </h4>
          </Navbar.Brand>

          {/* Botão "Sair" para todos os usuários */}
          <Button
            onClick={handleLogout}
            style={{ fontWeight: "bold", padding: 15, borderRadius: 40 }}
            variant="outline-dark"
          >
            Sair
          </Button>

          {/* Botão "Carrinho" */}
          {showCarrinhoButton && (
            <Button
              onClick={scrollToCarrinho}
              style={{ fontWeight: "bold", padding: 15, borderRadius: 40 }}
              variant="outline-dark"
            >
              Carrinho
            </Button>
          )}

          {/* Botão "Cadastrar Novo Produto" */}
          {showCadastrarProdutoButton && (
            <Button
              style={{ fontWeight: "bold", padding: 15, borderRadius: 40 }}
              variant="outline-dark"
            >
              <Link to="/cadastro">Cadastrar Novo Produto</Link>
            </Button>
          )}
        </Navbar>
      ) : (
        <p>Usuário não detectado.</p>
      )}
    </>
  );
};

export default UserProfile;