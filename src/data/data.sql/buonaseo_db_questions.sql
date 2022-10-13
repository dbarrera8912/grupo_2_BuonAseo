-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: buonaseo_db
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,'¿Cómo comprar en Buon Aseo?','/footer/comprar','Cómo comprar','2022-10-13 18:30:21',NULL,NULL),(2,'¿Cómo accedo a los precios?','','','2022-10-13 18:30:21',NULL,NULL),(3,'¿Hacen envios?¿Cúales son los dias de entrega?','/footer/puntos','acá.','2022-10-13 18:30:21',NULL,NULL),(4,'¿Cúal es el monto mínimo de compra?','','','2022-10-13 18:30:21',NULL,NULL),(5,'¿Cúales son los medios de pagos?','','','2022-10-13 18:30:21',NULL,NULL),(6,'¿Dónde puedo visitarlos?','https://maps.app.goo.gl/JZfumo4UQM1vkVWb7','Coronel Mendez 1908 Wilde - Buenos Aires','2022-10-13 18:30:21',NULL,NULL),(7,'¿Se puede fraccionar la mercadería?','','','2022-10-13 18:30:21',NULL,NULL),(8,'¿Cúanto demora la entrega una vez efectuada la compra?','','','2022-10-13 18:30:21',NULL,NULL),(9,'hola','','','2022-10-13 18:30:21',NULL,NULL),(10,'fecha','','','2022-10-13 18:30:21',NULL,NULL),(11,'asdad','','','2022-10-13 18:30:21',NULL,NULL);
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-13 15:55:56
