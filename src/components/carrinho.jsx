import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row, Form } from "react-bootstrap";

function Cart({ cart, removeFromCart }) {
  const getTotalPrice = () => {
    if (Array.isArray(cart) && cart.length > 0) {
      const totalPrice = cart.reduce((total, pizza) => {
        console.log("Pizza Price:", pizza.preco);
        return total + Number(pizza.preco); // Converter para número
      }, 0);
      console.log("Total Price Before Format:", totalPrice);
      return typeof totalPrice === "number" ? totalPrice.toFixed(2) : "0.00";
    } else {
      return "0.00";
    }
  };

  function comprar() {
    alert("Pedido Realizado");
}

  return (
    <div>
      <Card
          style={{ width: "100%", marginRight: 20, marginBottom: 30, minHeight: 300 , alignself: 'center' }}
        >
    <Row style={{ display: "flex", justifyItems: 'center', justifyContent: 'center', alignItems: 'center', alignSelf:'center' }}>
    <Col md={8}>
    
      
      {/* <h2>Carrinho de Compras</h2> */}
      <ul>
        {cart.map((pizza, index) => (
          <li key={index}>
            {pizza.sabor} - R${pizza.preco} 
            <Button
              variant="outline-danger"
              onClick={() => removeFromCart(pizza.id)}style={{margin:20 }}
            >
              Remover
            </Button>
          </li>
        ))}
        {console.log("Cart Data:", cart)} {/* Adicione esta linha */}
      </ul>
      <p>Total: R${getTotalPrice()}</p>
    
    </Col>
    <Col style={{ justifyContent:'center'}} md={4} >
      <Row Style={{display: 'flex', alignItems: 'center', alignItems:'center' }}>
      <Form.Group className="mb-3">
        {/* <Form.Label>Categoria</Form.Label> */}
        <Form.Control as="select">
          <option value="">Forma de Pagamento</option>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão">Cartão</option>
          <option value="Pix">Pix</option>
          {/* Adicione outras opções de categoria conforme necessário */}
        </Form.Control>
      </Form.Group>
      </Row>
    <Button
              variant="danger" 
              onClick={comprar}
              style={{width: 150,height:150 , borderRadius:100}}
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
