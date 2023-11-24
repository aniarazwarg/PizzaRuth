import React from 'react';
import { Navbar, Button, Nav } from 'react-bootstrap';

const UserProfile = ({ user }) => {
  console.log('Dados recebidos no UserProfile:', user);

  if (!user) {
    return <p>Usuário não disponível</p>;
  }

  return (
    <div>
      <p>Email: {user.email}</p>
      <p>Função: {user.funcao}</p>
    </div>
  );
};

export default UserProfile;