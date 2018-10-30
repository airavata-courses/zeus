-- MySQL dump 10.13  Distrib 5.7.24, for osx10.14 (x86_64)
--
-- Host: localhost    Database: zeus_flask
-- ------------------------------------------------------
-- Server version	5.7.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `userpreferencestable`
--
CREATE USER IF NOT EXISTS 'aravind'@'localhost' IDENTIFIED WITH mysql_native_password BY 'aravind';
GRANT ALL ON *.* TO 'aravind'@'localhost';

DROP DATABASE IF EXISTS `zeus_flask`;
CREATE DATABASE IF NOT EXISTS `zeus_flask`;
USE `zeus_flask`;

DROP TABLE IF EXISTS `userpreferencestable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userpreferencestable` (
  `USERPREFERENCESTBID` int(11) NOT NULL AUTO_INCREMENT,
  `USERTBID` int(11) DEFAULT NULL,
  `CATEGORY` varchar(45) DEFAULT NULL,
  `COUNT` int(11) DEFAULT NULL,
  PRIMARY KEY (`USERPREFERENCESTBID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userpreferencestable`
--

LOCK TABLES `userpreferencestable` WRITE;
/*!40000 ALTER TABLE `userpreferencestable` DISABLE KEYS */;
/*!40000 ALTER TABLE `userpreferencestable` ENABLE KEYS */;
UNLOCK TABLES;



--
-- Table structure for table `videotable`
--

DROP TABLE IF EXISTS `videotable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `videotable` (
  `VIDEOTBID` int(11) NOT NULL,
  `VIDEONAME` varchar(45) DEFAULT NULL,
  `VIDEODESC` varchar(100) DEFAULT NULL,
  `VIDEOLINK` varchar(500) DEFAULT NULL,
  `UPLOADEDBY` int(11) DEFAULT NULL,
  `VIEWS` int(11) DEFAULT NULL,
  `THUMBNAIL` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`VIDEOTBID`),
  KEY `UPL_idx` (`UPLOADEDBY`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videotable`
--

LOCK TABLES `videotable` WRITE;
/*!40000 ALTER TABLE `videotable` DISABLE KEYS */;
INSERT INTO `videotable` VALUES (1,'dailyroutines','dailyroutines of people','https://www.youtube.com/embed/Xb02qGHngb0',1,1000,'http://womcdn.s3.amazonaws.com/common/15101405345002-232023931.jpg?h330-w330'),(2,'TedX','How cancer cells communicate','https://www.youtube.com/embed/762c6pFpoqg',1,2000,'https://cdn.slidesharecdn.com/ss_thumbnails/howtotedx-110312020226-phpapp01-thumbnail-4.jpg?cb=1365429305'),(3,'SharkTank','Shark Tank Kevin oLeary gets into an argument!','https://www.youtube.com/embed/Kgk7mjnRx-4',2,3000,'https://m.media-amazon.com/images/M/MV5BODY3MzA4ZmItZjJkNC00Nzc1LWI4ODUtZjQ5YjE1MjJlMDIzXkEyXkFqcGdeQXVyNjg2MzA5MTg@._V1_.jpg'),(4,'EllenShow','Ellen Couldn’t Believe This Amazon Service Is Real','https://www.youtube.com/embed/07kkUVphTFg',3,4000,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQChbaC2ghkNEaq3Jy3XPM5ZNjahg5m6q4T_l0aajGBiYwB--Fiow'),(5,'Big Wave Surfing Compilation 2017','Big Wave Surfing Compilation 2017 ** REVISED **AMAZING FOOTAGE ','https://www.youtube.com/embed/rj7xMBxd5iY',2,5000,'https://i.ytimg.com/vi/rj7xMBxd5iY/default.jpg'),(6,'GoPro Surf: Inside the Barrels of Namibia','The term we scored waves in the surfing world gets thrown around','https://www.youtube.com/embed/pn7SFWpXURk',3,4000,'https://i.ytimg.com/vi/pn7SFWpXURk/default.jpg'),(8,'Surfing Big Wedge RawFootage','RAW FOOTAGE August 17 This was such an epic day of shooting!','https://www.youtube.com/embed/WauvB0aQq-s',1,6000,'https://i.ytimg.com/vi/WauvB0aQq-s/default.jpg'),(9,'Surfing POV | September 8th | 2018 (RAW)','ome decent south swell at play, tide rising with a semi tricky reform','https://www.youtube.com/embed/p291smnaDhI',2,5000,'https://i.ytimg.com/vi/3jwJUDC-Llg/default.jpg'),(10,'How to escape educations death valley','Sir Ken Robinson outlines 3 principles crucial for the human','https://www.ted.com/talks/ken_robinson_how_to_escape_education_s_death_valley',3,3000,'https://i.ytimg.com/vi/wX78iKhInsc/default.jpg'),(11,'Fun.: We Are Young ft. Janelle Monáe','Funs music video for We Are Young featuring Janelle Monáe from the album','https://www.youtube.com/embed/Sv6dMFF_yts',3,3000,'https://i.ytimg.com/vi/Sv6dMFF_yts/default.jpg');
/*!40000 ALTER TABLE `videotable` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-28 21:01:08
-- MySQL dump 10.13  Distrib 5.7.24, for osx10.14 (x86_64)
--
-- Host: localhost    Database: zeus_node
-- ------------------------------------------------------
-- Server version	5.7.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP DATABASE IF EXISTS `zeus_spring`;
CREATE DATABASE IF NOT EXISTS `zeus_spring`;
USE `zeus_spring`;
--
-- Table structure for table `videotable`
--

DROP TABLE IF EXISTS `videotable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `videotable` (
  `VIDEOTBID` int(11) NOT NULL,
  `VIDEONAME` varchar(45) DEFAULT NULL,
  `VIDEODESC` varchar(100) DEFAULT NULL,
  `VIDEOLINK` varchar(500) DEFAULT NULL,
  `UPLOADEDBY` int(11) DEFAULT NULL,
  `VIEWS` int(11) DEFAULT NULL,
  `THUMBNAIL` varchar(500) DEFAULT NULL,
  `CATEGORY` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`VIDEOTBID`),
  KEY `UPL_idx` (`UPLOADEDBY`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videotable`
--

LOCK TABLES `videotable` WRITE;
/*!40000 ALTER TABLE `videotable` DISABLE KEYS */;
INSERT INTO `videotable` VALUES (1,'dailyroutines','dailyroutines of people','https://www.youtube.com/embed/Xb02qGHngb0',1,1000,'http://womcdn.s3.amazonaws.com/common/15101405345002-232023931.jpg?h330-w330','FUN'),(2,'TedX','How cancer cells communicate','https://www.youtube.com/embed/762c6pFpoqg',1,2000,'https://cdn.slidesharecdn.com/ss_thumbnails/howtotedx-110312020226-phpapp01-thumbnail-4.jpg?cb=1365429305','FUN'),(3,'SharkTank','Shark Tank Kevin oLeary gets into an argument!','https://www.youtube.com/embed/Kgk7mjnRx-4',2,3000,'https://m.media-amazon.com/images/M/MV5BODY3MzA4ZmItZjJkNC00Nzc1LWI4ODUtZjQ5YjE1MjJlMDIzXkEyXkFqcGdeQXVyNjg2MzA5MTg@._V1_.jpg','FUN'),(4,'EllenShow','Ellen Couldn’t Believe This Amazon Service Is Real','https://www.youtube.com/embed/07kkUVphTFg',3,4000,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQChbaC2ghkNEaq3Jy3XPM5ZNjahg5m6q4T_l0aajGBiYwB--Fiow','FUN'),(5,'Big Wave Surfing Compilation 2017','Big Wave Surfing Compilation 2017 ** REVISED **AMAZING FOOTAGE ','https://www.youtube.com/embed/rj7xMBxd5iY',2,5000,'https://i.ytimg.com/vi/rj7xMBxd5iY/default.jpg','SCIENCE'),(6,'GoPro Surf: Inside the Barrels of Namibia','The term we scored waves in the surfing world gets thrown around','https://www.youtube.com/embed/pn7SFWpXURk',3,4000,'https://i.ytimg.com/vi/pn7SFWpXURk/default.jpg','SCIENCE'),(8,'Surfing Big Wedge RawFootage','RAW FOOTAGE August 17 This was such an epic day of shooting!','https://www.youtube.com/embed/WauvB0aQq-s',1,6000,'https://i.ytimg.com/vi/WauvB0aQq-s/default.jpg','SCIENCE'),(9,'Surfing POV | September 8th | 2018 (RAW)','ome decent south swell at play, tide rising with a semi tricky reform','https://www.youtube.com/embed/p291smnaDhI',2,5000,'https://i.ytimg.com/vi/3jwJUDC-Llg/default.jpg','SCIENCE'),(10,'How to escape educations death valley','Sir Ken Robinson outlines 3 principles crucial for the human','https://www.ted.com/talks/ken_robinson_how_to_escape_education_s_death_valley',3,3000,'https://i.ytimg.com/vi/wX78iKhInsc/default.jpg','TECHNOLOGY'),(11,'Fun.: We Are Young ft. Janelle Monáe','Funs music video for We Are Young featuring Janelle Monáe from the album','https://www.youtube.com/embed/Sv6dMFF_yts',3,3000,'https://i.ytimg.com/vi/Sv6dMFF_yts/default.jpg','TECHNOLOGY');
/*!40000 ALTER TABLE `videotable` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-28 21:01:08
-- MySQL dump 10.13  Distrib 5.7.24, for osx10.14 (x86_64)
--
-- Host: localhost    Database: zeus_spring
-- ------------------------------------------------------
-- Server version	5.7.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP DATABASE IF EXISTS `zeus_node`;
CREATE DATABASE IF NOT EXISTS `zeus_node`;
USE `zeus_node`;

--
-- Table structure for table `usertable`
--

DROP TABLE IF EXISTS `usertable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usertable` (
  `USERTBID` int(11) NOT NULL AUTO_INCREMENT,
  `EMAIL` varchar(45) DEFAULT NULL,
  `PASSWORD` varchar(45) DEFAULT NULL,
  `PHONENO` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`USERTBID`),
  UNIQUE KEY `EMAIL_UNIQUE` (`EMAIL`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usertable`
--

LOCK TABLES `usertable` WRITE;
/*!40000 ALTER TABLE `usertable` DISABLE KEYS */;
INSERT INTO `usertable` VALUES (1,'haritha.cbit2010@gmail.com','test1','8129449014'),(2,'abharath@gmail.com','test2','3126084376'),(3,'shivteja@gmail.com','test3','6502509331'),(5,'hadama@iu.edu','test','8129559014'),(6,'aravind@gmail.com','test','8129559014'),(8,'test@gmail.com','test','8129559014'),(9,'abc@gmail.com','test','8129559014'),(10,'abc1@gmail.com','sds','8129559014'),(11,'priya@gmail.com','test','8129559014');
/*!40000 ALTER TABLE `usertable` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-28 21:01:08
