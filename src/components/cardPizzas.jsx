import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import UserProfile from "./userProfile"; // Importe o componente UserProfile
import { useNavigate } from "react-router-dom";

function CardPizzas({ addToCart }) {
  const [pizzas, setPizzas] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost/api/pizza')
      .then((response) => response.json())
      .then((json) => setPizzas(json.filter(pizza => pizza.categoria === 'pizza')));
  }, []);

  const handleEditProduct = (productId) => {
    fetchData(productId);
  };

  const fetchData = async (productId) => {
    try {
      const response = await fetch(`http://localhost/api/pizza/${productId}`);

      if (response.ok) {
        const produtoData = await response.json();

        // Navegue para a tela de cadastro com os dados preenchidos
        navigate(`/cadastro/${productId}`, { state: { produtoData, isEditing: true } });
      } else {
        console.error('Erro ao obter dados do produto para edição');
      }
    } catch (error) {
      console.error('Erro ao obter dados do produto para edição:', error);
    }
  };

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
              onClick={() => handleEditProduct(pizza.id)}
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

export default CardPizzas;