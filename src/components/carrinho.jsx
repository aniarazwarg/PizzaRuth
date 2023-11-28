import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

function Cart({ cart, removeFromCart, sendOrder }) {
  const getTotalPrice = () => {
    if (Array.isArray(cart) && cart.length > 0) {
      const totalPrice = cart.reduce((total, item) => total + Number(item.preco), 0);
      return typeof totalPrice === "number" ? totalPrice.toFixed(2) : "0.00";
    } else {
      return "0.00";
    }
  };

  const handleBuyClick = () => {
    if (cart.length > 0) {
      sendOrder(); // Chama a função sendOrder do Cardapio para enviar o pedido
    } else {
      alert("Seu carrinho está vazio. Adicione itens antes de comprar.");
    }
  };

  return (
    <div>
      <Card style={{ display: 'flex', width: "100%", marginRight: 20, marginBottom: 30, minHeight: 300, alignself: "center", justifyContent: 'center' }}>
        <Row>
          <Col md={6}>
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  {item.sabor} - R${item.preco}
                  <Button
                    variant="outline-danger"
                    onClick={() => removeFromCart(item.id)}
                    style={{ margin: 20 }}
                  >
                    Remover
                  </Button>
                </li>
              ))}
            </ul>
            <Row>
              <h2>Total: R${getTotalPrice()}</h2>
            </Row>
          </Col>
          <Col md={6}>
            <Button
              variant="success"
              onClick={handleBuyClick}
              style={{ margin: 20 }}
            >
              Comprar
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default Cart;