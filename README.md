emercado-api
JSONs container para simular una Api REST para el ecommerce e-Mercado.


ENTREGA 8 - Grupo 3.

Codigos CREATE para MaríaDB.

1. Crear una base de datos con el nombre entrega8: CREATE DATABASE `entrega8` /*!40100 COLLATE 'utf8mb4_general_ci' */;

2. Utilizar los siguientes códigos CREATE para las tablas.

CREATE TABLE `carrito` (
	`id` INT(11) NOT NULL,
	`name` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_general_ci',
	`count` INT(11) NOT NULL,
	`unitCost` INT(11) NOT NULL,
	`currency` VARCHAR(4) NOT NULL COLLATE 'utf8mb4_general_ci',
	`image` VARCHAR(700) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`username` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;

CREATE TABLE `users` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
	`password` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=7
;

3. Configurar en las líneas 12 - 18 del app.js el usuario y contraseña del mariaDB de tu pc.