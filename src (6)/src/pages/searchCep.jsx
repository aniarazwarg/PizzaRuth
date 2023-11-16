import React, { useState } from 'react';

function CEPForm() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [erro, setErro] = useState(null);

  const buscarCEP = () => {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        if (data.erro) {
          setEndereco(null);
          setErro('CEP não encontrado');
        } else {
          setEndereco(data);
          setErro(null);
        }
      })
      .catch(error => {
        console.error('Ocorreu um erro ao buscar informações do CEP:', error);
        setErro('Ocorreu um erro ao buscar informações do CEP');
        setEndereco(null);
      });
  };

  return (
    <div>
      <h2>Consulta de CEP</h2>
      <input
        type="text"
        placeholder="Digite o CEP"
        value={cep}
        onChange={e => setCep(e.target.value)}
      />
      <button onClick={buscarCEP}>Buscar</button>
      {erro && <p>{erro}</p>}
      {endereco && (
        <div>
          <p>CEP: {endereco.cep}</p>
          <p>Logradouro: {endereco.logradouro}</p>
          <p>Cidade: {endereco.localidade}</p>
          <p>Estado: {endereco.uf}</p>
        </div>
      )}
    </div>
  );
}

export default CEPForm;
