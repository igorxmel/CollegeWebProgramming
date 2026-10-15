const express = require("express");
const db = require("./db");

const app = express();

// Страница со списком игр лежит в public и отдаётся на корневом адресе.
app.use(express.static("public"));

app.get("/games", (req, res) => {
    db.query(
        "SELECT * FROM games",
        (err, results) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }
            res.json(results);
        }
    );
});

// Дополнительное задание: только игры жанра RPG.
app.get("/games/rpg", (req, res) => {
    db.query(
        "SELECT * FROM games WHERE genre = 'RPG'",
        (err, results) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }
            res.json(results);
        }
    );
});

app.listen(3000, () => {
    console.log("Сервер запущен");
});
