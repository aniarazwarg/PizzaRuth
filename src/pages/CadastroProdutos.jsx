import { Navbar, Container, Image, Row, Col, Nav, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../assets/logo_ruth2.png";


function CadastroProdutos() {
    const [produto, setProduto] = useState('');
    const [preco, setPreco] = useState('');
    const [tipo, setTipo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [imagem, setImagem] = useState('');
    let fileImagem = imagem.replace(/^.*[\\\/]/, '');


    function cadastroProduto() {
        fetch('http://localhost/api/cadastrarProdutos', {
            method: 'POST',
            body: JSON.stringify({
                produto: produto,
                preco: preco,
                tipo: tipo,
                descricao: descricao,
                imagem: fileImagem
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },

        })
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(err => console.log(err));
    }


    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/Home">
                        <Image src={Logo} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link style={{ color: "red" }} href="/Home">
                                Início
                            </Nav.Link>
                            <Nav.Link href="/Home">Cardápio</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container style={{ marginBottom: 40 }}>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="" controlId="produto">
                                <Form.Label>Produto:</Form.Label>
                                <Form.Control type="text" placeholder="Nome do produto" onChange={(e) => { setProduto(e.target.value) }} />
                                <Form.Text className="text-muted">
                                    {produto}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="" controlId="preco">
                                <Form.Label>Preço:</Form.Label>
                                <Form.Control type="text" placeholder="Preço do produto" onChange={(e) => { setPreco(e.target.value) }} />
                                <Form.Text className="text-muted">
                                    {preco}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="" controlId="tipo">
                                <Form.Label>Categoria:</Form.Label>
                                <Form.Select aria-label="Default select example" onChange={(e) => { setTipo(e.target.value)}}>
                                <option>Selecione a categoria</option>
                                <option value="pizza">Pizza</option>
                                <option value="bebida">Bebida</option>
                                <option value="breadsticks">Breadsticks</option>
                                <option value="sobremesa">Sobremesa</option>
                            </Form.Select>
                                <Form.Text className="text-muted">
                                    {tipo}
                                </Form.Text>
                            </Form.Group>
                          
                            <p>{tipo}</p>
                            <Form.Group className="" controlId="descricao">
                                <Form.Label>Descrição:</Form.Label>
                                <Form.Control type="text" placeholder="Descreva o produto" onChange={(e) => { setDescricao(e.target.value) }} />
                                <Form.Text className="text-muted">
                                    {descricao}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="" controlId="foto">
                                <Form.Label>Foto:</Form.Label>
                                <Form.Control type="file" placeholder="Inserir" onChange={(e) => { setImagem(e.target.value) }} />
                                <Form.Text className="text-muted">
                                    {fileImagem}
                                </Form.Text>
                            </Form.Group>
                            <Link className="">
                                <Button className="mt-4" variant="danger" onClick={() => cadastroProduto()}>
                                    Cadastrar
                                </Button>
                            </Link>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default CadastroProdutos;