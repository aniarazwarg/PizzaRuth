import React, { useState, useEffect } from "react";
import { Navbar, Button } from "react-bootstrap";
import axios from "axios"; // Importe o axios se ainda não estiver importado

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

  return (
    <>
      {user ? (
        <Navbar
          style={{
            width: "100%",
            minHeight: 20,
          }}
        >
          {isCliente && (
            <>
              {showCart && (
                <Button
                  onClick={() => onSendOrder()}
                  style={{
                    fontWeight: "bold",
                    padding: 15,
                    borderRadius: 40,
                  }}
                  variant="outline-dark"
                >
                  Enviar Pedido
                </Button>
              )}
            </>
          )}

          {isAdministrador && (
            <>
              <h4 style={{ whiteSpace: "nowrap" }}>
                Olá, {user.nome}, veja os pedidos recebidos.
              </h4>
              {orders.length > 0 ? (
                <ul>
                  {orders.map((order) => (
                    <li key={order.id}>
                      Pedido de {order.user.nome} - Total: R${order.totalPrice.toFixed(2)}
                      <Button onClick={() => acceptOrder(order.id)}>
                        Aceitar Pedido
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Nenhum pedido recebido.</p>
              )}
            </>
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