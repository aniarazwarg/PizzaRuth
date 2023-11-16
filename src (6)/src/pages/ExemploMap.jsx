import { Button, Card } from "react-bootstrap";
import { useState } from "react";


const pizzas = [
  {
    id: 1,
    sabor: "Portuguesa",
    valor: 40,
  },
  {
    id: 2,
    sabor: "Paulista",
    valor: 30,
  },
];

function ExemploMap() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {pizzas.map((pizza) => (
        <div key={pizza.id}>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{pizza.sabor}</Card.Title>
              <Card.Text>{pizza.valor}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default ExemploMap;
