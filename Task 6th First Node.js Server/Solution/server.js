// Practice 6, main task: the simplest HTTP server on Node.js.
// It answers every request with the same plain-text line.

const http = require("http");

const PORT = 3000;

const server = http.createServer((request, response) => {
    response.writeHead(200, {
        "Content-Type": "text/plain; charset=utf-8"
    });
    response.end("Сервер успешно работает");
});

server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
