-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 28, 2020 at 01:41 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vidyalay`
--
CREATE DATABASE IF NOT EXISTS `vidyalay` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vidyalay`;

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` varchar(6) NOT NULL,
  `name` varchar(100) NOT NULL,
  `professor` varchar(30) NOT NULL,
  `skills` longtext NOT NULL,
  `about` longtext NOT NULL,
  `type` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `name`, `professor`, `skills`, `about`, `type`) VALUES
('1', 'xyz', '2', 'xyz', 'xyz', 'Engineering');

-- --------------------------------------------------------

--
-- Table structure for table `professors`
--

CREATE TABLE `professors` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `mailid` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `gender` varchar(7) NOT NULL,
  `mobile` varchar(10) NOT NULL,
  `type` varchar(30) NOT NULL,
  `organization` varchar(30) NOT NULL,
  `al1` varchar(30) NOT NULL,
  `al2` varchar(30) NOT NULL,
  `city` varchar(30) NOT NULL,
  `state` varchar(30) NOT NULL,
  `zip` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `professors`
--

INSERT INTO `professors` (`id`, `name`, `mailid`, `password`, `gender`, `mobile`, `type`, `organization`, `al1`, `al2`, `city`, `state`, `zip`) VALUES
(2, 'naina', 'naina@gmail.com', 'naina', 'FEMALE', '1234567890', 'Engineering', 'undefined', 'xyz', 'xyz', 'xyz', 'xyz', '123456');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(5) NOT NULL,
  `name` varchar(50) NOT NULL,
  `mailid` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `mobile` varchar(10) NOT NULL,
  `qualification` varchar(50) NOT NULL,
  `organization` varchar(50) NOT NULL,
  `al1` varchar(100) NOT NULL,
  `al2` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `zip` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`, `mailid`, `password`, `gender`, `mobile`, `qualification`, `organization`, `al1`, `al2`, `city`, `state`, `zip`) VALUES
(1, 'athira', 'mailathira@gmail.com', 'athira', 'FEMALE', '1234567890', 'UNDERGRADUATE', 'undefined', 'xyz', 'xyz', 'xyz', 'xyz', '123456');

-- --------------------------------------------------------

--
-- Table structure for table `stud_cour`
--

CREATE TABLE `stud_cour` (
  `s_id` int(4) NOT NULL,
  `c_id` int(4) NOT NULL,
  `p_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stud_cour`
--

INSERT INTO `stud_cour` (`s_id`, `c_id`, `p_id`) VALUES
(1, 1, 2),
(1, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(50) NOT NULL,
  `password` varchar(11) NOT NULL,
  `id` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`, `id`) VALUES
('mailathira@gmail.com', 'athira', 1),
('naina@gmail.com', 'naina', 3),
('admin', 'admin', 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `professors`
--
ALTER TABLE `professors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `professors`
--
ALTER TABLE `professors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
