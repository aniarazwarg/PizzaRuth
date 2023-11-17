-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 26-Out-2023 às 01:50
-- Versão do servidor: 10.4.24-MariaDB
-- versão do PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `slimprodutos`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `categoria`
--

CREATE TABLE `categoria` (
  `ID` int(11) NOT NULL,
  `NOME` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `categoria`
--

INSERT INTO `categoria` (`ID`, `NOME`) VALUES
(1, 'Categoria 1'),
(2, 'Categoria 2'),
(3, 'Categoria 3'),
(4, 'Categoria 4'),
(5, 'Categoria 5');

-- --------------------------------------------------------

--
-- Estrutura da tabela `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(30) NOT NULL,
  `foto` varchar(50) NOT NULL,
  `comentario` varchar(150) NOT NULL,
  `curtidas` int(11) NOT NULL,
  `descurtidas` int(11) NOT NULL,
  `ok` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `comentarios`
--

INSERT INTO `comentarios` (`id`, `nome`, `foto`, `comentario`, `curtidas`, `descurtidas`, `ok`) VALUES
(1, 'Maria', '', 'Gostei muito dos serviços oferecidos pela Brothers.', 37, 22, 1),
(2, 'João', '', 'Péssimo serviço da Brothers... passeadores horríveis. Pior de todos é o Yan Gay.', 36, 22, 1),
(4, 'José', '', 'AAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 36, 22, 1),
(5, 'Carlos', '', 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 36, 22, 1),
(6, 'Ana', '', 'AAAAAAAAAAAAAAAAAAAAaaaaaaaaaaAAAAAAAAAAAAAAAAAAAAaaaaaaaaaaAAAAAAAAAAAAAAAAAAAAaaaaaaaaaaAAAAAAAAAAAAAAAAAAAAaaaaaaaaaaAAAAAAAAAAAAAAAAAAAAaaaaaaaaaa', 8, 8, 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `produto`
--

CREATE TABLE `produto` (
  `ID` bigint(20) NOT NULL,
  `NOME` varchar(100) NOT NULL,
  `DESCRICAO` varchar(1000) DEFAULT NULL,
  `PRECO_COMPRA` decimal(9,2) NOT NULL,
  `PRECO_VENDA` decimal(9,2) NOT NULL,
  `QUANTIDADE` int(11) NOT NULL DEFAULT 0,
  `DISPONIVEL` tinyint(1) NOT NULL DEFAULT 1,
  `DT_CADASTRO` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `produto`
--

INSERT INTO `produto` (`ID`, `NOME`, `DESCRICAO`, `PRECO_COMPRA`, `PRECO_VENDA`, `QUANTIDADE`, `DISPONIVEL`, `DT_CADASTRO`) VALUES
(2, 'Feijão', 'Carioca', '5.83', '9.00', 47, 1, '2023-10-21 00:18:29'),
(3, 'Açucar', 'Refinado', '4.33', '6.00', 27, 0, '2023-10-21 00:18:29'),
(4, 'Arroz', NULL, '0.00', '0.00', 0, 1, '2023-10-21 00:19:32');

-- --------------------------------------------------------

--
-- Estrutura da tabela `produto_categoria`
--

CREATE TABLE `produto_categoria` (
  `ID_PRODUTO` bigint(20) NOT NULL,
  `ID_CATEGORIA` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `UC_NOME` (`NOME`);

--
-- Índices para tabela `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`ID`);

--
-- Índices para tabela `produto_categoria`
--
ALTER TABLE `produto_categoria`
  ADD KEY `FK_PRODUTO` (`ID_PRODUTO`),
  ADD KEY `FK_CATEGORIA` (`ID_CATEGORIA`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `categoria`
--
ALTER TABLE `categoria`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `produto`
--
ALTER TABLE `produto`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `produto_categoria`
--
ALTER TABLE `produto_categoria`
  ADD CONSTRAINT `FK_CATEGORIA` FOREIGN KEY (`ID_CATEGORIA`) REFERENCES `categoria` (`ID`),
  ADD CONSTRAINT `FK_PRODUTO` FOREIGN KEY (`ID_PRODUTO`) REFERENCES `produto` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
