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

CREATE TABLE IF NOT EXISTS shop_products (
    id INT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price INT UNSIGNED NOT NULL,
    is_active BOOLEAN NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS shop_orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    total INT UNSIGNED NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS shop_order_lines (
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT UNSIGNED NOT NULL,
    unit_price INT UNSIGNED NOT NULL,
    PRIMARY KEY (order_id,product_id),
    FOREIGN KEY (order_id) REFERENCES shop_orders(id),
    FOREIGN KEY (product_id) REFERENCES shop_products(id)
) ENGINE=InnoDB;

INSERT IGNORE INTO shop_products (id,title,category,price,is_active) VALUES
(1, 'Urban Classic', 'Повседневные', 6490, 1),
(2, 'Night Runner', 'Беговые', 8900, 1),
(3, 'Fresh Mint', 'Беговые', 7250, 1),
(4, 'Pink Statement', 'Повседневные', 9700, 1),
(5, 'Desert Walk', 'Повседневные', 8150, 0),
(6, 'Court Blue', 'Баскетбольные', 7990, 1);
