-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 03, 2025 at 09:18 PM
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
-- Database: `chart_hits`
--

-- --------------------------------------------------------

--
-- Table structure for table `artists`
--

CREATE TABLE `artists` (
  `ID` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `nationalityID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `charts`
--

CREATE TABLE `charts` (
  `ID` int(10) UNSIGNED NOT NULL,
  `year` year(4) NOT NULL,
  `songID` int(10) UNSIGNED NOT NULL,
  `week` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `genres`
--

CREATE TABLE `genres` (
  `ID` int(10) UNSIGNED NOT NULL,
  `genre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nationalities`
--

CREATE TABLE `nationalities` (
  `ID` int(10) UNSIGNED NOT NULL,
  `nationality` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `songs`
--

CREATE TABLE `songs` (
  `ID` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `releaseYear` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `songs`
--

INSERT INTO `songs` (`ID`, `title`, `releaseYear`) VALUES
(3, 'We Will Rock You', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `songs_artists`
--

CREATE TABLE `songs_artists` (
  `keyArtists` int(10) UNSIGNED NOT NULL,
  `songID` int(10) UNSIGNED NOT NULL,
  `artistID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `songs_genres`
--

CREATE TABLE `songs_genres` (
  `keyGenres` int(10) UNSIGNED NOT NULL,
  `songID` int(10) UNSIGNED NOT NULL,
  `genreID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `artists`
--
ALTER TABLE `artists`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `nationalityID` (`nationalityID`);

--
-- Indexes for table `charts`
--
ALTER TABLE `charts`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `songID` (`songID`);

--
-- Indexes for table `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `nationalities`
--
ALTER TABLE `nationalities`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `songs_artists`
--
ALTER TABLE `songs_artists`
  ADD PRIMARY KEY (`songID`,`artistID`),
  ADD KEY `songs_artists_ibfk_1` (`artistID`);

--
-- Indexes for table `songs_genres`
--
ALTER TABLE `songs_genres`
  ADD PRIMARY KEY (`songID`,`genreID`),
  ADD KEY `genreID` (`genreID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `artists`
--
ALTER TABLE `artists`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `charts`
--
ALTER TABLE `charts`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `genres`
--
ALTER TABLE `genres`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `nationalities`
--
ALTER TABLE `nationalities`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `songs`
--
ALTER TABLE `songs`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `artists`
--
ALTER TABLE `artists`
  ADD CONSTRAINT `artists_ibfk_1` FOREIGN KEY (`nationalityID`) REFERENCES `nationalities` (`ID`);

--
-- Constraints for table `charts`
--
ALTER TABLE `charts`
  ADD CONSTRAINT `charts_ibfk_1` FOREIGN KEY (`songID`) REFERENCES `songs` (`ID`);

--
-- Constraints for table `songs_artists`
--
ALTER TABLE `songs_artists`
  ADD CONSTRAINT `songs_artists_ibfk_1` FOREIGN KEY (`artistID`) REFERENCES `artists` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `songs_artists_ibfk_2` FOREIGN KEY (`songID`) REFERENCES `songs` (`ID`) ON DELETE CASCADE;

--
-- Constraints for table `songs_genres`
--
ALTER TABLE `songs_genres`
  ADD CONSTRAINT `songs_genres_ibfk_1` FOREIGN KEY (`genreID`) REFERENCES `genres` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `songs_genres_ibfk_2` FOREIGN KEY (`songID`) REFERENCES `songs` (`ID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
