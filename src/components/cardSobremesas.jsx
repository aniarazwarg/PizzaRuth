import { Button, Card, Col, Container, Row } from "react-bootstrap";
import pepperoni from "../assets/pepperoni.jpg";
import hutcup from "../assets/hutcup.avif"
import pizzaChocolate from "../assets/pizzaBrigadeiro.jpg"
import sliderBrigadeiro from "../assets/sliderBrigadeiro.jpg"

const sobremesas = [
  {
    id: 1,
    sabor: "Hut Cup Brigadeiro",
    descricao: "Brigadeiro feito com Moça® no copinho.",
    valor: "7,90",
    imagem: hutcup,
  },
  {
    id: 2,
    sabor: "Pizza de Brigadeiro",
    descricao: "Pizza com massa pan feito com brigadeiro Moça®",
    valor: "24,90",
    imagem: pizzaChocolate,
  },
  {
    id: 3,
    sabor: "Slider de Brigadeiro",
    descricao: "Mini pizza individual massa pan de Brigadeiro feito com carinha",
    valor: "10,90",
    imagem: sliderBrigadeiro,
  },
  
];

function CardSobremesas() {
  return (
    <>
         {sobremesas.map((sobremesa) => (
                <Card
                    key={sobremesa.id}
                    style={{ width: "31%", marginRight: 20, marginBottom: 30, minHeight: 300 }}>
                    <Card.Body style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <Card.Title style={{ margin: 0 }}>{sobremesa.sabor}</Card.Title>
                        <Card.Img src={sobremesa.imagem} style={{ width: '50%', height: '50%' }} />
                        <Card.Text style={{ textAlign: 'center' }}>{sobremesa.descricao}</Card.Text>
                        <Button style={{ width: "50%", borderRadius: 40, display: 'flex', justifyContent: 'center' }} variant="outline-dark">
                            <p style={{fontSize: '1vw', marginBottom:0}}>Personalizar</p>
                        </Button>
                    </Card.Body>
                </Card>
            ))}
    </>
  );
}

export default CardSobremesas;
