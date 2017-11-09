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
  `car_id` INT(11) NOT NULL AUTO_INCREMENT,
  `car_type` VARCHAR(30) NOT NULL,
  `car_color` VARCHAR(30) DEFAULT NULL,
  `car_model` VARCHAR(30) DEFAULT NULL,
  `year` VARCHAR(30) DEFAULT NULL,
  `car_rent` DECIMAL(10,0) NOT NULL,
  `deleteflag` INT(11) DEFAULT '0',
  PRIMARY KEY (`car_id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

/*Table structure for table `flight` */

DROP TABLE IF EXISTS `flight`;

CREATE TABLE `flight` (
  `flight_id` INT(11) NOT NULL AUTO_INCREMENT,
  `airline_name` VARCHAR(30) NOT NULL,
  `flight_origin` VARCHAR(30) DEFAULT NULL,
  `flight_destination` VARCHAR(30) NOT NULL,
  `flight_departure` TIME DEFAULT NULL,
  `flight_arrival` TIME DEFAULT NULL,
  `flight_duration` INT(11) NOT NULL,
  `flight_ticketPrice` INT(11) NOT NULL,
  `flight_class` VARCHAR(30) DEFAULT NULL,
  `route_id` INT(11) DEFAULT NULL,
  `deleteflag` INT(11) DEFAULT '0',
  PRIMARY KEY (`flight_id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

/*Table structure for table `hotel` */

DROP TABLE IF EXISTS `hotel`;

CREATE TABLE `hotel` (
  `hotel_id` INT(11) NOT NULL AUTO_INCREMENT,
  `hotel_name` VARCHAR(50) NOT NULL,
  `hotel_address` VARCHAR(50) DEFAULT NULL,
  `hotel_city` VARCHAR(50) NOT NULL,
  `hotel_state` VARCHAR(50) DEFAULT NULL,
  `hotel_zipcode` VARCHAR(10) NOT NULL,
  `hotel_description` VARCHAR(80) DEFAULT NULL,
  `hotel_ameneties` VARCHAR(40) NOT NULL,
  `deleteflag` INT(11) DEFAULT '0',
  PRIMARY KEY (`hotel_id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

/*Table structure for table `payment` */

DROP TABLE IF EXISTS `payment`;

CREATE TABLE `payment` (
  `payment_id` INT(10) NOT NULL AUTO_INCREMENT,
  `receipt_id` INT(10) NOT NULL,
  `payment_amount` DECIMAL(10,2) NOT NULL,
  `deleteflag` TINYINT(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`payment_id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

/*Table structure for table `receipt` */

DROP TABLE IF EXISTS `receipt`;

CREATE TABLE `receipt` (
  `receipt_id` INT(10) NOT NULL AUTO_INCREMENT,
  `user_id` INT(15) NOT NULL,
  `payment_amount` DECIMAL(10,2) NOT NULL,
  `booking_id` INT(10) NOT NULL,
  `booking_type` INT(1) NOT NULL COMMENT '1=Hotel,2=Flight,3=Car',
  `number_of_days` INT(10) NOT NULL,
  `deleteflag` TINYINT(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`receipt_id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

/*Table structure for table `room` */

DROP TABLE IF EXISTS `room`;

CREATE TABLE `room` (
  `room_id` INT(11) NOT NULL AUTO_INCREMENT,
  `room_type` VARCHAR(30) DEFAULT NULL,
  `room_size` VARCHAR(30) NOT NULL,
  `guestAllowed` INT(11) NOT NULL,
  `room_price` INT(11) NOT NULL,
  `deleteflag` INT(11) DEFAULT '0',
  PRIMARY KEY (`room_id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT,
  `fname` VARCHAR(50) NOT NULL,
  `lname` VARCHAR(50) NOT NULL,
  `address` VARCHAR(100) DEFAULT NULL,
  `city` VARCHAR(20) DEFAULT NULL,
  `state` VARCHAR(20) DEFAULT NULL,
  `zip_code` VARCHAR(15) NOT NULL,
  `phoneno` INT(10) NOT NULL,
  `emailid` VARCHAR(50) NOT NULL,
  `profile_img_path` VARCHAR(200) DEFAULT NULL,
  `credit_card` INT(16) DEFAULT NULL,
  `deleteflag` TINYINT(1) DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

/* Altered user table to add password column*/
ALTER TABLE `kayak_18`.`user` 
ADD COLUMN `password` VARCHAR(100) NOT NULL AFTER `deleteflag`;

/* DROP Flights Tables*/

DROP TABLE flight; 

CREATE TABLE `flight` (
  `flight_id` INT(11) NOT NULL AUTO_INCREMENT,
  `airline_name` VARCHAR(30) NOT NULL,
  `stops` VARCHAR(100),
  `deleteflag` INT(11) DEFAULT '0',
  PRIMARY KEY (`flight_id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

  
  CREATE TABLE `flight_mapping` (
  `flight_id` INT(11),
  `airline_name` VARCHAR(30) NOT NULL,
  `station_name` VARCHAR(30) DEFAULT NULL,
  `flight_departure` TIME DEFAULT NULL,
  `flight_arrival` TIME DEFAULT NULL,
  `flight_duration` INT(11) NOT NULL,
  `economy_class` VARCHAR(30) DEFAULT NULL,
  `first_class` VARCHAR(30) DEFAULT NULL,
  `business_class` VARCHAR(30) DEFAULT NULL,
  `premiumeconomy_class` VARCHAR(30) DEFAULT NULL,
  `deleteflag` INT(11) DEFAULT '0'
  
) ENGINE=INNODB DEFAULT CHARSET=utf8;

