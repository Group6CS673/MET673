-- MySQL dump 10.13  Distrib 5.6.24, for Win64 (x86_64)
--
-- Host: localhost    Database: djangostack
-- ------------------------------------------------------
-- Server version	5.5.45

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
-- Table structure for table `caloriecounter`
--

DROP TABLE IF EXISTS `caloriecounter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `caloriecounter` (
  `eventID` int(11) NOT NULL AUTO_INCREMENT,
  `userID` varchar(45) DEFAULT NULL,
  `mealStart` datetime DEFAULT NULL,
  `calorieCount` double DEFAULT NULL,
  PRIMARY KEY (`eventID`),
  FOREIGN KEY (`userID`) REFERENCES `useraccounts`(`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `caloriecounter`
--

LOCK TABLES `caloriecounter` WRITE;
/*!40000 ALTER TABLE `caloriecounter` DISABLE KEYS */;
/*!40000 ALTER TABLE `caloriecounter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `heartratemonitor`
--

DROP TABLE IF EXISTS `heartratemonitor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `heartratemonitor` (
  `heartRateEventID` int(11) NOT NULL AUTO_INCREMENT,
  `userID` varchar(45) DEFAULT NULL,
  `excerciseStartTime` datetime DEFAULT NULL,
  `excerciseEndTime` datetime DEFAULT NULL,
  `heartRateAverage` double DEFAULT NULL,
  PRIMARY KEY (`heartRateEventID`),
  FOREIGN KEY (`userID`) REFERENCES `useraccounts`(`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `heartratemonitor`
--

LOCK TABLES `heartratemonitor` WRITE;
/*!40000 ALTER TABLE `heartratemonitor` DISABLE KEYS */;
/*!40000 ALTER TABLE `heartratemonitor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sleepcounter`
--

DROP TABLE IF EXISTS `sleepcounter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sleepcounter` (
  `sleepcounterID` int(11) NOT NULL AUTO_INCREMENT,
  `userID` varchar(45) DEFAULT NULL,
  `sleepStartDate` datetime DEFAULT NULL,
  `sleepEndDate` datetime DEFAULT NULL,
  PRIMARY KEY (`sleepcounterID`),
  FOREIGN KEY (`userID`) REFERENCES `useraccounts`(`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sleepcounter`
--

LOCK TABLES `sleepcounter` WRITE;
/*!40000 ALTER TABLE `sleepcounter` DISABLE KEYS */;
/*!40000 ALTER TABLE `sleepcounter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stepcounter`
--

DROP TABLE IF EXISTS `stepcounter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stepcounter` (
  `entryID` int(11) NOT NULL AUTO_INCREMENT,
  `userID` varchar(45) DEFAULT NULL,
  `excerciseStartDate` datetime DEFAULT NULL,
  `excerciseEndDate` datetime DEFAULT NULL,
  `stepCount` int(11) DEFAULT NULL,
  PRIMARY KEY (`entryID`),
  FOREIGN KEY (`userID`) REFERENCES `useraccounts`(`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stepcounter`
--

LOCK TABLES `stepcounter` WRITE;
/*!40000 ALTER TABLE `stepcounter` DISABLE KEYS */;
/*!40000 ALTER TABLE `stepcounter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `useraccounts`
--

DROP TABLE IF EXISTS `useraccounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `useraccounts` (
  `userID` varchar(50) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  `emailAddress` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `useraccounts`
--

LOCK TABLES `useraccounts` WRITE;
/*!40000 ALTER TABLE `useraccounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `useraccounts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-10-18 22:57:12
