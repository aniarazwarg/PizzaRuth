-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 01-Nov-2023 às 02:39
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
-- Banco de dados: `ally3110`
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
  `cd_raca` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tb_cao`
--

INSERT INTO `tb_cao` (`cd_cao`, `ds_idade`, `nm_cao`, `id_sexo`, `ds_pelagem`, `cd_cliente`, `cd_raca`) VALUES
(0, NULL, NULL, NULL, NULL, 123, NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_cliente`
--

CREATE TABLE `tb_cliente` (
  `cd_cliente` bigint(20) NOT NULL,
  `nm_cliente` varchar(45) DEFAULT NULL,
  `dt_nasc_cliente` date DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `cpf` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tb_cliente`
--

INSERT INTO `tb_cliente` (`cd_cliente`, `nm_cliente`, `dt_nasc_cliente`, `email`, `senha`, `cpf`) VALUES
(0, 'nia', '0000-00-00', 'nia', 'nia', 1),
(123, '', '0000-00-00', '', '', 0),
(321, '', '0000-00-00', '', '', 0),
(524, '', '0000-00-00', '', '', 0),
(879, '', '0000-00-00', '', '', 0);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tb_comentarios`
--

INSERT INTO `tb_comentarios` (`id`, `nome`, `foto`, `comentario`, `curtidas`, `descurtidas`, `ok`) VALUES
(1, 'Maria', '', 'Gostei muito dos serviços oferecidos pela Brothers.', 1, 0, 1),
(2, 'João', '', 'Péssimo serviço da Brothers... passeadores horríveis. Pior de todos é o Yan Gay.', 31, 24, 0),
(4, 'José', '', 'AAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 21, 17, 1),
(5, 'Carlos', '', 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 15, 19, 0),
(6, 'Ana', '', 'AAAAAAAAAAAAAAAAAAAAaaaaaaaaaaAAAAAAAAAAAAAAAAAAAAaaaaaaaaaaAAAAAAAAAAAAAAAAAAAAaaaaaaaaaaAAAAAAAAAAAAAAAAAAAAaaaaaaaaaaAAAAAAAAAAAAAAAAAAAAaaaaaaaaaa', 15, 17, 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_ordem_servico`
--

CREATE TABLE `tb_ordem_servico` (
  `cd_ordem_servico` int(11) NOT NULL,
  `cd_cliente` bigint(20) DEFAULT NULL,
  `cd_servico` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_raca`
--

CREATE TABLE `tb_raca` (
  `cd_raca` int(11) NOT NULL,
  `nm_raca` varchar(100) DEFAULT NULL,
  `qt_peso` int(11) DEFAULT NULL,
  `sg_porte` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_servico`
--

CREATE TABLE `tb_servico` (
  `cd_servico` int(11) NOT NULL,
  `nm_servico` varchar(45) DEFAULT NULL,
  `dt_checkin` datetime DEFAULT NULL,
  `dt_checkout` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `tb_cao`
--
ALTER TABLE `tb_cao`
  ADD PRIMARY KEY (`cd_cao`),
  ADD UNIQUE KEY `fk_tb_cliente_cao` (`cd_cliente`),
  ADD KEY `fk_raca` (`cd_raca`);

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
  ADD PRIMARY KEY (`cd_ordem_servico`),
  ADD KEY `fk_os_cliente` (`cd_cliente`),
  ADD KEY `fk_os_servico` (`cd_servico`);

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
  ADD KEY `cd_cao` (`cd_cao`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tb_comentarios`
--
ALTER TABLE `tb_comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `tb_cao`
--
ALTER TABLE `tb_cao`
  ADD CONSTRAINT `fk_cliente_cao` FOREIGN KEY (`cd_cliente`) REFERENCES `tb_cliente` (`cd_cliente`),
  ADD CONSTRAINT `fk_raca` FOREIGN KEY (`cd_raca`) REFERENCES `tb_raca` (`cd_raca`);

--
-- Limitadores para a tabela `tb_ordem_servico`
--
ALTER TABLE `tb_ordem_servico`
  ADD CONSTRAINT `fk_os_cliente` FOREIGN KEY (`cd_cliente`) REFERENCES `tb_cliente` (`cd_cliente`),
  ADD CONSTRAINT `fk_os_servico` FOREIGN KEY (`cd_servico`) REFERENCES `tb_servico` (`cd_servico`);

--
-- Limitadores para a tabela `tb_vacinas`
--
ALTER TABLE `tb_vacinas`
  ADD CONSTRAINT `tb_vacinas_ibfk_1` FOREIGN KEY (`cd_cao`) REFERENCES `tb_cao` (`cd_cao`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
