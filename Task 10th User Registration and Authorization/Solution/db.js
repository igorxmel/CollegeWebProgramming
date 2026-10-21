const mysql = require("mysql2/promise");

// Connection settings for the MySQL container from docker-compose.
// For OpenServer change the port and clear the password.
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "web_project",
    port: 3307,
    charset: "utf8mb4"
});

module.exports = db;
