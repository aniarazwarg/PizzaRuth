import React, { useState } from "react";
import { Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cart from "./carrinho";

const UserProfile = ({ user }) => {
  const isCliente = user && user.funcao === "cliente";
  const isAdministrador = user && user.funcao === "admin";

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const [adminCart, setAdminCart] = useState([]);

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
            {isCliente ? (
              <h4 style={{ whiteSpace: "nowrap" }}>
                Olá {user.nome}, faça seu pedido e o entregaremos em{" "}
                {user?.logradouro}, nº {user?.numero}.
              </h4>
            ) : (
              <h4 style={{ whiteSpace: "nowrap" }}>
                Olá, {user.nome}, veja os pedidos recebidos.
              </h4>
            )}
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
          {isCliente && (
            <>
              <Button
                onClick={() => setAdminCart([])} {/* Limpa o carrinho de admin quando cliente clicar */}
                style={{
                  fontWeight: "bold",
                  padding: 15,
                  borderRadius: 40,
                }}
                variant="outline-dark"
              >
                Carrinho
              </Button>
              {/* Renderiza o componente Cart apenas para usuários com a função "admin" */}
              <Cart cart={adminCart} removeFromCart={/* Função de remoção para admin */} />
            </>
          )}

          {/* Botão "Cadastrar Novo Produto" */}
          {isAdministrador && (
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
      <p></p>
    </>
  );
};

export default UserProfile;