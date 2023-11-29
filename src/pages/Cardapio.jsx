import {
  Navbar,
  Container,
  Image,
  Row,
  Col,
  Nav,
  Button,
} from "react-bootstrap";
import Menu from "./Menu";
import CardPizzas from "../components/cardPizzas";
import CardEntradinhas from "../components/cardEntradinhas";
import CardSobremesas from "../components/cardSobremesas";
import CardBedidas from "../components/cardBebidas";
import UserProfile from "../components/userProfile";
import "bootstrap/dist/css/bootstrap.min.css";
import Pizza from "../assets/pizza.jpg";
import Logo from "../assets/logo_ruth2.png";
import tartaruga from "../assets/tartarugas.png";
import promocao1 from "../assets/promocao1.jpeg";
import promocao2 from "../assets/promocao2.jpg";
import promocao3 from "../assets/promocao3.jpeg";
import qr from "../assets/qrc.jpg";
import ios from "../assets/ios.png";
import play from "../assets/play.png";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Carrinho from "../components/carrinho";
import Cart from "../components/carrinho";
import axios from "axios";

function Cardapio() {
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("carrinho");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (item) => {
    const currentCart = JSON.parse(localStorage.getItem('carrinho')) || [];
    const updatedCart = [...currentCart, item];
    localStorage.setItem('carrinho', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
  };

  const [cep, setCep] = useState("");
  function data() {
    fetch("https://viacep.com.br/ws/01001000/json/")
      .then((response) => response.json())
      .then((json) => setCep(json));
  }

  useEffect(() => {
    data();
  }, [user]);

  const scrollToCarrinho = () => {
    const carrinhoElement = document.getElementById("carrinho");
    if (carrinhoElement) {
      carrinhoElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sendOrder = async () => {
    // Prepare os dados do pedido
    const orderData = {
      userId: user.id,
      items: cart,
      totalPrice: cart.reduce((total, item) => total + Number(item.preco), 0),
      paymentMethod: "Cartão de Crédito",
    };

    try {
      // Armazena o carrinho no localStorage antes de enviar o pedido
      localStorage.setItem("carrinho", JSON.stringify(cart));

      // Faça uma chamada HTTP para enviar o pedido para o servidor
      const response = await axios.post("http://localhost/api/orders", orderData);

      // Exiba uma mensagem ou realize outras ações com base na resposta do servidor
      alert("Pedido efetuado com sucesso!"); // Exibe um alerta

      // Imprime os dados do pedido no console
      console.log("Dados do Pedido:", orderData);
      console.log("Resposta do servidor:", response.data);

      // Não limpa o carrinho após o pedido ser enviado com sucesso
      // setCart([]);
    } catch (error) {
      console.error("Erro ao enviar o pedido:", error);
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/Cardapio">
            <Image src={Logo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link style={{ color: "red" }} href="/">
                Início
              </Nav.Link>
              {/* <Nav.Link href="/Cadastro">Cadastrar Produto</Nav.Link> */}
              {/* <Nav.Link href="#link">Sair</Nav.Link> */}
              {/* <button
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                Sair
              </button> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container style={{ width: "70%", marginTop: 40 }}>
        <Row style={{ marginTop: 20 }}>
        <UserProfile
            user={user}
            cart={cart}
            removeFromCart={removeFromCart}
            onSendOrder={sendOrder}
            scrollToCarrinho={scrollToCarrinho} // Passa a função scrollToCarrinho como propriedade
          />
        </Row>

        <Image style={{ width: "100%" }} src={tartaruga} />
        <Container style={{ flexDirection: "row" }}>
          <Row
            style={{
              display: "flex",
              justifyItems: "center",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            
          </Row>
        </Container>
        <Container style={{ marginTop: 40 }}>
          <Row>
            <h4>Tá na mão as mais recomendadas</h4>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <h5>🍕 Pizzas</h5>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <CardPizzas addToCart={addToCart} />
          </Row>
          <Row style={{ marginTop: 20 }}>
            <h5>🤤 Entradinhas</h5>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <CardEntradinhas addToCart={addToCart} />
          </Row>
          <Row style={{ marginTop: 20 }}>
            <h5>🍫 Sobremesas</h5>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <CardSobremesas addToCart={addToCart} />
          </Row>
          <Row style={{ marginTop: 20 }}>
            <h5>🥤 Bebidas</h5>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <CardBedidas addToCart={addToCart} />
          </Row>


          {user?.funcao === 'cliente' && (
  <>
    <Button
      id="carrinho"
      style={{ fontWeight: "bold", padding: 15, borderRadius: 40 }}
      variant="outline-dark"
    >
      Carrinho
    </Button>
    {/* Renderize o componente Cart apenas se o usuário for um cliente */}
    <Cart cart={cart} removeFromCart={removeFromCart} sendOrder={sendOrder} />
  </>
)}
         
          <Row
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Col md={5}>
              <h2>Já baixou nosso app?</h2>
              <h5>
                Baixe agora lendo o QR code ao lado e tenha acesso a preços e
                promoções exclusivas.
              </h5>
            </Col>
            <Col md={2}>
              <Image style={{ width: "70%" }} src={qr} />
            </Col>
            <Col md={2}>
              <Image style={{ width: "100%" }} src={ios} />
            </Col>
            <Col md={2}>
              <Image style={{ width: "100%" }} src={play} />
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}
export default Cardapio;
