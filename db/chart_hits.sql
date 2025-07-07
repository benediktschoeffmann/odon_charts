-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 07. Jul 2025 um 11:51
-- Server-Version: 10.4.32-MariaDB
-- PHP-Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `chart_hits`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `artists`
--

CREATE TABLE `artists` (
  `ID` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `nationalityID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `artists`
--

INSERT INTO `artists` (`ID`, `name`, `nationalityID`) VALUES
(3, 'Freddie Mercury', 3),
(4, 'Falco', 2),
(9, 'Hannes Wirth', 2),
(10, 'Walther Soyka', 2),
(11, 'Ernst Molden', 2),
(12, 'Willi Resetarits', 2);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `charts`
--

CREATE TABLE `charts` (
  `ID` int(10) UNSIGNED NOT NULL,
  `year` year(4) NOT NULL,
  `songID` int(10) UNSIGNED NOT NULL,
  `week` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `genres`
--

CREATE TABLE `genres` (
  `ID` int(10) UNSIGNED NOT NULL,
  `description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `genres`
--

INSERT INTO `genres` (`ID`, `description`) VALUES
(1, 'Blues'),
(2, 'Country'),
(3, 'Easy listening'),
(4, 'Electronic'),
(5, 'Folk'),
(6, 'Hip hop'),
(7, 'R&B & soul'),
(8, 'Rock'),
(9, 'Metal'),
(10, 'Punk'),
(11, 'Jazz'),
(12, 'Pop');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `nationalities`
--

CREATE TABLE `nationalities` (
  `ID` int(10) UNSIGNED NOT NULL,
  `description` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `nationalities`
--

INSERT INTO `nationalities` (`ID`, `description`) VALUES
(1, 'US'),
(2, 'AT'),
(3, 'GB'),
(5, 'DE'),
(6, 'JP');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `songs`
--

CREATE TABLE `songs` (
  `ID` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `releaseYear` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `songs`
--

INSERT INTO `songs` (`ID`, `title`, `releaseYear`) VALUES
(3, 'We Will Rock you', '1970-01-22'),
(4, 'Der Kommissar', '1982-10-27'),
(5, 'Rock Me Amadeus', '1985-04-25'),
(6, 'Awarakadawara', '2017-04-19');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `songs_artists`
--

CREATE TABLE `songs_artists` (
  `keySongsArtists` int(10) UNSIGNED NOT NULL,
  `songID` int(10) UNSIGNED NOT NULL,
  `artistID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `songs_artists`
--

INSERT INTO `songs_artists` (`keySongsArtists`, `songID`, `artistID`) VALUES
(1, 3, 3),
(2, 4, 4),
(3, 5, 4),
(4, 6, 9),
(5, 6, 10),
(6, 6, 11),
(7, 6, 12);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `songs_genres`
--

CREATE TABLE `songs_genres` (
  `keyGenres` int(10) UNSIGNED NOT NULL,
  `songID` int(10) UNSIGNED NOT NULL,
  `genreID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `songs_genres`
--

INSERT INTO `songs_genres` (`keyGenres`, `songID`, `genreID`) VALUES
(1, 5, 8),
(2, 5, 12),
(3, 4, 12),
(4, 4, 4),
(5, 6, 2),
(6, 6, 12);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `artists`
--
ALTER TABLE `artists`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `nationalityID` (`nationalityID`);

--
-- Indizes für die Tabelle `charts`
--
ALTER TABLE `charts`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `songID` (`songID`);

--
-- Indizes für die Tabelle `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `nationalities`
--
ALTER TABLE `nationalities`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `songs_artists`
--
ALTER TABLE `songs_artists`
  ADD PRIMARY KEY (`keySongsArtists`),
  ADD KEY `songs_artists_ibfk_2` (`songID`),
  ADD KEY `songs_artists_ibfk_1` (`artistID`);

--
-- Indizes für die Tabelle `songs_genres`
--
ALTER TABLE `songs_genres`
  ADD PRIMARY KEY (`keyGenres`),
  ADD KEY `genreID` (`genreID`),
  ADD KEY `songID` (`songID`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `artists`
--
ALTER TABLE `artists`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT für Tabelle `charts`
--
ALTER TABLE `charts`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `genres`
--
ALTER TABLE `genres`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT für Tabelle `nationalities`
--
ALTER TABLE `nationalities`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT für Tabelle `songs`
--
ALTER TABLE `songs`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `artists`
--
ALTER TABLE `artists`
  ADD CONSTRAINT `artists_ibfk_1` FOREIGN KEY (`nationalityID`) REFERENCES `nationalities` (`ID`);

--
-- Constraints der Tabelle `charts`
--
ALTER TABLE `charts`
  ADD CONSTRAINT `charts_ibfk_1` FOREIGN KEY (`songID`) REFERENCES `songs` (`ID`);

--
-- Constraints der Tabelle `songs_artists`
--
ALTER TABLE `songs_artists`
  ADD CONSTRAINT `songs_artists_ibfk_1` FOREIGN KEY (`artistID`) REFERENCES `artists` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `songs_artists_ibfk_2` FOREIGN KEY (`songID`) REFERENCES `songs` (`ID`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `songs_genres`
--
ALTER TABLE `songs_genres`
  ADD CONSTRAINT `songs_genres_ibfk_1` FOREIGN KEY (`genreID`) REFERENCES `genres` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `songs_genres_ibfk_2` FOREIGN KEY (`songID`) REFERENCES `songs` (`ID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
