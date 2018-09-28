-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Apr 02, 2017 at 08:16 PM
-- Server version: 5.5.42
-- PHP Version: 7.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- --------------------------------------------------------

--
-- Table structure for table `student_data`
--

CREATE TABLE `student_data` (
  `id` int(10) unsigned NOT NULL,
  `name` varchar(30) NOT NULL,
  `grade` tinyint(3) unsigned NOT NULL,
  `course_name` varchar(40) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student_data`
--

INSERT INTO `student_data` (`id`, `name`, `grade`, `course_name`) VALUES
(1, 'Miles', 90, 'Speedy Names'),
(2, 'Patrick', 99, 'Smug Smiles'),
(3, 'Donald', 85, 'Knowing Everything'),
(4, 'Joshua', 45, 'Selfishness'),
(5, 'Andres', 89, 'How to get 89'),
(6, 'Miranda', 92, 'Cats'),
(7, 'Ryan', 100, 'Asking Questions'),
(8, 'Brian', 75, 'Evil programming laughs');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `student_data`
--
ALTER TABLE `student_data`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `student_data`
--
ALTER TABLE `student_data`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;