/*
SQLyog Community v12.4.3 (64 bit)
MySQL - 5.7.19-log : Database - cmpe273
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`cmpe273` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `cmpe273`;

/*Table structure for table `directories` */

DROP TABLE IF EXISTS `directories`;

CREATE TABLE `directories` (
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `relative_path` varchar(500) NOT NULL,
  `parent` int(30) NOT NULL DEFAULT '1',
  `createdby` int(15) NOT NULL,
  `createdon` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isfile` tinyint(1) NOT NULL DEFAULT '0',
  `deleteflag` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2489 DEFAULT CHARSET=utf8;

/*Table structure for table `directory_logging` */

DROP TABLE IF EXISTS `directory_logging`;

CREATE TABLE `directory_logging` (
  `id` int(35) NOT NULL AUTO_INCREMENT,
  `directoryid` int(35) NOT NULL,
  `operation` tinyint(1) NOT NULL DEFAULT '0',
  `datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userid` int(15) NOT NULL,
  `deleteflag` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2498 DEFAULT CHARSET=utf8;

/*Table structure for table `directory_permission` */

DROP TABLE IF EXISTS `directory_permission`;

CREATE TABLE `directory_permission` (
  `id` int(35) NOT NULL AUTO_INCREMENT,
  `directoryid` int(30) NOT NULL,
  `permissiontype` tinyint(1) NOT NULL COMMENT '0 for User, 1 for usergroup',
  `permit_id` int(15) NOT NULL,
  `deleteflag` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `stareddir` */

DROP TABLE IF EXISTS `stareddir`;

CREATE TABLE `stareddir` (
  `id` int(25) NOT NULL AUTO_INCREMENT,
  `userid` int(15) NOT NULL,
  `directoryid` int(35) NOT NULL,
  `deleteflag` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `user_group_mapping` */

DROP TABLE IF EXISTS `user_group_mapping`;

CREATE TABLE `user_group_mapping` (
  `id` int(25) NOT NULL AUTO_INCREMENT,
  `groupid` int(15) NOT NULL,
  `userid` int(15) NOT NULL,
  `lastupdated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleteflag` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `usergroups` */

DROP TABLE IF EXISTS `usergroups`;

CREATE TABLE `usergroups` (
  `id` int(15) NOT NULL AUTO_INCREMENT,
  `groupname` varchar(50) NOT NULL,
  `createdby` int(15) NOT NULL,
  `createdon` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deletedby` int(15) NOT NULL DEFAULT '0',
  `deleteflag` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `uid` int(13) NOT NULL AUTO_INCREMENT,
  `ulname` varchar(13) NOT NULL,
  `ufname` varchar(13) NOT NULL,
  `emailid` varchar(50) NOT NULL,
  `gender` tinyint(1) DEFAULT '2',
  `dob` date DEFAULT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `deleteflag` tinyint(1) NOT NULL DEFAULT '0',
  `homedirectory` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uid` (`ulname`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
