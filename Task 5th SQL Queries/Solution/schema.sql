-- ---------------------------------------------------------------------------
-- Интернет-магазин кроссовок «Dream Sneakers»
-- Схема базы данных из практической работы № 4, диалект MySQL 8.
--
-- Девять таблиц: три справочника (brand, category, size), каталог (product),
-- остатки по размерам (product_size), покупатели (customer), заказы
-- (customer_order, order_item) и отзывы (review).
-- ---------------------------------------------------------------------------

DROP DATABASE IF EXISTS dream_sneakers;
CREATE DATABASE dream_sneakers CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE dream_sneakers;

CREATE TABLE brand (
    brand_id INT AUTO_INCREMENT PRIMARY KEY,
    name     VARCHAR(80) NOT NULL UNIQUE,
    country  VARCHAR(60) NOT NULL
);

CREATE TABLE category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE size (
    size_id INT AUTO_INCREMENT PRIMARY KEY,
    eu_size DECIMAL(4,1) NOT NULL,
    us_size DECIMAL(4,1) NOT NULL
);

CREATE TABLE product (
    product_id  INT AUTO_INCREMENT PRIMARY KEY,
    brand_id    INT NOT NULL,
    category_id INT NOT NULL,
    name        VARCHAR(120) NOT NULL,
    description TEXT,
    price       DECIMAL(10,2) NOT NULL,
    is_active   TINYINT(1) NOT NULL DEFAULT 1,
    created_at  DATETIME NOT NULL,
    CONSTRAINT fk_product_brand    FOREIGN KEY (brand_id)    REFERENCES brand (brand_id),
    CONSTRAINT fk_product_category FOREIGN KEY (category_id) REFERENCES category (category_id)
);

CREATE TABLE product_size (
    product_size_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id      INT NOT NULL,
    size_id         INT NOT NULL,
    stock_quantity  INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_ps_product FOREIGN KEY (product_id) REFERENCES product (product_id),
    CONSTRAINT fk_ps_size    FOREIGN KEY (size_id)    REFERENCES size (size_id)
);

CREATE TABLE customer (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name  VARCHAR(60) NOT NULL,
    last_name   VARCHAR(60) NOT NULL,
    email       VARCHAR(120) NOT NULL UNIQUE,
    phone       VARCHAR(20) NOT NULL,
    created_at  DATETIME NOT NULL
);

CREATE TABLE customer_order (
    order_id         INT AUTO_INCREMENT PRIMARY KEY,
    customer_id      INT NOT NULL,
    status           VARCHAR(20) NOT NULL,
    delivery_address VARCHAR(200) NOT NULL,
    created_at       DATETIME NOT NULL,
    CONSTRAINT fk_order_customer FOREIGN KEY (customer_id) REFERENCES customer (customer_id)
);

CREATE TABLE order_item (
    order_item_id   INT AUTO_INCREMENT PRIMARY KEY,
    order_id        INT NOT NULL,
    product_size_id INT NOT NULL,
    quantity        INT NOT NULL,
    unit_price      DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_item_order FOREIGN KEY (order_id)        REFERENCES customer_order (order_id),
    CONSTRAINT fk_item_ps    FOREIGN KEY (product_size_id) REFERENCES product_size (product_size_id)
);

CREATE TABLE review (
    review_id   INT AUTO_INCREMENT PRIMARY KEY,
    product_id  INT NOT NULL,
    customer_id INT NOT NULL,
    rating      INT NOT NULL,
    comment     TEXT,
    created_at  DATETIME NOT NULL,
    CONSTRAINT fk_review_product  FOREIGN KEY (product_id)  REFERENCES product (product_id),
    CONSTRAINT fk_review_customer FOREIGN KEY (customer_id) REFERENCES customer (customer_id)
);
