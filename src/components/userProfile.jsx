import { Button } from "react-bootstrap";
import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom"; // Importe o componente Link para criar links internos

const UserProfile = ({ user }) => {
  const buttonText = user && user.funcao === "cliente" ? "Comprar" : "Cadastrar";

  return (
    <>
      {user ? (
        <Navbar
          style={{
            width: "100%", // Reduzi a largura do componente
                      
            minHeight: 20,
          }}
        >
         <Navbar.Brand>
  <h4 style={{ whiteSpace: "nowrap" }}>Olá {user.email}</h4>
</Navbar.Brand>
          <Button
            style={{
              width: "20%", // Largura total do botão
              borderRadius: 40,
              display: "flex",
              justifyContent: "center",
            }}
            variant="outline-dark"
          >
            {/* Use o componente Link para criar links internos */}
            <Link to={buttonText === "Cadastrar" ? "/cadastro" : "/#carrinho"}>
              <p style={{ fontSize: "1vw", marginBottom: 0 }}>{buttonText}</p>
            </Link>
          </Button>
        </Navbar>
      ) : (
        <p>Usuário não detectado.</p>
      )}
    </>
  );
};

export default UserProfile;