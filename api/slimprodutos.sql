-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 28-Nov-2023 às 02:53
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
-- Estrutura da tabela `pizzas`
--

CREATE TABLE `pizzas` (
  `id` int(11) NOT NULL,
  `sabor` varchar(20) NOT NULL,
  `descricao` varchar(100) NOT NULL,
  `imagem` varchar(300) NOT NULL,
  `preco` decimal(11,2) NOT NULL,
  `categoria` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `pizzas`
--

INSERT INTO `pizzas` (`id`, `sabor`, `descricao`, `imagem`, `preco`, `categoria`) VALUES
(1, 'Pepperoni', 'Fatias de pepperoni servidas sobre generosa camada de queijo hut e molho de tomate.', 'pepperoni.jpg', '33.00', ''),
(2, 'Frango com Requeijão', 'Frango, queijo Hut e requeijão cremoso\r\n', 'pepperoni.jpg', '36.00', ''),
(3, 'Brasileira', 'Molho de tomate, queijo Hut, requeijão, presunto e azeitonas verdes.', 'pepperoni.jpg', '58.00', ''),
(5, 'lingueça', 'com ovos medios', 'pepperoni.jpg', '69.00', 'pizza'),
(6, 'Verdinha', 'mix de ervas', 'verdinha.jpg', '41.20', 'pizza'),
(7, 'cacetinho', 'pequeno cacete bem recheado', 'breadstick.png', '18.00', 'entradinha'),
(8, 'sorvete 5 leites', 'leite condensado, creme de leite, leite em pó, leite de vaca...', 'leitinho.png', '33.00', 'sobremesa'),
(9, 'Energia', 'Queijo Brie, mel, damasco e castanha', 'pizzabrie.jpg', '50.00', 'pizza'),
(10, 'Ki Sabor', 'Queijo Provolone, carne seca, cebola roxa, catupiry e milho ', 'carne seca.jpg', '45.00', 'pizza');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `cd_cliente` int(11) NOT NULL,
  `nome` varchar(200) NOT NULL,
  `email` varchar(30) NOT NULL,
  `senha` varchar(2000) NOT NULL,
  `funcao` varchar(100) NOT NULL,
  `logradouro` varchar(100) NOT NULL,
  `numero` int(11) NOT NULL,
  `bairro` varchar(100) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `estado` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`cd_cliente`, `nome`, `email`, `senha`, `funcao`, `logradouro`, `numero`, `bairro`, `cidade`, `estado`) VALUES
(9, '', 'fvillelas.tecnico@gmail.com', '$2y$10$IETJphQtxGkNvq8GpbgibuQ', 'cliente', '', 412, '', '', ''),
(10, '', 'issoeumemail@ficticio.com', '$2y$10$nH8wBd1D0v7c1LBr932tEed', 'cliente', '', 214, '', '', ''),
(12, '', 'niah.zwarg@gmail.com', '$2y$10$7ZjsgGM/UuAiWFh6azEiF.1gXhpavX5W1yr1gIkLPCen0GG6E3PhC', 'cliente', '', 217, '', '', ''),
(14, '', 'eu@eu.com', '$2y$10$EOwGib/a9z1xs6MIztQG8.APPUWtya.VSAE/Mr4lgqtjLx4R1IZj.', 'admin', '', 11, '', '', ''),
(15, '', 'eu@eu.eu', '$2y$10$G83uN797nGb.2QkKTZO3lOMnJJ3Z0jA3UeWmYAPwWmWJ3GdDSD3ZK', 'cliente', '', 0, '', '', ''),
(16, '', 'aaa@aa.aa', '$2y$10$gu2KCK1Jw6Wv8MFs.qkFjeG8cWD/JHAILXXjK/q318GvobaoVVyBO', 'admin', '', 0, '', '', ''),
(17, '', 'oi@oi.oi', '$2y$10$CuvFot4SwKtQ6w6GdQeUY.QnX7/TtVYbg09AbZRCNq3ZO78XWKbGO', 'admin', '', 0, '', '', ''),
(18, '', 'i@i.i', '$2y$10$vKh8W23tI38wvSqbzr.pR.RRuicwLxqmqw4/w/.gU4MgjAyMJ7P4K', 'cliente', '', 0, '', '', ''),
(19, '', 'cli@cli.cli', '$2y$10$OiUlVNN/cex/5JlrnQ9sROV3oxojYhKrI54/zde2IE3h4.qj6X28O', 'cliente', '', 511, '', '', ''),
(20, '', 'ggg@gg.gg', '$2y$10$WBtXyGR1.5aukoMrF3/QAejkb8lhs.J7hdDIH2ZoVSGRLhYFjuoDq', 'admin', 'Rua Santos Dumont ', 1, 'Estuário', 'Santos ', 'SP '),
(21, '', 'oo@oo.oo', '$2y$10$N4q4TSfnE.Jiw1vQDjKQg.GM3x6Gd7mzSJA.7BaaNH9Bl97ZNKlAC', 'admin', 'Avenida Rangel Pestana', 412, 'Jabaquara', 'Santos', 'SP'),
(22, '', 'ff@ff.ff', '$2y$10$7rVgVLQe5fd0pAh.yrIG2uXfAUYQeW.q0HEc2ibA5keI6XpS4xYO6', 'admin', 'Rua Santos Dumont', 11, 'Estuário', 'Santos', 'SP'),
(23, 'Aniara', 'ggg@gg.gg', '$2y$10$aJ2XE76gDEWgARpaEcYOseyNuDPs6YvS99jXX5MTnCIrKCwwzHQly', 'admin', 'Avenida Rangel Pestana', 142, 'Jabaquara', 'Santos', 'SP'),
(24, 'Gustavo', 'gustavo@gmail.com', '$2y$10$RCFSKr1LghCmvl3Wz4YE0OpmdSoCnnKHDjHCQEn9mNh1j9QZBQhFO', 'admin', 'Rua Sacadura Cabral', 44, 'Vila Jockei Clube', 'São Vicente', 'SP');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
  MODIFY `cd_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

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
