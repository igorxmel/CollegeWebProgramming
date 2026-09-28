-- ---------------------------------------------------------------------------
-- Пятнадцать запросов к базе dream_sneakers.
--
-- Запросы 1-12 на выборку, 13-15 изменяют данные, поэтому выполнять их стоит
-- последними: после них результаты предыдущих запросов изменятся.
-- ---------------------------------------------------------------------------

USE dream_sneakers;

-- 1. Весь активный каталог: какие модели сейчас показываются покупателю.
SELECT product_id, name, price
FROM product
WHERE is_active = 1
ORDER BY name;

-- 2. Модели дороже 12000 рублей, от самой дорогой к самой дешёвой.
SELECT name, price
FROM product
WHERE price > 12000
ORDER BY price DESC;

-- 3. Поиск покупателя по почте: так работает форма входа на сайте.
SELECT customer_id, first_name, last_name, phone
FROM customer
WHERE email = 'anna@example.com';

-- 4. Пять последних заказов для админки магазина.
SELECT order_id, customer_id, status, created_at
FROM customer_order
ORDER BY created_at DESC
LIMIT 5;

-- 5. Сколько моделей в каталоге всего и сколько из них активных.
SELECT COUNT(*) AS total_products,
       SUM(is_active) AS active_products
FROM product;

-- 6. Все заказы одного покупателя: раздел «Мои заказы» в личном кабинете.
SELECT order_id, status, created_at
FROM customer_order
WHERE customer_id = 1
ORDER BY created_at DESC;

-- 7. Карточка каталога: модель вместе с брендом и категорией.
SELECT p.name AS product_name,
       b.name AS brand_name,
       c.name AS category_name,
       p.price
FROM product p
JOIN brand b    ON p.brand_id = b.brand_id
JOIN category c ON p.category_id = c.category_id
WHERE p.is_active = 1
ORDER BY b.name, p.name;

-- 8. Остатки по размерам конкретной модели: блок выбора размера на карточке.
SELECT s.eu_size, s.us_size, ps.stock_quantity
FROM product_size ps
JOIN size s ON ps.size_id = s.size_id
WHERE ps.product_id = 1
ORDER BY s.eu_size;

-- 9. Сумма каждого заказа: цена за пару умножается на количество и суммируется.
SELECT o.order_id,
       o.status,
       SUM(oi.quantity * oi.unit_price) AS order_total
FROM customer_order o
JOIN order_item oi ON o.order_id = oi.order_id
GROUP BY o.order_id, o.status
ORDER BY order_total DESC;

-- 10. Средняя оценка моделей, у которых есть хотя бы два отзыва.
SELECT p.name,
       COUNT(r.review_id) AS review_count,
       ROUND(AVG(r.rating), 2) AS avg_rating
FROM product p
JOIN review r ON p.product_id = r.product_id
GROUP BY p.product_id, p.name
HAVING COUNT(r.review_id) >= 2
ORDER BY avg_rating DESC;

-- 11. Три бренда, у которых куплено больше всего пар.
SELECT b.name AS brand_name,
       SUM(oi.quantity) AS pairs_sold
FROM order_item oi
JOIN product_size ps ON oi.product_size_id = ps.product_size_id
JOIN product p       ON ps.product_id = p.product_id
JOIN brand b         ON p.brand_id = b.brand_id
GROUP BY b.brand_id, b.name
ORDER BY pairs_sold DESC
LIMIT 3;

-- 12. Покупатели, которые зарегистрировались, но ничего не заказали.
SELECT c.customer_id, c.first_name, c.last_name, c.email
FROM customer c
LEFT JOIN customer_order o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;

-- 13. Добавление отзыва: покупатель оценил модель после доставки.
INSERT INTO review (product_id, customer_id, rating, comment, created_at)
VALUES (6, 3, 5, 'Лёгкие, на забеге показали себя отлично', '2026-04-25 19:30:00');

-- 14. Изменение цены модели: магазин поднял цену на одну позицию.
UPDATE product
SET price = 14990.00
WHERE product_id = 1;

-- 15. Удаление отменённых заказов старше указанной даты. Сначала уходят позиции
-- заказа, иначе внешний ключ order_item не даст удалить сам заказ.
DELETE FROM order_item
WHERE order_id IN (
    SELECT order_id FROM customer_order
    WHERE status = 'отменён' AND created_at < '2026-04-12 00:00:00'
);

DELETE FROM customer_order
WHERE status = 'отменён'
  AND created_at < '2026-04-12 00:00:00';
