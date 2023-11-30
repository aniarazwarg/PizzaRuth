-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 30/11/2023 às 21:02
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.0.30

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
-- Estrutura para tabela `categoria`
--

CREATE TABLE `categoria` (
  `ID` int(11) NOT NULL,
  `NOME` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `categoria`
--

INSERT INTO `categoria` (`ID`, `NOME`) VALUES
(1, 'Categoria 1'),
(2, 'Categoria 2'),
(3, 'Categoria 3'),
(4, 'Categoria 4'),
(5, 'Categoria 5');

-- --------------------------------------------------------

--
-- Estrutura para tabela `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `pedido` varchar(5000) NOT NULL,
  `valor` decimal(10,0) NOT NULL,
  `pagamento` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_logradouro` varchar(255) DEFAULT NULL,
  `user_numero` varchar(20) DEFAULT NULL,
  `items` text DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `pedidos`
--

INSERT INTO `pedidos` (`id`, `user_id`, `user_name`, `user_email`, `user_logradouro`, `user_numero`, `items`, `total_price`, `payment_method`, `created_at`) VALUES
(1, NULL, NULL, NULL, NULL, NULL, '[{\"id\":\"19\",\"sabor\":\"Cervejinha\",\"descricao\":\"pq ningu\\u00e9m \\u00e9 de ferro.\",\"imagem\":\"cervejinha.jpg\",\"preco\":\"3.00\",\"categoria\":\"bebidas\"},{\"id\":\"19\",\"sabor\":\"Cervejinha\",\"descricao\":\"pq ningu\\u00e9m \\u00e9 de ferro.\",\"imagem\":\"cervejinha.jpg\",\"preco\":\"3.00\",\"categoria\":\"bebidas\"},{\"id\":\"19\",\"sabor\":\"Cervejinha\",\"descricao\":\"pq ningu\\u00e9m \\u00e9 de ferro.\",\"imagem\":\"cervejinha.jpg\",\"preco\":\"3.00\",\"categoria\":\"bebidas\"},{\"id\":\"19\",\"sabor\":\"Cervejinha\",\"descricao\":\"pq ningu\\u00e9m \\u00e9 de ferro.\",\"imagem\":\"cervejinha.jpg\",\"preco\":\"3.00\",\"categoria\":\"bebidas\"},{\"id\":\"19\",\"sabor\":\"Cervejinha\",\"descricao\":\"pq ningu\\u00e9m \\u00e9 de ferro.\",\"imagem\":\"cervejinha.jpg\",\"preco\":\"3.00\",\"categoria\":\"bebidas\"}]', 15.00, 'Dinheiro', '2023-11-30 16:44:53'),
(2, NULL, NULL, NULL, NULL, NULL, '[{\"id\":\"19\",\"sabor\":\"Cervejinha\",\"descricao\":\"pq ningu\\u00e9m \\u00e9 de ferro.\",\"imagem\":\"cervejinha.jpg\",\"preco\":\"3.00\",\"categoria\":\"bebidas\"},{\"id\":\"19\",\"sabor\":\"Cervejinha\",\"descricao\":\"pq ningu\\u00e9m \\u00e9 de ferro.\",\"imagem\":\"cervejinha.jpg\",\"preco\":\"3.00\",\"categoria\":\"bebidas\"},{\"id\":\"19\",\"sabor\":\"Cervejinha\",\"descricao\":\"pq ningu\\u00e9m \\u00e9 de ferro.\",\"imagem\":\"cervejinha.jpg\",\"preco\":\"3.00\",\"categoria\":\"bebidas\"},{\"id\":\"19\",\"sabor\":\"Cervejinha\",\"descricao\":\"pq ningu\\u00e9m \\u00e9 de ferro.\",\"imagem\":\"cervejinha.jpg\",\"preco\":\"3.00\",\"categoria\":\"bebidas\"},{\"id\":\"19\",\"sabor\":\"Cervejinha\",\"descricao\":\"pq ningu\\u00e9m \\u00e9 de ferro.\",\"imagem\":\"cervejinha.jpg\",\"preco\":\"3.00\",\"categoria\":\"bebidas\"},{\"id\":\"11\",\"sabor\":\"Frango com catupiry\\u00ae\",\"descricao\":\"frango desfiado e catupiry original.\",\"imagem\":\"franguinho.jpg\",\"preco\":\"35.00\",\"categoria\":\"pizza\"},{\"id\":\"6\",\"sabor\":\"Verdinha\",\"descricao\":\"mix de ervas\",\"imagem\":\"verdinha.jpg\",\"preco\":\"41.20\",\"categoria\":\"pizza\"},{\"id\":\"21\",\"sabor\":\"Esfiha de cora\\u00e7ao\",\"descricao\":\"romanticuzinho, pra vc dar pra alguem.\",\"imagem\":\"pizzaChocoloate.webp\",\"preco\":\"13.00\",\"categoria\":\"sobremesa\"}]', 104.20, 'Dinheiro', '2023-11-30 16:45:42'),
(3, NULL, NULL, NULL, NULL, NULL, '[{\"id\":\"19\",\"sabor\":\"Cervejinha\",\"descricao\":\"pq ningu\\u00e9m \\u00e9 de ferro.\",\"imagem\":\"cervejinha.jpg\",\"preco\":\"3.00\",\"categoria\":\"bebidas\"},{\"id\":\"19\",\"sabor\":\"Cervejinha\",\"descricao\":\"pq ningu\\u00e9m \\u00e9 de ferro.\",\"imagem\":\"cervejinha.jpg\",\"preco\":\"3.00\",\"categoria\":\"bebidas\"},{\"id\":\"19\",\"sabor\":\"Cervejinha\",\"descricao\":\"pq ningu\\u00e9m \\u00e9 de ferro.\",\"imagem\":\"cervejinha.jpg\",\"preco\":\"3.00\",\"categoria\":\"bebidas\"},{\"id\":\"19\",\"sabor\":\"Cervejinha\",\"descricao\":\"pq ningu\\u00e9m \\u00e9 de ferro.\",\"imagem\":\"cervejinha.jpg\",\"preco\":\"3.00\",\"categoria\":\"bebidas\"},{\"id\":\"19\",\"sabor\":\"Cervejinha\",\"descricao\":\"pq ningu\\u00e9m \\u00e9 de ferro.\",\"imagem\":\"cervejinha.jpg\",\"preco\":\"3.00\",\"categoria\":\"bebidas\"},{\"id\":\"11\",\"sabor\":\"Frango com catupiry\\u00ae\",\"descricao\":\"frango desfiado e catupiry original.\",\"imagem\":\"franguinho.jpg\",\"preco\":\"35.00\",\"categoria\":\"pizza\"},{\"id\":\"6\",\"sabor\":\"Verdinha\",\"descricao\":\"mix de ervas\",\"imagem\":\"verdinha.jpg\",\"preco\":\"41.20\",\"categoria\":\"pizza\"},{\"id\":\"21\",\"sabor\":\"Esfiha de cora\\u00e7ao\",\"descricao\":\"romanticuzinho, pra vc dar pra alguem.\",\"imagem\":\"pizzaChocoloate.webp\",\"preco\":\"13.00\",\"categoria\":\"sobremesa\"}]', 104.20, 'Dinheiro', '2023-11-30 16:58:19'),
(4, NULL, NULL, NULL, NULL, NULL, '[{\"id\":\"19\",\"sabor\":\"Cervejinha\",\"descricao\":\"pq ningu\\u00e9m \\u00e9 de ferro.\",\"imagem\":\"cervejinha.jpg\",\"preco\":\"3.00\",\"categoria\":\"bebidas\"},{\"id\":\"19\",\"sabor\":\"Cervejinha\",\"descricao\":\"pq ningu\\u00e9m \\u00e9 de ferro.\",\"imagem\":\"cervejinha.jpg\",\"preco\":\"3.00\",\"categoria\":\"bebidas\"},{\"id\":\"19\",\"sabor\":\"Cervejinha\",\"descricao\":\"pq ningu\\u00e9m \\u00e9 de ferro.\",\"imagem\":\"cervejinha.jpg\",\"preco\":\"3.00\",\"categoria\":\"bebidas\"},{\"id\":\"19\",\"sabor\":\"Cervejinha\",\"descricao\":\"pq ningu\\u00e9m \\u00e9 de ferro.\",\"imagem\":\"cervejinha.jpg\",\"preco\":\"3.00\",\"categoria\":\"bebidas\"},{\"id\":\"19\",\"sabor\":\"Cervejinha\",\"descricao\":\"pq ningu\\u00e9m \\u00e9 de ferro.\",\"imagem\":\"cervejinha.jpg\",\"preco\":\"3.00\",\"categoria\":\"bebidas\"},{\"id\":\"11\",\"sabor\":\"Frango com catupiry\\u00ae\",\"descricao\":\"frango desfiado e catupiry original.\",\"imagem\":\"franguinho.jpg\",\"preco\":\"35.00\",\"categoria\":\"pizza\"},{\"id\":\"6\",\"sabor\":\"Verdinha\",\"descricao\":\"mix de ervas\",\"imagem\":\"verdinha.jpg\",\"preco\":\"41.20\",\"categoria\":\"pizza\"},{\"id\":\"21\",\"sabor\":\"Esfiha de cora\\u00e7ao\",\"descricao\":\"romanticuzinho, pra vc dar pra alguem.\",\"imagem\":\"pizzaChocoloate.webp\",\"preco\":\"13.00\",\"categoria\":\"sobremesa\"}]', 104.20, 'Dinheiro', '2023-11-30 17:04:39'),
(5, NULL, NULL, NULL, NULL, NULL, '[{\"id\":\"19\",\"sabor\":\"Cervejinha\",\"descricao\":\"pq ningu\\u00e9m \\u00e9 de ferro.\",\"imagem\":\"cervejinha.jpg\",\"preco\":\"3.00\",\"categoria\":\"bebidas\"},{\"id\":\"19\",\"sabor\":\"Cervejinha\",\"descricao\":\"pq ningu\\u00e9m \\u00e9 de ferro.\",\"imagem\":\"cervejinha.jpg\",\"preco\":\"3.00\",\"categoria\":\"bebidas\"},{\"id\":\"19\",\"sabor\":\"Cervejinha\",\"descricao\":\"pq ningu\\u00e9m \\u00e9 de ferro.\",\"imagem\":\"cervejinha.jpg\",\"preco\":\"3.00\",\"categoria\":\"bebidas\"},{\"id\":\"19\",\"sabor\":\"Cervejinha\",\"descricao\":\"pq ningu\\u00e9m \\u00e9 de ferro.\",\"imagem\":\"cervejinha.jpg\",\"preco\":\"3.00\",\"categoria\":\"bebidas\"},{\"id\":\"19\",\"sabor\":\"Cervejinha\",\"descricao\":\"pq ningu\\u00e9m \\u00e9 de ferro.\",\"imagem\":\"cervejinha.jpg\",\"preco\":\"3.00\",\"categoria\":\"bebidas\"},{\"id\":\"11\",\"sabor\":\"Frango com catupiry\\u00ae\",\"descricao\":\"frango desfiado e catupiry original.\",\"imagem\":\"franguinho.jpg\",\"preco\":\"35.00\",\"categoria\":\"pizza\"},{\"id\":\"6\",\"sabor\":\"Verdinha\",\"descricao\":\"mix de ervas\",\"imagem\":\"verdinha.jpg\",\"preco\":\"41.20\",\"categoria\":\"pizza\"},{\"id\":\"21\",\"sabor\":\"Esfiha de cora\\u00e7ao\",\"descricao\":\"romanticuzinho, pra vc dar pra alguem.\",\"imagem\":\"pizzaChocoloate.webp\",\"preco\":\"13.00\",\"categoria\":\"sobremesa\"}]', 104.20, 'Dinheiro', '2023-11-30 17:17:15'),
(6, NULL, NULL, NULL, NULL, NULL, '[{\"id\":\"9\",\"sabor\":\"Energia\",\"descricao\":\"Queijo Brie, mel, damasco e castanha\",\"imagem\":\"energia.jpg\",\"preco\":\"50.00\",\"categoria\":\"pizza\"}]', 50.00, 'Dinheiro', '2023-11-30 17:20:19'),
(7, NULL, NULL, NULL, NULL, NULL, '[{\"id\":\"19\",\"sabor\":\"Cervejinha\",\"descricao\":\"pq ningu\\u00e9m \\u00e9 de ferro.\",\"imagem\":\"cervejinha.jpg\",\"preco\":\"3.00\",\"categoria\":\"bebidas\"}]', 3.00, 'Dinheiro', '2023-11-30 17:25:49'),
(8, NULL, NULL, NULL, NULL, NULL, '[{\"id\":\"9\",\"sabor\":\"Energia\",\"descricao\":\"Queijo Brie, mel, damasco e castanha\",\"imagem\":\"energia.jpg\",\"preco\":\"50.00\",\"categoria\":\"pizza\"},{\"id\":\"19\",\"sabor\":\"Cervejinha\",\"descricao\":\"pq ningu\\u00e9m \\u00e9 de ferro.\",\"imagem\":\"cervejinha.jpg\",\"preco\":\"3.00\",\"categoria\":\"bebidas\"},{\"id\":\"23\",\"sabor\":\"Esfiha\",\"descricao\":\"recheada de berinjela\",\"imagem\":\"esfiha.jpg\",\"preco\":\"10.00\",\"categoria\":\"entradinha\"}]', 63.00, 'Dinheiro', '2023-11-30 17:32:09');

-- --------------------------------------------------------

--
-- Estrutura para tabela `pizzas`
--

CREATE TABLE `pizzas` (
  `id` int(11) NOT NULL,
  `sabor` varchar(20) NOT NULL,
  `descricao` varchar(100) NOT NULL,
  `imagem` varchar(300) NOT NULL,
  `preco` decimal(11,2) NOT NULL,
  `categoria` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `pizzas`
--

INSERT INTO `pizzas` (`id`, `sabor`, `descricao`, `imagem`, `preco`, `categoria`) VALUES
(1, 'Pepperoni', 'Fatias de pepperoni servidas sobre generosa camada de queijo hut e molho de tomate.', 'pepperoni.jpg', 33.00, ''),
(2, 'Frango com Requeijão', 'Frango, queijo Hut e requeijão cremoso\r\n', 'pepperoni.jpg', 36.00, ''),
(3, 'Brasileira', 'Molho de tomate, queijo Hut, requeijão, presunto e azeitonas verdes.', 'pepperoni.jpg', 58.00, ''),
(5, 'lingueça', 'com ovos medios', 'lingueça.jpg', 69.00, 'pizza'),
(6, 'Verdinha', 'mix de ervas', 'verdinha.jpg', 41.20, 'pizza'),
(7, 'cacetinho', 'pequeno cacete bem recheado', 'breadstick.png', 18.00, 'entradinha'),
(8, 'sorvete 5 leites', 'leite condensado, creme de leite, leite em pó, leite de vaca...', 'leitinho.png', 33.00, 'sobremesa'),
(9, 'Energia', 'Queijo Brie, mel, damasco e castanha', 'energia.jpg', 50.00, 'pizza'),
(10, 'Ki Sabor', 'Queijo Provolone, carne seca, cebola roxa, catupiry e milho ', 'carne seca.jpg', 45.00, 'pizza'),
(11, 'Frango com catupiry®', 'frango desfiado e catupiry original.', 'franguinho.jpg', 35.00, 'pizza'),
(12, 'Salamão', 'pizza de salame do salomão', 'passarinho.jpg', 36.00, 'pizza'),
(13, 'Famigerada Coquinha', 'litrasso de 4.', 'coquinha.jpg', 10.00, 'bebidas'),
(14, 'Suco de laranja', 'aaaaaaaaa que delícia!', 'laranja.jpg', 10.00, 'bebidas'),
(15, 'Pizza de brigadeiro', 'Com leite condensado moça original.', 'pizzaBrigadeiro.jpg', 20.00, 'sobremesa'),
(16, 'Churros GGG', 'Grande, Grosso e Gostoso', 'churros.jpg', 10.00, 'sobremesa'),
(17, 'Rosca ', 'cheia de leite Condensado', 'rosca.jpg', 10.00, 'sobremesa'),
(18, 'PinkLemonade', 'limonada com groselha.', 'pinklemonade.jpg', 24.00, 'bebidas'),
(19, 'Cervejinha', 'pq ninguém é de ferro.', 'cervejinha.jpg', 3.00, 'bebidas'),
(20, 'Chopp de vinho', 'gostosinho.', 'choppdevinho.jpg', 8.00, 'bebidas'),
(21, 'Esfiha de coraçao', 'romanticuzinho, pra vc dar pra alguem.', 'pizzaChocoloate.webp', 13.00, 'sobremesa'),
(22, 'Peperoninja', 'peperoni com queijo', 'peperoninja.jpg', 25.00, 'pizza'),
(23, 'Esfiha', 'recheada de berinjela', 'esfiha.jpg', 10.00, 'entradinha'),
(24, 'Bruscheta', 'só não gosta quem não provou ainda ', 'brusqueta.jpg', 10.00, 'entradinha'),
(25, 'lingueça', 'com ovos medios', 'lingueça.jpg', 32.00, 'pizza');

-- --------------------------------------------------------

--
-- Estrutura para tabela `produto`
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
-- Despejando dados para a tabela `produto`
--

INSERT INTO `produto` (`ID`, `NOME`, `DESCRICAO`, `PRECO_COMPRA`, `PRECO_VENDA`, `QUANTIDADE`, `DISPONIVEL`, `DT_CADASTRO`) VALUES
(1, 'Arroz', 'Agulinha Tipo 1', 8.70, 10.00, 30, 1, '2023-10-05 23:04:04'),
(2, 'Feijão', 'Carioca', 5.83, 9.00, 47, 1, '2023-10-05 23:04:04'),
(3, 'Açucar', 'Refinado', 4.33, 6.00, 27, 0, '2023-10-05 23:04:04');

-- --------------------------------------------------------

--
-- Estrutura para tabela `produtos`
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
-- Despejando dados para a tabela `produtos`
--

INSERT INTO `produtos` (`id`, `produto`, `preco`, `tipo`, `imagem`, `descricao`) VALUES
(1, 'teste', 123.00, 'pizza', '', 'aaa'),
(2, 'Mussarela', 50.00, 'pizza', 'C:\\fakepath\\pepperoni.jpg', 'pizza boa'),
(3, '', 0.00, '', 'pepperoni.jpg', '');

-- --------------------------------------------------------

--
-- Estrutura para tabela `produto_categoria`
--

CREATE TABLE `produto_categoria` (
  `ID_PRODUTO` bigint(20) NOT NULL,
  `ID_CATEGORIA` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`cd_cliente`, `nome`, `email`, `senha`, `funcao`, `logradouro`, `numero`, `bairro`, `cidade`, `estado`) VALUES
(9, '', 'fvillelas.tecnico@gmail.com', '$2y$10$IETJphQtxGkNvq8GpbgibuQ', 'cliente', '', 412, '', '', ''),
(10, '', 'issoeumemail@ficticio.com', '$2y$10$nH8wBd1D0v7c1LBr932tEed', 'cliente', '', 214, '', '', ''),
(23, 'Funcionario', 'ggg@gg.gg', '$2y$10$aJ2XE76gDEWgARpaEcYOseyNuDPs6YvS99jXX5MTnCIrKCwwzHQly', 'admin', 'Avenida Rangel Pestana', 142, 'Jabaquara', 'Santos', 'SP'),
(24, 'Gustavo', 'gustavo@gmail.com', '$2y$10$RCFSKr1LghCmvl3Wz4YE0OpmdSoCnnKHDjHCQEn9mNh1j9QZBQhFO', 'admin', 'Rua Sacadura Cabral', 44, 'Vila Jockei Clube', 'São Vicente', 'SP'),
(25, 'Aniara', 'nia@nia.nia', '$2y$10$cAmKfbMXD1jat3e4mLi3L.390Ejl7zHW2eP.TQNLyDCaC6mWMKi/e', 'cliente', 'Caminho da Paz', 511, 'Caneleira', 'Santos', 'SP'),
(26, 'Yan', 'yan@yan.yan', '$2y$10$Wajk4EbJTRwa4XSlY4D0oeS3tbxrA5eABKSsqa5dbbz36g80DKYfW', 'cliente', 'Rua Doutor Edgardo Boaventura', 28, 'Vila Mathias', 'Santos', 'SP'),
(27, 'Luca', 'luca_bol@bol.com.br', '$2y$10$xCv21EQXjzed9iKQFkSX/uL5UCsW8WchNv/coP4avwLrQxXnxZrBy', 'cliente', 'Rua Alexandre Herculano', 88, 'Boqueirão', 'Santos', 'SP');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `UC_NOME` (`NOME`);

--
-- Índices de tabela `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Índices de tabela `pizzas`
--
ALTER TABLE `pizzas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`ID`);

--
-- Índices de tabela `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `produto_categoria`
--
ALTER TABLE `produto_categoria`
  ADD KEY `FK_PRODUTO` (`ID_PRODUTO`),
  ADD KEY `FK_CATEGORIA` (`ID_CATEGORIA`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`cd_cliente`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `categoria`
--
ALTER TABLE `categoria`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `pizzas`
--
ALTER TABLE `pizzas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

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
  MODIFY `cd_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`cd_cliente`);

--
-- Restrições para tabelas `produto_categoria`
--
ALTER TABLE `produto_categoria`
  ADD CONSTRAINT `FK_CATEGORIA` FOREIGN KEY (`ID_CATEGORIA`) REFERENCES `categoria` (`ID`),
  ADD CONSTRAINT `FK_PRODUTO` FOREIGN KEY (`ID_PRODUTO`) REFERENCES `produto` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
