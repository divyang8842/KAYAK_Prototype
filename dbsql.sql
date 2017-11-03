/*
SQLyog Community v12.4.3 (64 bit)
MySQL - 5.7.19-log : Database - kayak_18
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`kayak_18` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `kayak_18`;

/*Table structure for table `car` */

DROP TABLE IF EXISTS `car`;

CREATE TABLE `car` (
  `car_id` int(11) NOT NULL AUTO_INCREMENT,
  `car_type` varchar(30) NOT NULL,
  `car_color` varchar(30) DEFAULT NULL,
  `car_model` varchar(30) DEFAULT NULL,
  `year` varchar(30) DEFAULT NULL,
  `car_rent` decimal(10,0) NOT NULL,
  `deleteflag` int(11) DEFAULT '0',
  PRIMARY KEY (`car_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `flight` */

DROP TABLE IF EXISTS `flight`;

CREATE TABLE `flight` (
  `flight_id` int(11) NOT NULL AUTO_INCREMENT,
  `airline_name` varchar(30) NOT NULL,
  `flight_origin` varchar(30) DEFAULT NULL,
  `flight_destination` varchar(30) NOT NULL,
  `flight_departure` time DEFAULT NULL,
  `flight_arrival` time DEFAULT NULL,
  `flight_duration` int(11) NOT NULL,
  `flight_ticketPrice` int(11) NOT NULL,
  `flight_class` varchar(30) DEFAULT NULL,
  `route_id` int(11) DEFAULT NULL,
  `deleteflag` int(11) DEFAULT '0',
  PRIMARY KEY (`flight_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `hotel` */

DROP TABLE IF EXISTS `hotel`;

CREATE TABLE `hotel` (
  `hotel_id` int(11) NOT NULL AUTO_INCREMENT,
  `hotel_name` varchar(50) NOT NULL,
  `hotel_address` varchar(50) DEFAULT NULL,
  `hotel_city` varchar(50) NOT NULL,
  `hotel_state` varchar(50) DEFAULT NULL,
  `hotel_zipcode` varchar(10) NOT NULL,
  `hotel_description` varchar(80) DEFAULT NULL,
  `hotel_ameneties` varchar(40) NOT NULL,
  `deleteflag` int(11) DEFAULT '0',
  PRIMARY KEY (`hotel_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `payment` */

DROP TABLE IF EXISTS `payment`;

CREATE TABLE `payment` (
  `payment_id` int(10) NOT NULL AUTO_INCREMENT,
  `receipt_id` int(10) NOT NULL,
  `payment_amount` decimal(10,2) NOT NULL,
  `deleteflag` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`payment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `receipt` */

DROP TABLE IF EXISTS `receipt`;

CREATE TABLE `receipt` (
  `receipt_id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(15) NOT NULL,
  `payment_amount` decimal(10,2) NOT NULL,
  `booking_id` int(10) NOT NULL,
  `booking_type` int(1) NOT NULL COMMENT '1=Hotel,2=Flight,3=Car',
  `number_of_days` int(10) NOT NULL,
  `deleteflag` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`receipt_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `room` */

DROP TABLE IF EXISTS `room`;

CREATE TABLE `room` (
  `room_id` int(11) NOT NULL AUTO_INCREMENT,
  `room_type` varchar(30) DEFAULT NULL,
  `room_size` varchar(30) NOT NULL,
  `guestAllowed` int(11) NOT NULL,
  `room_price` int(11) NOT NULL,
  `deleteflag` int(11) DEFAULT '0',
  PRIMARY KEY (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `address` varchar(100) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `state` varchar(20) DEFAULT NULL,
  `zip_code` varchar(15) NOT NULL,
  `phoneno` int(10) NOT NULL,
  `emailid` varchar(50) NOT NULL,
  `profile_img_path` varchar(200) DEFAULT NULL,
  `credit_card` int(16) DEFAULT NULL,
  `deleteflag` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
