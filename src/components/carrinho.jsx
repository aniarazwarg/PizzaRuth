import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

function Cart({ cart, removeFromCart }) {
    const getTotalPrice = () => {
        if (Array.isArray(cart) && cart.length > 0) {
          const totalPrice = cart.reduce((total, pizza) => {
            console.log("Pizza Price:", pizza.preco);
            return total + Number(pizza.preco); // Converter para número
          }, 0);
          console.log("Total Price Before Format:", totalPrice);
          return typeof totalPrice === 'number' ? totalPrice.toFixed(2) : '0.00';
        } else {
          return '0.00';
        }
      };
  return (
    <div>
      
      {/* <h2>Carrinho de Compras</h2> */}
      <ul>

    


  {cart.map((pizza, index) => (
    <li key={index}>
      {pizza.sabor} - R${pizza.preco}
      <Button variant="outline-danger" onClick={() => removeFromCart(pizza.id)}>
        Remover
      </Button>
    </li>
  ))}
  {console.log("Cart Data:", cart)} {/* Adicione esta linha */}
</ul>
      <p>Total: R${getTotalPrice()}</p>


    </div>
    
  );
}

export default Cart;