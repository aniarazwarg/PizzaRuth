import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import UserProfile from "./userProfile"; // Importe o componente UserProfile

function CardEntradinhas({ addToCart }) {
  const [pizzas, setPizzas] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")) || null; // 
  
  useEffect(() => {
    fetch('http://localhost/api/pizza')
      .then((response) => response.json())
      .then((json) => setPizzas(json.filter(pizza => pizza.categoria === 'entradinha')));
  }, []);

  const renderButtons = (pizza) => {
    if (user) {
      if (user.funcao === "cliente") {
        return (
          <Button
            style={{ width: "50%", borderRadius: 40, display: 'flex', justifyContent: 'center', marginBottom: 10 }}
            variant="outline-dark"
            onClick={() => addToCart(pizza)}
          >
            <p style={{ fontSize: '1vw', marginBottom: 0 }}>Adicionar ao Carrinho</p>
          </Button>
        );
      } else if (user.funcao === "admin") {
        return (
          <>
            <Button
              variant="outline-primary"
              style={{ width: "50%", borderRadius: 40, display: 'flex', justifyContent: 'center', marginBottom: 10 }}
              onClick={() => console.log('Editar produto')}
            >
              Editar Produto
            </Button>
            <Button
              variant="outline-danger"
              style={{ width: "50%", borderRadius: 40, display: 'flex', justifyContent: 'center', marginBottom: 10 }}
              onClick={() => console.log('Excluir produto')}
            >
              Excluir Produto
            </Button>
          </>
        );
      }
    }

    // Se não houver usuário, não exiba botão
    return null;
  };


  return (
    <>
      {pizzas.map((pizza) => (
        <Card
          key={pizza.id}
          style={{ width: "31%", marginRight: 20, marginBottom: 30, minHeight: 300 }}
        >
          <Card.Body style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Card.Title style={{ margin: 0 }}>{pizza.sabor}</Card.Title>
            <Card.Img src={"src/assets/" + pizza.imagem} style={{ width: '50%' }} />
            <Card.Text style={{ textAlign: 'center' }}>{pizza.descricao}</Card.Text>
            <Card.Text style={{ textAlign: 'center' }}>R${pizza.preco}</Card.Text>
            {renderButtons(pizza)}
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default CardEntradinhas;