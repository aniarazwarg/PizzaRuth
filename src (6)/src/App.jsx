import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contato from "./pages/Entrar";
import Home from "./pages/Home";
import Sobre from "./pages/Criar";
import Entrar from "./pages/Entrar";
import Criar from "./pages/Criar";
import { useState } from "react";
import "./App.css";
import { Button, Card } from "react-bootstrap";
import ExemploMap from "./pages/exemploMap";
import Cardapio from "./pages/Cardapio";
import Usuario from "./pages/Usuario";
import CEPForm from "./pages/searchCep";
import Produtos from "./pages/Produtos";
import Cadastro from "./pages/Cadastro";
import Administrador from "./pages/Administrador";
import Post from "./pages/Post";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element ={<Home/>}/>
          <Route path="/Entrar" element ={<Entrar/>}/>
          <Route path="/Criar" element ={<Criar/>}/>
          <Route path="/exemploMap" element={<ExemploMap/>}/>
          <Route path="/" element={<Cardapio/>}/>
          <Route path="/Usuario" element={<Usuario/>}/>
          <Route path="/CEP" element={<CEPForm/>}/>
          <Route path="/Produtos" element={<Produtos/>}/>
          <Route path="/Cadastro" element={<Cadastro/>}/>
          <Route path="/Administrador" element={<Administrador/>}/>
          <Route path="/Post" element={<Post/>}/>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
