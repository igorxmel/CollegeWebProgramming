-- Шаги 1-3 практической работы: база, таблица и данные.

CREATE DATABASE IF NOT EXISTS games_db;
USE games_db;

CREATE TABLE games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    release_year INT
);

INSERT INTO games (title, genre, release_year)
VALUES
('Minecraft', 'Sandbox', 2011),
('Counter-Strike 2', 'Shooter', 2023),
('The Witcher 3', 'RPG', 2015);
