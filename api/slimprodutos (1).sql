-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 17-Nov-2023 às 01:33
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.2.0

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Estrutura da tabela `pizzas`
--

CREATE TABLE `pizzas` (
  `id` int(11) NOT NULL,
  `sabor` varchar(20) NOT NULL,
  `descricao` varchar(100) NOT NULL,
  `imagem` varchar(300) NOT NULL,
  `preco` decimal(11,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `pizzas`
--

INSERT INTO `pizzas` (`id`, `sabor`, `descricao`, `imagem`, `preco`) VALUES
(1, 'Pepperoni', 'Fatias de pepperoni servidas sobre generosa camada de queijo hut e molho de tomate.', 'pepperoni.jpg', '33.00'),
(2, 'Frango com Requeijão', 'Frango, queijo Hut e requeijão cremoso\r\n', 'pepperoni.jpg', '36.00'),
(3, 'Brasileira', 'Molho de tomate, queijo Hut, requeijão, presunto e azeitonas verdes.', 'pepperoni.jpg', '58.00');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `produto`
--

INSERT INTO `produto` (`ID`, `NOME`, `DESCRICAO`, `PRECO_COMPRA`, `PRECO_VENDA`, `QUANTIDADE`, `DISPONIVEL`, `DT_CADASTRO`) VALUES
(1, 'Arroz', 'Agulinha Tipo 1', '8.70', '10.00', 30, 1, '2023-10-05 23:04:04'),
(2, 'Feijão', 'Carioca', '5.83', '9.00', 47, 1, '2023-10-05 23:04:04'),
(3, 'Açucar', 'Refinado', '4.33', '6.00', 27, 0, '2023-10-05 23:04:04');

-- --------------------------------------------------------

--
-- Estrutura da tabela `produtos`
--

CREATE TABLE `produtos` (
  `id` int(30) NOT NULL,
  `produto` varchar(30) NOT NULL,
  `preco` decimal(11,2) NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `imagem` varchar(100) NOT NULL,
  `descricao` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Extraindo dados da tabela `produtos`
--

INSERT INTO `produtos` (`id`, `produto`, `preco`, `tipo`, `imagem`, `descricao`) VALUES
(1, 'teste', '123.00', 'pizza', '', 'aaa'),
(2, 'Mussarela', '50.00', 'pizza', 'C:\\fakepath\\pepperoni.jpg', 'pizza boa'),
(3, '', '0.00', '', 'pepperoni.jpg', '');

-- --------------------------------------------------------

--
-- Estrutura da tabela `produto_categoria`
--

CREATE TABLE `produto_categoria` (
  `ID_PRODUTO` bigint(20) NOT NULL,
  `ID_CATEGORIA` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `cd_cliente` int(11) NOT NULL,
  `email` varchar(30) NOT NULL,
  `senha` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`cd_cliente`, `email`, `senha`) VALUES
(1, 'lucabarata@bol.com', '123'),
(6, 'teste1', 'teste1'),
(7, 'aaa', 'aaa'),
(8, 'luca', 'luca123');

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
-- Índices para tabela `pizzas`
--
ALTER TABLE `pizzas`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`ID`);

--
-- Índices para tabela `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `produto_categoria`
--
ALTER TABLE `produto_categoria`
  ADD KEY `FK_PRODUTO` (`ID_PRODUTO`),
  ADD KEY `FK_CATEGORIA` (`ID_CATEGORIA`);

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`cd_cliente`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `categoria`
--
ALTER TABLE `categoria`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `pizzas`
--
ALTER TABLE `pizzas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `produto`
--
ALTER TABLE `produto`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `produtos`
--
ALTER TABLE `produtos`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `cd_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
