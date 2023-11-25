import { Button } from "react-bootstrap";
import React from "react";
import { Navbar } from "react-bootstrap";

const UserProfile = ({ user }) => {
  const buttonText = user.funcao === "cliente" ? "Comprar" : "Cadastrar";
  return (
    <>
      {!user ? (
        <p>Usuário não detectado.</p>
      ) : (
        <Navbar
          style={{
            width: "31%",
            marginRight: 20,
            marginBottom: 30,
            minHeight: 300,
          }}
        >
          <Navbar.Brand>{user.email}</Navbar.Brand>
          {/* Adicione mais campos conforme necessário */}
          <Button
            style={{
              width: "50%",
              borderRadius: 40,
              display: "flex",
              justifyContent: "center",
            }}
            variant="outline-dark"
          >
            <p style={{ fontSize: "1vw", marginBottom: 0 }}>{buttonText}</p>
          </Button>
        </Navbar>
      )}
    </>
  );
};

export default UserProfile;
