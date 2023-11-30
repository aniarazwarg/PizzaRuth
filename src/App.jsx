import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
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


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element ={<Home/>}/>
          <Route path="/Entrar" element ={<Entrar/>}/>
          <Route path="/Criar" element ={<Criar/>}/>
          <Route path="/exemploMap" element={<ExemploMap/>}/>
          <Route path="/:id" element={<Cardapio/>}/>
          <Route path="/Home" element={<Home/>}/>
          <Route path="/Usuario" element={<Usuario/>}/>
          <Route path="/CEP" element={<CEPForm/>}/>
          <Route path="/Produtos" element={<Produtos/>}/>
          <Route path="/Cadastro" element={<Cadastro />} />
          <Route path="/cardapio" element={<Cardapio />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;