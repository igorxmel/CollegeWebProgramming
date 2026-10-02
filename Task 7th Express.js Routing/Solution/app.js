// Practice 7: Dream Sneakers catalog API on Express.js.
// The assignment allows continuing the project from the earlier practices,
// so the routes serve sneakers instead of the games from the example.

const express = require("express");
const { sneakers, news, rating, categories } = require("./data");

const app = express();
const PORT = 3000;

// Main task.

app.get("/", (req, res) => {
    res.send("Добро пожаловать в каталог Dream Sneakers");
});

app.get("/about", (req, res) => {
    res.send("API каталога кроссовок Dream Sneakers");
});

app.get("/sneakers", (req, res) => {
    res.json(sneakers);
});

// Additional task: three more routes, each with its own JSON.

app.get("/news", (req, res) => {
    res.json(news);
});

app.get("/rating", (req, res) => {
    res.json(rating);
});

app.get("/categories", (req, res) => {
    res.json(categories);
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
