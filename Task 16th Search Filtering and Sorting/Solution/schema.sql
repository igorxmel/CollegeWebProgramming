CREATE DATABASE IF NOT EXISTS dream_sneakers CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE dream_sneakers;

CREATE TABLE IF NOT EXISTS requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(254) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    topic VARCHAR(100) NOT NULL,
    message VARCHAR(1000) NOT NULL,
    status ENUM('new','processing','accepted','rejected','completed') NOT NULL DEFAULT 'new',
    admin_comment VARCHAR(1000) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
