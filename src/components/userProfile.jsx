import React, { useState, useEffect } from "react";
import { Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserProfile = ({ user, showCart, onLogout, onSendOrder }) => {
  const [isCliente, setIsCliente] = useState(false);
  const [isAdministrador, setIsAdministrador] = useState(false);
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    setIsCliente(user && user.funcao === "cliente");
    setIsAdministrador(user && user.funcao === "admin");

    // Obter dados do carrinho do localStorage ao carregar o componente
    const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];
    setCarrinho(carrinhoAtual);
  }, [user]);

  const handleLogout = () => {
    // Remova os dados do usuário
    localStorage.removeItem("user");

    // Recarregue a página ou redirecione para a página de login, se necessário
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

          {/* Botão "Sair" para todos os usuários */}
          <Button
            onClick={handleLogout}
            style={{
              fontWeight: "bold",
              padding: 15,
              borderRadius: 40,
              marginLeft: "auto",
            }}
            variant="outline-dark"
          >
            Sair
          </Button>

          {/* Botão "Carrinho" */}
          {isCliente && (
            <>
              <Button
                id="carrinho"
                style={{
                  fontWeight: "bold",
                  padding: 15,
                  borderRadius: 40,
                }}
                variant="outline-dark"
                onClick={() => {
                  const carrinhoElement = document.getElementById("carrinho");
                  if (carrinhoElement) {
                    carrinhoElement.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Carrinho
              </Button>
            </>
          )}

          {/* Botão "Cadastrar Novo Produto" */}
          {isAdministrador && (
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
          )}

          {/* Botão "Enviar Pedido" */}
          {isCliente && showCart && (
            <Button
              onClick={() => {
                // Envia o pedido para o UserProfile (onSendOrder)
                onSendOrder({
                  items: carrinho,
                  totalPrice: carrinho.reduce(
                    (total, item) => total + Number(item.preco),
                    0
                  ),
                  paymentMethod: "Cartão de Crédito",
                });

                // Limpa o carrinho local após enviar o pedido
                // localStorage.removeItem("carrinho");
              }}
              style={{
                fontWeight: "bold",
                padding: 15,
                borderRadius: 40,
                marginLeft: 10,
              }}
              variant="outline-dark"
            >
              Enviar Pedido
            </Button>
          )}
        </Navbar>
      ) : (
        <p>Usuário não detectado.</p>
      )}

      {/* Exibe detalhes do pedido */}
      {isAdministrador && (
        <div>
          <h2>Pedidos Recebidos</h2>
          <ul>
            {carrinho.map((item, index) => (
              <li key={index}>
                <strong>Produto:</strong> {item.sabor}
                <br />
                <strong>Descrição:</strong> {item.descricao}
                <br />
                <strong>Preço:</strong> {item.preco}
              </li>
            ))}
          </ul>
        </div>
      )}
      <p></p>
    </>
  );
};

export default UserProfile;