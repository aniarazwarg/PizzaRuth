import React, { useState, useEffect } from "react";
import { Navbar, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const UserProfile = ({ user, showCart, onLogout, onSendOrder }) => {
  const [isCliente, setIsCliente] = useState(false);
  const [isAdministrador, setIsAdministrador] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setIsCliente(user && user.funcao === "cliente");
    setIsAdministrador(user && user.funcao === "admin");

    // Se o usuário for administrador, busca os pedidos recebidos
    if (user && user.funcao === "admin") {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost/api/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error("Erro ao buscar os pedidos:", error);
    }
  };

  const acceptOrder = async (orderId) => {
    try {
      const response = await axios.post(`http://localhost/api/orders/${orderId}/accept`);
      console.log("Pedido aceito:", response.data);
      // Atualiza a lista de pedidos após aceitar
      fetchOrders();
    } catch (error) {
      console.error("Erro ao aceitar o pedido:", error);
    }
  };

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
            style={{ fontWeight: "bold", padding: 15, borderRadius: 40, marginLeft: "auto" }}
            variant="outline-dark"
          >
            Sair
          </Button>

          {/* Botão "Carrinho" */}
          {isCliente && (
            <Button
              onClick={scrollToCarrinho}
              style={{ fontWeight: "bold", padding: 15, borderRadius: 40, marginRight: 10 }}
              variant="outline-dark"
            >
              Carrinho
            </Button>
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

          {/* Botão "Enviar Pedido" */}
          {isCliente && showCart && (
            <Button
              onClick={() => onSendOrder()}
              style={{ fontWeight: "bold", padding: 15, borderRadius: 40, marginLeft: 10 }}
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
            {orders.map((order) => (
              <li key={order.id}>
                <strong>Cliente:</strong> {order.cliente}<br />
                <strong>Produtos Pedidos:</strong> {order.produtos}<br />
                <strong>Valor:</strong> {order.valor}<br />
                <strong>Método de Pagamento:</strong> {order.pagamento}<br />
                <Button onClick={() => acceptOrder(order.id)}>Aceitar Pedido</Button>
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