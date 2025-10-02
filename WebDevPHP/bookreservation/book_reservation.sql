-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 02, 2025 at 02:18 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `book_reservation`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `isbn` varchar(13) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `edition` int(11) DEFAULT NULL,
  `year` year(4) DEFAULT NULL,
  `category_code` int(11) DEFAULT NULL,
  `reserved` char(1) DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`isbn`, `title`, `author`, `edition`, `year`, `category_code`, `reserved`) VALUES
('9781234567897', 'The Great Gatsby', 'F. Scott Fitzgerald', 1, '1925', 4, 'N'),
('9782345678901', 'A Brief History of Time', 'Stephen Hawking', 1, '1988', 2, 'N'),
('9783456789012', 'Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', 1, '2011', 5, 'N'),
('9784567890123', '1984', 'George Orwell', 1, '1949', 4, 'N'),
('9785678901234', 'The Pragmatic Programmer', 'Andy Hunt', 1, '1999', 2, 'N'),
('9786789012345', 'Blasting the Foundations of Atheism', 'Abul Feda', 1, '2005', 1, 'N'),
('9787890123456', 'Darwins Blackbox', 'Michael Behe', 1, '1996', 2, 'N'),
('9788901234567', 'Alchemy of Happiness', 'Imam Ghazali', 1, '0000', 3, 'N');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_code` int(11) NOT NULL,
  `category_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_code`, `category_name`) VALUES
(1, 'Religion'),
(2, 'Science'),
(3, 'Philosophy'),
(4, 'Fiction'),
(5, 'History');

-- --------------------------------------------------------

--
-- Table structure for table `reserved_books`
--

CREATE TABLE `reserved_books` (
  `username` varchar(50) DEFAULT NULL,
  `isbn` varchar(13) DEFAULT NULL,
  `book_name` varchar(255) DEFAULT NULL,
  `reservation_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reserved_books`
--

INSERT INTO `reserved_books` (`username`, `isbn`, `book_name`, `reservation_date`) VALUES
('siddashhad', '9786789012345', 'Blasting the Foundations of Atheism', '2024-12-06');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `phone` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`, `first_name`, `last_name`, `address`, `city`, `phone`) VALUES
('manahilsultan', 'manahil', 'manahil', 'bilal', 'b510 north karachi', 'Dublin', ''),
('mein', '123456', 'Muhammad Ashhad', 'Siddiqui', 'Apartment 1, Block A, Elmville', 'Dublin', ''),
('siddashhad', 'ashhad', 'Muhammad Ashhad', 'Siddiqui', 'Apartment 4, Block A, Elmville', 'Dublin', ''),
('siddashhad12', 'ashhad', 'Muhammad Ashhad', 'Siddiqui', 'Apartment 1, Block A, Elmville', 'Dublin', ''),
('zaydoon', 'zayd', 'zaydoon', 'zaydoon', 'aaa', 'sss', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`isbn`),
  ADD KEY `reserved_by` (`reserved`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_code`);

--
-- Indexes for table `reserved_books`
--
ALTER TABLE `reserved_books`
  ADD KEY `username` (`username`),
  ADD KEY `isbn` (`isbn`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_code` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reserved_books`
--
ALTER TABLE `reserved_books`
  ADD CONSTRAINT `reserved_books_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`),
  ADD CONSTRAINT `reserved_books_ibfk_2` FOREIGN KEY (`isbn`) REFERENCES `books` (`isbn`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
