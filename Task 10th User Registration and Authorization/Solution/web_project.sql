-- Database and users table for practical work 10.
-- The script can be run on an existing database: it only creates missing objects.

CREATE DATABASE IF NOT EXISTS web_project
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_general_ci;

USE web_project;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
