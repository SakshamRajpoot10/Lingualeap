-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Updated for LinguaLeap deployment

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `elearning`
--
CREATE DATABASE IF NOT EXISTS `elearning`;
USE `elearning`;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `username_email` varchar(50) NOT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`username_email`, `password`) VALUES
('himanshisharma@gmail.com', '12345');

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
-- UPDATED: Added uname, email, language, meetinglink columns required by the API
--

CREATE TABLE IF NOT EXISTS `appointments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'pending',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Description` varchar(150) NOT NULL,
  `uname` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `language` varchar(100) DEFAULT NULL,
  `meetinglink` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Sample data for appointments
--

INSERT INTO `appointments` (`id`, `start`, `end`, `status`, `createdAt`, `updatedAt`, `Description`, `uname`, `email`, `language`) VALUES
(11, '2024-07-30 08:00:00', '2024-07-30 10:00:00', 'rejected', '2024-08-03 15:55:52', '2024-08-03 15:56:18', 'Learn conversational phrases', 'Himanhsi Sharma', 'himanshi@gmail.com', 'German'),
(12, '2024-07-29 06:30:00', '2024-07-29 07:30:00', 'accepted', '2024-08-03 16:09:02', '2024-08-03 16:15:46', 'Russian accent training', 'jaya', 'jaya@gmail.com', 'Russian'),
(13, '2024-08-01 07:30:00', '2024-08-01 08:30:00', 'rejected', '2024-08-03 16:12:49', '2024-08-03 16:15:49', 'Russian pronunciation', 'Mahima', 'Mahima@gmail.com', 'Russian'),
(14, '2024-08-05 00:00:00', '2024-08-05 01:00:00', 'rejected', '2024-08-05 07:15:41', '2024-08-05 07:40:05', 'Filipino accent study', 'me', 'me@gmail.com', 'English'),
(15, '2024-08-07 13:00:00', '2024-08-07 16:00:00', 'accepted', '2024-08-06 03:26:37', '2024-08-06 03:38:20', 'Japanese accent practice', 'lingo', 'lingo@gmail.com', 'Japanese');

-- --------------------------------------------------------

--
-- Table structure for table `languageinsert`
--

CREATE TABLE IF NOT EXISTS `languageinsert` (
  `languageid` varchar(100) NOT NULL,
  `languagename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `languageinsert` (`languageid`, `languagename`) VALUES
('1234560', 'Chinese'),
('1234561', 'French'),
('1234562', 'Russian'),
('1234563', 'Chinese');

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

CREATE TABLE IF NOT EXISTS `languages` (
  `lang_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `languages` (`lang_name`) VALUES
('French'),
('German'),
('Russian'),
('Japanese'),
('Korean'),
('Vietnamese'),
('Italian'),
('Chinese'),
('Arabic'),
('Farsi'),
('Hebrew'),
('Phillipians'),
('Urdu'),
('Sanskrit'),
('English'),
('American');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE IF NOT EXISTS `login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uname` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `login` (`id`, `uname`, `password`) VALUES
(1, 'lingualeap', '12345'),
(2, 'lingo', '54321');

-- --------------------------------------------------------

--
-- Table structure for table `materialfetch`
--

CREATE TABLE IF NOT EXISTS `materialfetch` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `image` varchar(20) NOT NULL,
  `chapter` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `materialfetch` (`id`, `image`, `chapter`) VALUES
(1, '/image/book.jpeg', 'Chapter 1'),
(2, '/image/book.jpeg', 'Chapter 2'),
(4, '/image/book.jpeg', 'Chapter 3'),
(5, '/image/book.jpeg', 'Chapter 4'),
(6, '/image/book.jpeg', 'Chapter 5'),
(7, '/image/book.jpeg', 'Chapter 6');

-- --------------------------------------------------------

--
-- Table structure for table `mylanguages`
--

CREATE TABLE IF NOT EXISTS `mylanguages` (
  `languageimage` varchar(200) NOT NULL,
  `languagename` varchar(100) NOT NULL,
  `teachername` varchar(100) NOT NULL,
  `experience` varchar(100) NOT NULL,
  `languageid` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`languageid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `mylanguages` (`languageimage`, `languagename`, `teachername`, `experience`, `languageid`) VALUES
('/image/german.jpeg', 'German', 'Himanshi Sharma', '5 Years', 20001),
('/image/image5.jpg', 'English', 'Jaya Saini', '5 Years', 20002),
('/image/image2.jpg', 'Korean', 'Mahima Singh', '5 Years', 20003),
('/image/image4.jpg', 'Japanese', 'Arpita ', '5 Years', 20004),
('/image/image11.jpg', 'CPP', 'Aditya Pratap Singh', '5 Years', 20005),
('/image/image6.jpg', 'Russian', 'Rashi Sharma', '5 Years', 20006),
('/image/image9.jpg', 'American', 'Saksham Rajpoot', '5 Years', 20007);

-- --------------------------------------------------------

--
-- Table structure for table `presentlearning`
--

CREATE TABLE IF NOT EXISTS `presentlearning` (
  `languagesimage` varchar(200) NOT NULL,
  `languagesname` varchar(100) NOT NULL,
  `teachersname` varchar(100) NOT NULL,
  `studentenroll` varchar(100) NOT NULL,
  `languageid` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`languageid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `presentlearning` (`languagesimage`, `languagesname`, `teachersname`, `studentenroll`, `languageid`) VALUES
('/image/image6.jpg', 'Nepal', 'Kanika Verma', '4K', 20001),
('/image/german.jpeg', 'German', 'Himanshi Sharma', '2K', 20007);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE IF NOT EXISTS `reviews` (
  `reviewss` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `reviews` (`reviewss`) VALUES
('good learning');

-- --------------------------------------------------------

--
-- Table structure for table `signup`
--

CREATE TABLE IF NOT EXISTS `signup` (
  `uname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `confirm_password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `studentenrooll`
--

CREATE TABLE IF NOT EXISTS `studentenrooll` (
  `Name` varchar(100) NOT NULL,
  `Language_Opted` varchar(100) NOT NULL,
  `imageURL` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `studentenrooll` (`Name`, `Language_Opted`, `imageURL`) VALUES
('Vishal', 'Languages-Hinglish, English', '/image/MaleStudent.png'),
('Vihan', 'Languages- English', '/image/MaleStudent.png'),
('Vihan Garg', 'Languages- English', '/image/MaleStudent.png'),
('Arohi', 'Languages- English', '/image/Student.webp');

-- --------------------------------------------------------

--
-- Table structure for table `studentlogin`
--

CREATE TABLE IF NOT EXISTS `studentlogin` (
  `uname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `studentlogin` (`uname`, `email`, `password`) VALUES
('Himanhsi Sharma', 'himanshi@gmail.com', '12345'),
('jaya', 'jaya@gmail.com', '12345'),
('Mahima', 'Mahima@gmail.com', '12345'),
('lingo', 'lingo@gmail.com', '12345'),
('demo', 'demo@gmail.com', 'demo');

-- --------------------------------------------------------

--
-- Table structure for table `studentprofile`
--

CREATE TABLE IF NOT EXISTS `studentprofile` (
  `studentid` int(11) NOT NULL AUTO_INCREMENT,
  `uname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobileno` varchar(100) NOT NULL DEFAULT '',
  `batch` varchar(100) NOT NULL DEFAULT '',
  `location` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`studentid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `studentprofile` (`studentid`, `uname`, `email`) VALUES
(1, 'Himanhsi Sharma', 'himanshi@gmail.com'),
(2, 'jaya', 'jaya@gmail.com'),
(3, 'lingo', 'lingo@gmail.com'),
(4, 'demo', 'demo@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `studentsignup`
--

CREATE TABLE IF NOT EXISTS `studentsignup` (
  `uname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `confirm_password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `table1`
--

CREATE TABLE IF NOT EXISTS `table1` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `table1` (`id`, `username`, `password`) VALUES
(1, 'Himanshi', '12345');

-- --------------------------------------------------------

--
-- Table structure for table `teacherenroll`
--

CREATE TABLE IF NOT EXISTS `teacherenroll` (
  `Name` varchar(100) NOT NULL,
  `Language_Proficiency` varchar(100) NOT NULL,
  `imageURL` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `teacherenroll` (`Name`, `Language_Proficiency`, `imageURL`) VALUES
('Gaurav Malhotra', 'English , French', '/image/Teacher.webp'),
('Vinod Kumar', 'Vietnamese , Japanese', '/image/Teacher.webp'),
('Meenakshi Singh', 'Arabic , Urdu', '/image/Female.png'),
('Teena Oberoi', 'Hebrew ,German', '/image/Teacher.webp'),
('Steivie   ', 'English , Farsi', '/image/Teacher.webp'),
('Archana Sengar', 'Chinese , Korean', '/image/Female.png');

-- --------------------------------------------------------

--
-- Table structure for table `teacherlogin`
--

CREATE TABLE IF NOT EXISTS `teacherlogin` (
  `uname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `teacherlogin` (`uname`, `email`, `password`) VALUES
('lingualeap', 'lingua@gmail.com', '12345'),
('Gaurav Sir', 'Gauravsir@gmail.com', '12345'),
('demo', 'demo@gmail.com', 'demo');

-- --------------------------------------------------------

--
-- Table structure for table `teacherprofile`
--

CREATE TABLE IF NOT EXISTS `teacherprofile` (
  `teacherid` int(11) NOT NULL AUTO_INCREMENT,
  `uname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobileno` varchar(100) NOT NULL DEFAULT '',
  `batch` varchar(100) NOT NULL DEFAULT '',
  `languages` varchar(100) NOT NULL DEFAULT '',
  `certification` varchar(100) NOT NULL DEFAULT '',
  `location` varchar(200) NOT NULL DEFAULT '',
  PRIMARY KEY (`teacherid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `teacherprofile` (`teacherid`, `uname`, `email`) VALUES
(1, 'lingualeap', 'lingua@gmail.com'),
(2, 'Gaurav Sir', 'Gauravsir@gmail.com'),
(3, 'demo', 'demo@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `teachersignup`
--

CREATE TABLE IF NOT EXISTS `teachersignup` (
  `uname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `confirm_password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `testing1`
--

CREATE TABLE IF NOT EXISTS `testing1` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `testing1` (`id`, `Name`) VALUES
(1, 'FRENCH'),
(2, 'GERMAN'),
(3, 'RUSSIAN'),
(4, 'JAPANESE'),
(5, 'KOREAN');

-- --------------------------------------------------------

--
-- Table structure for table `testlanguage`
--

CREATE TABLE IF NOT EXISTS `testlanguage` (
  `languageId` int(11) NOT NULL AUTO_INCREMENT,
  `languages` varchar(100) NOT NULL,
  `imageURL` varchar(200) NOT NULL,
  PRIMARY KEY (`languageId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `testlanguage` (`languageId`, `languages`, `imageURL`) VALUES
(1, 'German', '/image/german.jpeg'),
(2, 'Russian', '/image/image3.jpg'),
(3, 'English', '/image/image5.jpg'),
(4, 'Korean', '/image/korea.webp'),
(5, 'French', '/image/french.png'),
(6, 'Japanese', '/image/japanese.png');

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
