import { Button, Card, Col, Container, Row } from "react-bootstrap";
import pepperoni from "../assets/pepperoni.jpg";
import { useState, useEffect } from "react";


function CardSobremesas() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetch('http://localhost/api/pizza')
      .then((response) => response.json())
      .then((json) => setPizzas(json.filter(pizza => pizza.categoria === 'sobremesa')));
  }, []);

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
            <Button style={{ width: "50%", borderRadius: 40, display: 'flex', justifyContent: 'center' }} variant="outline-dark">
              <p style={{ fontSize: '1vw', marginBottom: 0 }}>Personalizar</p>
            </Button>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}


export default CardSobremesas;