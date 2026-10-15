const mysql = require("mysql2");

// Параметры под MySQL из docker-compose этого репозитория. Для OpenServer
// поменять port на тот, что указан в настройках модуля, и password на пустой.
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "games_db",
    port: 3307
});

connection.connect((err) => {
    if (err) {
        console.log("Ошибка подключения");
        return;
    }
    console.log("Подключение успешно");
});

module.exports = connection;
