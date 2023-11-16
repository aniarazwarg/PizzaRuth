import { Button, Card, Col, Container, Row } from "react-bootstrap";
import pepperoni from "../assets/pepperoni.jpg";
import breadstick from "../assets/breadstick.png";
import joint from "../assets/joint.jpg";

const breadsticks = [
  {
    id: 1,
    sabor: "Breadsticks de farofa",
    descricao: "Palitos de massa pan recheados com Pepperoni...",
    valor: "20,90",
    imagem: breadstick,
  },
  {
    id: 2,
    sabor: "Breadsticks de queijo",
    descricao: "Palitos de massa pan recheados com Queijo Hut...",
    valor: "16,90",
    imagem: breadstick,
  },
  {
    id: 3,
    sabor: "Pão calabresa",
    descricao:
      "Pão feito com massa Pizza Hut, recheado com calabresa e cebola...",
    valor: "16,90",
    imagem: breadstick,
  },
];

function CardEntradinhas() {
  return (
    <>
      {breadsticks.map((breadstick) => (
                <Card
                    key={breadstick.id}
                    style={{ width: "31%", marginRight: 20, marginBottom: 30, minHeight: 300 }}>
                    <Card.Body style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <Card.Title style={{ margin: 0 }}>{breadstick.sabor}</Card.Title>
                        <Card.Img src={breadstick.imagem} style={{ width: '50%', height: '50%' }} />
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
