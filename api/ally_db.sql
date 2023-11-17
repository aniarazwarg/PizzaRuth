-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 07-Nov-2023 às 18:23
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `ally_db`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_cao`
--

CREATE TABLE `tb_cao` (
  `cd_cao` int(11) NOT NULL,
  `ds_idade` varchar(45) DEFAULT NULL,
  `nm_cao` varchar(45) DEFAULT NULL,
  `id_sexo` char(1) DEFAULT NULL,
  `ds_pelagem` varchar(45) DEFAULT NULL,
  `cd_cliente` bigint(20) DEFAULT NULL,
  `nm_raca` varchar(100) DEFAULT NULL,
  `ds_porte` varchar(100) NOT NULL,
  `ds_peso` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_cliente`
--

CREATE TABLE `tb_cliente` (
  `cd_cliente` bigint(20) NOT NULL,
  `nm_cliente` varchar(45) DEFAULT NULL,
  `dt_nasc_cliente` date DEFAULT NULL,
  `email` varchar(30) NOT NULL,
  `senha` varchar(30) NOT NULL,
  `cpf` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Extraindo dados da tabela `tb_cliente`
--

INSERT INTO `tb_cliente` (`cd_cliente`, `nm_cliente`, `dt_nasc_cliente`, `email`, `senha`, `cpf`) VALUES
(10, 'Luca Barata', '0000-00-00', 'luca_barata@hotmail.com', 'barubaru97', '04864211124'),
(12, 'João', '1998-02-03', 'teste', 'teste', '0123'),
(13, 'Lucas', '1999-05-09', 'teste1', 'teste', '1234'),
(14, 'Mateus', '1995-03-02', 'mat@bol', '123', '04864211123'),
(15, 'nia', '1994-01-01', 'nia', 'nia', 'nia'),
(16, '', '0000-00-00', '', '', ''),
(17, '', '0000-00-00', '', '', '');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_comentarios`
--

CREATE TABLE `tb_comentarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(30) NOT NULL,
  `foto` varchar(50) NOT NULL,
  `comentario` varchar(150) NOT NULL,
  `curtidas` int(11) NOT NULL,
  `descurtidas` int(11) NOT NULL,
  `ok` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `tb_comentarios`
--

INSERT INTO `tb_comentarios` (`id`, `nome`, `foto`, `comentario`, `curtidas`, `descurtidas`, `ok`) VALUES
(1, 'Maria', '', 'Gostei muito dos serviços oferecidos pela Brothers.', 1, 0, 1),
(4, 'José', '', 'AAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 21, 17, 1),
(6, 'Ana', '', 'AAAAAAAAAAAAAAAAAAAAaaaaaaaaaaAAAAAAAAAAAAAAAAAAAAaaaaaaaaaaAAAAAAAAAAAAAAAAAAAAaaaaaaaaaaAAAAAAAAAAAAAAAAAAAAaaaaaaaaaaAAAAAAAAAAAAAAAAAAAAaaaaaaaaaa', 15, 17, 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_ordem_servico`
--

CREATE TABLE `tb_ordem_servico` (
  `cd_ordem_servico` int(11) NOT NULL,
  `cd_cliente` bigint(20) DEFAULT NULL,
  `cd_servico` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_raca`
--

CREATE TABLE `tb_raca` (
  `cd_raca` int(11) NOT NULL,
  `nm_raca` varchar(100) DEFAULT NULL,
  `qt_peso` int(11) DEFAULT NULL,
  `sg_porte` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_servico`
--

CREATE TABLE `tb_servico` (
  `cd_servico` int(11) NOT NULL,
  `cd_cliente` varchar(100) NOT NULL,
  `nm_servico` varchar(45) DEFAULT NULL,
  `dt_checkin` date DEFAULT NULL,
  `dt_checkout` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Extraindo dados da tabela `tb_servico`
--

INSERT INTO `tb_servico` (`cd_servico`, `cd_cliente`, `nm_servico`, `dt_checkin`, `dt_checkout`) VALUES
(1, '', NULL, '2023-11-02', '2023-11-09'),
(2, '', NULL, '2023-11-03', '2023-11-08'),
(3, '', NULL, '2023-11-03', '2023-11-08'),
(4, '', NULL, '2023-11-13', '2023-11-15');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_vacinas`
--

CREATE TABLE `tb_vacinas` (
  `cd_vacina` int(11) NOT NULL,
  `ic_v8_v10` char(2) DEFAULT NULL,
  `ic_antirrabica` char(1) DEFAULT NULL,
  `ic_gripe` char(1) DEFAULT NULL,
  `ic_giardia` char(1) DEFAULT NULL,
  `cd_cao` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `tb_cao`
--
ALTER TABLE `tb_cao`
  ADD PRIMARY KEY (`cd_cao`);

--
-- Índices para tabela `tb_cliente`
--
ALTER TABLE `tb_cliente`
  ADD PRIMARY KEY (`cd_cliente`);

--
-- Índices para tabela `tb_comentarios`
--
ALTER TABLE `tb_comentarios`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `tb_ordem_servico`
--
ALTER TABLE `tb_ordem_servico`
  ADD PRIMARY KEY (`cd_ordem_servico`);

--
-- Índices para tabela `tb_raca`
--
ALTER TABLE `tb_raca`
  ADD PRIMARY KEY (`cd_raca`);

--
-- Índices para tabela `tb_servico`
--
ALTER TABLE `tb_servico`
  ADD PRIMARY KEY (`cd_servico`);

--
-- Índices para tabela `tb_vacinas`
--
ALTER TABLE `tb_vacinas`
  ADD PRIMARY KEY (`cd_vacina`),
  ADD KEY `tb_vacinas_ibfk_1` (`cd_cao`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tb_cao`
--
ALTER TABLE `tb_cao`
  MODIFY `cd_cao` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tb_cliente`
--
ALTER TABLE `tb_cliente`
  MODIFY `cd_cliente` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de tabela `tb_comentarios`
--
ALTER TABLE `tb_comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `tb_servico`
--
ALTER TABLE `tb_servico`
  MODIFY `cd_servico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `tb_vacinas`
--
ALTER TABLE `tb_vacinas`
  ADD CONSTRAINT `tb_vacinas_ibfk_1` FOREIGN KEY (`cd_cao`) REFERENCES `tb_cao` (`cd_cao`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
