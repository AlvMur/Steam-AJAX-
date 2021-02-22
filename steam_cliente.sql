-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-02-2021 a las 19:39:45
-- Versión del servidor: 10.1.35-MariaDB
-- Versión de PHP: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: steam_cliente
--
CREATE DATABASE IF NOT EXISTS steam_cliente DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE steam_cliente;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla cliente
--

DROP TABLE IF EXISTS cliente;
CREATE TABLE cliente (
  id_cliente varchar(9) COLLATE utf16_spanish_ci NOT NULL,
  nombre varchar(30) COLLATE utf16_spanish_ci DEFAULT NULL,
  apellidos varchar(30) COLLATE utf16_spanish_ci DEFAULT NULL,
  fecha_nac date DEFAULT NULL,
  email varchar(40) COLLATE utf16_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_spanish_ci;

--
-- Volcado de datos para la tabla cliente
--

INSERT INTO cliente (id_cliente, nombre, apellidos, fecha_nac, email) VALUES
('12345678A', 'Armando', 'Jaleo', '1997-03-13', 'armandoJaleo@correo.com'),
('12345678B', 'Lola', 'Mento', '1990-09-21', 'lolaMento@correo.com'),
('12345678C', 'Susana', 'Torio', '1995-08-30', 'susanaTorio@correo.com'),
('12345678D', 'Esteban', 'Dido', '2000-12-01', 'estebanDido@correo.com'),
('12345678E', 'Rosa', 'Gutierrez', '1998-04-15', 'rosaGutierrez@correo.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla compra
--

DROP TABLE IF EXISTS compra;
CREATE TABLE compra (
  id_cliente int(11) NOT NULL,
  id_juego int(11) NOT NULL,
  id_compra int(11) NOT NULL,
  fecha date DEFAULT NULL,
  coste_compra double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_spanish_ci;

--
-- Volcado de datos para la tabla compra
--

INSERT INTO compra (id_cliente, id_juego, id_compra, fecha, coste_compra) VALUES
(1, 1, 1, '2021-01-05', 9.99),
(2, 2, 1, '2021-01-05', 9.99),
(3, 2, 2, '2021-01-05', 34.9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla juego
--

DROP TABLE IF EXISTS juego;
CREATE TABLE juego (
  id_juego int(4) NOT NULL,
  titulo varchar(30) COLLATE utf16_spanish_ci NOT NULL,
  genero varchar(30) COLLATE utf16_spanish_ci NOT NULL,
  año_lanzamiento date NOT NULL,
  precio double(4,2) NOT NULL,
  pegi varchar(2) COLLATE utf16_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_spanish_ci;

--
-- Volcado de datos para la tabla juego
--

INSERT INTO juego (id_juego, titulo, genero, año_lanzamiento, precio, pegi) VALUES
(1, 'The binding of Isaac', 'Indie', '2011-09-28', 34.90, '16'),
(3, 'BioShock', 'Shooter', '2007-08-19', 34.90, '18'),
(4, 'Forza Horizon 4', 'Conduccion', '2018-09-28', 29.77, '3'),
(5, 'Red Dead Redemption II', 'Sandbox', '2018-10-26', 59.99, '18'),
(6, 'Dead Space', 'Supervivencia Horror', '2008-10-14', 12.99, '18'),
(7, 'Stardew Valley', 'Indie', '2016-02-26', 20.45, '12'),
(8, 'F1 2020', 'Conduccion', '2020-07-06', 69.99, '16'),
(9, 'Cuphead', 'Indie', '2017-09-29', 15.50, '16'),
(10, 'Grand Theft Aunto V', 'Sandbox', '2013-09-17', 50.00, '18'),
(11, 'Tom Clancy\'s Rainbow Six: Sieg', 'Shooter', '2015-04-07', 24.99, '18'),
(12, 'The Last Of Us Part II', 'Supervivencia Horror', '2020-06-19', 26.95, '18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla subscripcion
--

DROP TABLE IF EXISTS subscripcion;
CREATE TABLE subscripcion (
  id_subscripcion int(4) DEFAULT NULL,
  id_cliente int(4) DEFAULT NULL,
  fecha_expiracion date DEFAULT NULL,
  precio double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_spanish_ci;

--
-- Volcado de datos para la tabla subscripcion
--

INSERT INTO subscripcion (id_subscripcion, id_cliente, fecha_expiracion, precio) VALUES
(1, 1, '2021-03-28', 10),
(2, 2, '2021-03-28', 10),
(3, 3, '2021-03-28', 10);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla cliente
--
ALTER TABLE cliente
  ADD PRIMARY KEY (id_cliente);

--
-- Indices de la tabla compra
--
ALTER TABLE compra
  ADD PRIMARY KEY (id_cliente,id_juego,id_compra);

--
-- Indices de la tabla juego
--
ALTER TABLE juego
  ADD PRIMARY KEY (id_juego);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla juego
--
ALTER TABLE juego
  MODIFY id_juego int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
