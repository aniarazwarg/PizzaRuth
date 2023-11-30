import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

function Cart({ cart, removeFromCart, sendOrder }) {
 const getTotalPrice = () => {
    if (Array.isArray(cart) && cart.length > 0) {
      const totalPrice = cart.reduce((total, item) => total + Number(item.preco), 0);
      return typeof totalPrice === "number" ? totalPrice.toFixed(2) : "0.00";
    } else {
      return "0.00";
    }
 };

 const getCustomerData = () => {
  // Obtém os dados do usuário do localStorage
  const userData = localStorage.getItem('user');

  // Verifica se há dados no localStorage
  if (userData) {
    // Converte os dados para um objeto JavaScript
    const userObject = JSON.parse(userData);

    // Retorna os dados do usuário
    return userObject;
  }

  // Retorna um objeto vazio se não houver dados no localStorage
  return {};
};

const handleBuyClick = async () => {
  if (cart.length > 0) {
    const totalPrice = getTotalPrice();
    const paymentMethod = document.getElementById('formPaymentMethod').value;

    // Obtenha os dados do cliente do localStorage
    const customerData = getCustomerData();

    try {
      const response = await fetch('http://localhost/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart,
          totalPrice,
          paymentMethod,
          customerData,
        }),
      });

      const responseData = await response.json();

      // Trate a resposta do backend conforme necessário
      console.log(responseData);
    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
    }
  } else {
    alert('Seu carrinho está vazio. Adicione itens antes de comprar.');
  }
};

 const handleClearCart = () => {
    // Limpa o carrinho no localStorage e no estado local
    localStorage.removeItem('carrinho');
    removeFromCart(null, true); // Ajuste a função removeFromCart conforme necessário
 };

 return (
    <Card style={{ width: "100%", marginBottom: 30 }}>
      <Card.Body>
        <Row>
          <Col md={6}>
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                 {item.sabor} - R${item.preco}
                 <Button
                    variant="outline-danger"
                    onClick={() => removeFromCart(item.id)}
                    style={{ marginLeft: 10 }}
                 >
                    Remover
                 </Button>
                </li>
              ))}
            </ul>
            <Row className="mt-4">
              <h2>Total: R${getTotalPrice()}</h2>
            </Row>
          </Col>
          <Col md={6} className="d-flex align-items-center justify-content-center">
            <Form>
              <Form.Group controlId="formPaymentMethod">
                <Form.Label>Forma de Pagamento</Form.Label>
                <Form.Control as="select">
                 <option>Dinheiro</option>
                 <option>Cartão</option>
                 <option>Pix</option>
                </Form.Control>
              </Form.Group>
            </Form>
            <Button
              variant="success"
              onClick={handleBuyClick}
              disabled={cart.length === 0}
              style={{ marginRight: 10, marginLeft: 10 }}
            >
              Comprar
            </Button>
            <Button
              variant="outline-secondary"
              onClick={handleClearCart}
            >
              Limpar Carrinho
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
 );
}

export default Cart;