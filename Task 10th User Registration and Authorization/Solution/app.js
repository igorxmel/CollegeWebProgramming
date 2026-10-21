const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("./db");

const app = express();
const PORT = 3000;

// In a real project the secret is kept in an environment variable.
const JWT_SECRET = "secretKey";

app.use(express.json());
app.use(express.static("public"));

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Заполните все поля"
        });
    }

    try {
        const [users] = await db.query(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (users.length > 0) {
            return res.status(400).json({
                message: "Пользователь с таким email уже существует"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword]
        );

        res.status(201).json({
            message: "Пользователь зарегистрирован"
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Ошибка сервера"
        });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (users.length === 0) {
            return res.status(404).json({
                message: "Пользователь не найден"
            });
        }

        const user = users[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({
                message: "Неверный пароль"
            });
        }

        const token = jwt.sign(
            { id: user.id },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            message: "Авторизация успешна",
            token: token
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Ошибка сервера"
        });
    }
});

app.get("/users", async (req, res) => {
    try {
        const [users] = await db.query(
            "SELECT id, name, email FROM users ORDER BY id"
        );

        res.json(users);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Ошибка сервера"
        });
    }
});

app.get("/users/:id", async (req, res) => {
    try {
        const [users] = await db.query(
            "SELECT id, name, email FROM users WHERE id = ?",
            [req.params.id]
        );

        if (users.length === 0) {
            return res.status(404).json({
                message: "Пользователь не найден"
            });
        }

        res.json(users[0]);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Ошибка сервера"
        });
    }
});

app.delete("/users/:id", async (req, res) => {
    try {
        const [result] = await db.query(
            "DELETE FROM users WHERE id = ?",
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Пользователь не найден"
            });
        }

        res.json({
            message: "Пользователь удален"
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Ошибка сервера"
        });
    }
});

async function start() {
    try {
        await db.query("SELECT 1");
        console.log("Подключение к MySQL установлено");

        app.listen(PORT, () => {
            console.log(`Сервер запущен: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log("Ошибка подключения к MySQL:", error.message);
        process.exit(1);
    }
}

start();
