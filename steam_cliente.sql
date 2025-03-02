-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-02-2021 a las 20:32:30
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
DROP DATABASE IF EXISTS steam_cliente;
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
  id_cliente varchar(9) COLLATE utf16_spanish_ci NOT NULL,
  id_juego int(11) NOT NULL,
  id_compra int(11) NOT NULL,
  fecha date DEFAULT NULL,
  coste_compra double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_spanish_ci;

--
-- Volcado de datos para la tabla compra
--

INSERT INTO compra (id_cliente, id_juego, id_compra, fecha, coste_compra) VALUES
('12345678A', 1, 1, '2021-01-05', 9.99),
('12345678A', 2, 2, '2021-01-05', 34.9),
('12345678B', 2, 3, '2021-01-05', 9.99),
('12345678B', 3, 4, '0000-00-00', 34.9),
('12345678B', 8, 5, '2021-01-25', 69.99);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla juego
--

DROP TABLE IF EXISTS juego;
CREATE TABLE juego (
  id_juego int(4) NOT NULL,
  titulo varchar(30) COLLATE utf16_spanish_ci NOT NULL,
  genero varchar(30) COLLATE utf16_spanish_ci NOT NULL,
  anyo_lanzamiento date NOT NULL,
  precio double(4,2) NOT NULL,
  pegi varchar(2) COLLATE utf16_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_spanish_ci;

--
-- Volcado de datos para la tabla juego
--

INSERT INTO juego (id_juego, titulo, genero, anyo_lanzamiento, precio, pegi) VALUES
(1, 'The binding of Isaac', 'Indie', '2011-09-28', 34.90, '16'),
(2, 'Mount&Blade', 'Sandbox', '2020-03-20', 50.00, '18'),
(3, 'BioShock', 'Shooter', '2007-08-19', 34.90, '18'),
(4, 'Forza Horizon 4', 'Conduccion', '2018-09-28', 29.77, '3'),
(5, 'Red Dead Redemption II', 'Sandbox', '2018-10-26', 59.99, '18'),
(6, 'Dead Space', 'Supervivencia Horror', '2008-10-14', 12.99, '18'),
(7, 'Stardew Valley', 'Indie', '2016-02-26', 20.45, '12'),
(8, 'F1 2020', 'Conduccion', '2020-07-06', 69.99, '16'),
(9, 'Cuphead', 'Indie', '2017-09-29', 15.50, '16'),
(10, 'Grand Theft Aunto V', 'Sandbox', '2013-09-17', 50.00, '18'),
(11, 'Tom Clancys Rainbow Six: Sieg', 'Shooter', '2015-04-07', 24.99, '18'),
(12, 'The Last Of Us Part II', 'Supervivencia Horror', '2020-06-19', 26.95, '18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla suscripcion
--

DROP TABLE IF EXISTS suscripcion;
CREATE TABLE suscripcion (
  id_suscripcion int(11) NOT NULL,
  id_cliente varchar(9) COLLATE utf16_spanish_ci NOT NULL,
  fecha_expiracion date NOT NULL,
  precio double(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_spanish_ci;

--
-- Volcado de datos para la tabla suscripcion
--

INSERT INTO suscripcion (id_suscripcion, id_cliente, fecha_expiracion, precio) VALUES
(1, '12345678A', '2022-10-10', 10.00),
(2, '12345678B', '0000-00-00', 10.00);

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
  ADD PRIMARY KEY (id_cliente,id_juego,id_compra),
  ADD KEY frk_juego_compra (id_juego);

--
-- Indices de la tabla juego
--
ALTER TABLE juego
  ADD PRIMARY KEY (id_juego);

--
-- Indices de la tabla suscripcion
--
ALTER TABLE suscripcion
  ADD PRIMARY KEY (id_suscripcion),
  ADD KEY frk_cliente_sub (id_cliente);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla juego
--
ALTER TABLE juego
  MODIFY id_juego int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla suscripcion
--
ALTER TABLE suscripcion
  MODIFY id_suscripcion int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla compra
--
ALTER TABLE compra
  ADD CONSTRAINT frk_cliente_compra FOREIGN KEY (id_cliente) REFERENCES `cliente` (id_cliente),
  ADD CONSTRAINT frk_juego_compra FOREIGN KEY (id_juego) REFERENCES juego (id_juego);

--
-- Filtros para la tabla suscripcion
--
ALTER TABLE suscripcion
  ADD CONSTRAINT frk_cliente_sub FOREIGN KEY (id_cliente) REFERENCES `cliente` (id_cliente);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
