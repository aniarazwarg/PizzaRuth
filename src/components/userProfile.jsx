// UserProfile.js

import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
const UserProfile = ({ user }) => {
    if (!user) {return <p>Usuário não disponível</p>;
    }
  
    const buttonText = user.funcao === 'cliente' ? 'Comprar' : 'Cadastrar';
  
    return (
      <Navbar style={{ width: "31%", marginRight: 20, marginBottom: 30, minHeight: 300 }}>
        <Navbar.Brand>{user.email}</Navbar.Brand>
        {/* Adicione mais campos conforme necessário */}
        <Button style={{ width: "50%", borderRadius: 40, display: 'flex', justifyContent: 'center' }} variant="outline-dark">
          <p style={{ fontSize: '1vw', marginBottom: 0 }}>{buttonText}</p>
        </Button>
      </Navbar>
    );
  };
export default UserProfile;
