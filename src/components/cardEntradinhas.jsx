import { Button, Card, Col, Container, Row } from "react-bootstrap";
import pepperoni from "../assets/pepperoni.jpg";
import breadstick from "../assets/breadstick.png";
import joint from "../assets/joint.jpg";
import { useState, useEffect } from "react";


function CardEntradinhas() {

  const [breadsticks, setBreadsticks] = useState([]);
  
  function data() {
      fetch('http://localhost/api/produtos')
          .then((response) => response.json())
          .then((json) => setBreadsticks(json.filter(bread => bread.tipo === 'breadsticks')));
  }
  
  useEffect(() => {
      data();
  }, []);

  return (
    <>
      {breadsticks.map((breadstick) => (
                <Card
                    key={breadstick.id}
                    style={{ width: "31%", marginRight: 20, marginBottom: 30, minHeight: 300 }}>
                    <Card.Body style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <Card.Title style={{ margin: 0 }}>{breadstick.produto}</Card.Title>
                        <Card.Img src={"src/assets/" + breadstick.imagem} style={{ width: '50%', height: '50%' }} />
                        <Card.Text style={{ textAlign: 'center' }}>{breadstick.descricao}</Card.Text>
                        <Button style={{ width: "50%", borderRadius: 40, display: 'flex', justifyContent: 'center' }} variant="outline-dark">
                            <p style={{fontSize: '1vw', marginBottom:0}}>Personalizar</p>
                        </Button>
                    </Card.Body>
                </Card>
            ))}
    </>
  );
}

export default CardEntradinhas;
