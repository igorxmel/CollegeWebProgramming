const mysql = require("mysql2/promise");

// Connection settings for the MySQL container from docker-compose.
// For OpenServer change the port and clear the password.
const config = {
    host: "localhost",
    user: "root",
    password: "root",
    port: 3307,
    charset: "utf8mb4"
};

const db = mysql.createPool({
    ...config,
    database: "web_project"
});

// The database and the table are created on the first start, so the server
// does not fail with "Unknown database 'web_project'" on a fresh MySQL.
async function initDatabase() {
    const connection = await mysql.createConnection(config);

    try {
        await connection.query(
            "CREATE DATABASE IF NOT EXISTS web_project " +
            "CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci"
        );

        await connection.query("USE web_project");

        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                consent BOOLEAN NOT NULL DEFAULT FALSE
            )
        `);

        // Databases created before the consent checkbox do not have the column.
        const [columns] = await connection.query(
            "SELECT COLUMN_NAME FROM information_schema.COLUMNS " +
            "WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME = ?",
            ["web_project", "users", "consent"]
        );

        if (columns.length === 0) {
            await connection.query(
                "ALTER TABLE users ADD COLUMN consent BOOLEAN NOT NULL DEFAULT FALSE"
            );
        }
    } finally {
        await connection.end();
    }
}

module.exports = { db, initDatabase };
