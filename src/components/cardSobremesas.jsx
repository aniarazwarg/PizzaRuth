import { Button, Card, Col, Container, Row } from "react-bootstrap";
import pepperoni from "../assets/pepperoni.jpg";
import hutcup from "../assets/hutcup.avif"
import pizzaChocolate from "../assets/pizzaBrigadeiro.jpg"
import sliderBrigadeiro from "../assets/sliderBrigadeiro.jpg"
import { useState, useEffect } from "react";


function CardSobremesas() {

  const [sobremesas, setSobremesas] = useState([]);

  function data() {
    fetch('http://localhost/api/produtos')
      .then((response) => response.json())
      .then((json) => setSobremesas(json.filter(sobremesa => sobremesa.tipo === 'sobremesa')));
  }

  useEffect(() => {
    data();
  }, []);


  return (
    <>
      {sobremesas.map((sobremesa) => (
        <Card
          key={sobremesa.id}
          style={{ width: "31%", marginRight: 20, marginBottom: 30, minHeight: 300 }}>
          <Card.Body style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Card.Title style={{ margin: 0 }}>{sobremesa.produto}</Card.Title>
            <Card.Img src={"src/assets/" + sobremesa.imagem} style={{ width: '50%', height: '50%' }} />
            <Card.Text style={{ textAlign: 'center' }}>{sobremesa.descricao}</Card.Text>
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
