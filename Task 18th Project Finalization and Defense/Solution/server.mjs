import express from "express";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import { timingSafeEqual } from "node:crypto";
import { items } from "./src/data.js";

const { DB_HOST = "127.0.0.1", DB_PORT = "3307", DB_USER, DB_PASSWORD = "", DB_NAME = "dream_sneakers", ADMIN_PASSWORD, JWT_SECRET } = process.env;
if (!DB_USER || !ADMIN_PASSWORD || !JWT_SECRET || JWT_SECRET.length < 32) {
    throw new Error("Set DB_USER, ADMIN_PASSWORD and JWT_SECRET (at least 32 characters).");
}
const pool = mysql.createPool({ host: DB_HOST, port: Number(DB_PORT), user: DB_USER, password: DB_PASSWORD, database: DB_NAME });
const app = express();
app.use(express.json({ limit: "16kb" }));
const statuses = ["new", "processing", "accepted", "rejected", "completed"];
function admin(req, res, next) {
    try {
        const token = jwt.verify(req.get("Authorization")?.replace(/^Bearer /, "") ?? "", JWT_SECRET, { algorithms: ["HS256"] });
        if (token.role === "admin") return next();
    } catch {}
    res.status(401).json({ message: "Войдите как администратор." });
}
app.post("/api/login", (req, res) => {
    const given = Buffer.from(typeof req.body?.password === "string" ? req.body.password : "");
    const expected = Buffer.from(ADMIN_PASSWORD);
    if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
        return res.status(401).json({ message: "Неверный пароль." });
    }
    res.json({ token: jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "30m", algorithm: "HS256" }) });
});
function fields(body) {
    return ["name", "email", "phone", "topic", "message"].map(key => typeof body?.[key] === "string" ? body[key].trim() : "");
}
function valid([name, email, phone, topic, message]) {
    return name.length >= 2 && name.length <= 100 && email.length <= 254 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phone) &&
        ["Подбор размера", "Наличие модели", "Доставка"].includes(topic) && message.length >= 10 && message.length <= 1000;
}
app.post("/api/requests", async (req, res) => {
    const values = fields(req.body);
    if (!valid(values)) return res.status(400).json({ message: "Проверьте поля заявки." });
    const [result] = await pool.execute("INSERT INTO requests (name,email,phone,topic,message) VALUES (?,?,?,?,?)", values);
    res.status(201).json({ id: result.insertId });
});
app.get("/api/requests", admin, async (req, res) => {
    const search = typeof req.query.q === "string" ? req.query.q.slice(0, 100) : "";
    const status = statuses.includes(req.query.status) ? req.query.status : "";
    const [rows] = await pool.execute(
        "SELECT id,name,email,topic,status,created_at FROM requests WHERE (? = '' OR status = ?) AND (INSTR(name, ?) > 0 OR INSTR(email, ?) > 0 OR INSTR(topic, ?) > 0 OR ? = '') ORDER BY id DESC",
        [status, status, search, search, search, search]
    );
    res.json(rows);
});
app.get("/api/requests/:id", admin, async (req, res) => {
    const [rows] = await pool.execute("SELECT * FROM requests WHERE id = ?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: "Заявка не найдена." });
    res.json(rows[0]);
});
app.put("/api/requests/:id", admin, async (req, res) => {
    const values = fields(req.body);
    const { status, admin_comment: rawComment } = req.body ?? {};
    const comment = typeof rawComment === "string" ? rawComment.trim() : "";
    if (!valid(values) || !statuses.includes(status) || comment.length > 1000 || (status === "rejected" && !comment)) {
        return res.status(400).json({ message: "Проверьте поля. Для отклонения укажите причину." });
    }
    const [result] = await pool.execute(
        "UPDATE requests SET name=?,email=?,phone=?,topic=?,message=?,status=?,admin_comment=? WHERE id=?",
        [...values, status, comment, req.params.id]
    );
    res.status(result.affectedRows ? 200 : 404).json({ message: result.affectedRows ? "Сохранено." : "Заявка не найдена." });
});
app.delete("/api/requests/:id", admin, async (req, res) => {
    const [result] = await pool.execute("DELETE FROM requests WHERE id = ?", [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: "Заявка не найдена." });
    res.sendStatus(204);
});
app.get("/api/products", async (req, res) => {
    const [rows] = await pool.execute("SELECT id,title,category,price,is_active FROM shop_products ORDER BY id");
    res.json(rows.flatMap(row => {
        const details = items.find(item => item.id === row.id);
        return details ? [{ ...details, title: row.title, price: Number(row.price), category: row.category, isActive: Boolean(row.is_active) }] : [];
    }));
});
app.post("/api/orders", async (req, res) => {
    const { name, phone, lines } = req.body ?? {};
    if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 100 ||
        typeof phone !== "string" || !/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phone) ||
        !Array.isArray(lines) || !lines.length || lines.length > 50 ||
        !lines.every(line => line && Number.isSafeInteger(line.id) && line.id > 0 && Number.isInteger(line.quantity) && line.quantity >= 1 && line.quantity <= 20) ||
        new Set(lines.map(line => line.id)).size !== lines.length) {
        return res.status(400).json({ message: "Проверьте контакты и количество товаров." });
    }
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        let total = 0;
        const orderLines = [];
        for (const line of lines) {
            const [[product]] = await connection.execute("SELECT price,is_active FROM shop_products WHERE id = ?", [line.id]);
            if (!product?.is_active) {
                await connection.rollback();
                return res.status(400).json({ message: "Одна из моделей недоступна." });
            }
            const price = Number(product.price);
            total += price * line.quantity;
            orderLines.push([line.id, line.quantity, price]);
        }
        const [order] = await connection.execute("INSERT INTO shop_orders (customer_name,phone,total) VALUES (?,?,?)", [name.trim(), phone, total]);
        for (const line of orderLines) {
            await connection.execute("INSERT INTO shop_order_lines (order_id,product_id,quantity,unit_price) VALUES (?,?,?,?)", [order.insertId, ...line]);
        }
        await connection.commit();
        res.status(201).json({ id: order.insertId, total });
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally { connection.release(); }
});
app.use((error, req, res, next) => {
    if (error.status >= 400 && error.status < 500) {
        return res.status(error.status).json({ message: "Проверьте формат запроса." });
    }
    console.error(error.code ?? error.name);
    res.status(500).json({ message: "Не удалось выполнить запрос. Проверьте подключение к базе." });
});
app.listen(3000, "127.0.0.1", () => console.log("API http://127.0.0.1:3000"));
