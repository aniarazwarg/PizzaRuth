import { Button, Card, Col, Container, Row } from "react-bootstrap";
import pepperoni from "../assets/pepperoni.jpg";
import { useState, useEffect } from "react";



function CardPizzas() {

    const [pizzas, setPizzas] = useState([]);

    function data() {
        fetch('http://localhost/api/produtos')
            .then((response) => response.json())
            .then((json) => setPizzas(json.filter(pizza => pizza.tipo === 'pizza')));
    }

    useEffect(() => {
        data();
    }, []);



    return (
        <>
            {pizzas.map((pizza) => (
                <Card
                    key={pizza.id}
                    style={{ width: "31%", marginRight: 20, marginBottom: 30, minHeight: 300, maxHeight: 500 }}>
                    <Card.Body style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', height:'100%' }}>
                        <Card.Title style={{ margin: 0 }}>{pizza.produto}</Card.Title>
                        <Card.Img src={"src/assets/" + pizza.imagem} style={{ width: '50%', minWidth: 150, minHeight: 150 }} />
                        <Container>
                            <Card.Text style={{ textAlign: 'center' }}>{pizza.descricao}</Card.Text>
                        </Container>
                        <Container style={{display:'flex', flexDirection:'column', justifyContent:'end', alignItems:'center', height:'100%'}}>
                            <Card.Text style={{ textAlign: 'center', marginBottom: 10, marginTop: 10, fontSize: 20 }}>R${pizza.preco}</Card.Text>
                            <Button style={{ width: "50%", borderRadius: 40, display: 'flex', justifyContent: 'center' }} variant="outline-dark">
                                <p style={{ fontSize: '1vw', marginBottom: 0 }}>Personalizar</p>
                            </Button>
                        </Container>
                    </Card.Body>
                </Card>
            ))}
        </>
    );
}

export default CardPizzas;
