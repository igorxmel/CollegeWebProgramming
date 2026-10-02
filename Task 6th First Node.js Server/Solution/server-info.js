// Practice 6, additional task: the same server, but the response carries
// the college name, the student name and the group number.

const http = require("http");

const PORT = 3000;

const COLLEGE = "ГБПОУ РО «Ростовский-на-Дону колледж связи и информатики»";
const STUDENT = "Холкин Егор";
const GROUP = "ИС-42";

const server = http.createServer((request, response) => {
    response.writeHead(200, {
        "Content-Type": "text/plain; charset=utf-8"
    });
    response.end(
        `${COLLEGE}\nСтудент: ${STUDENT}\nГруппа: ${GROUP}`
    );
});

server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
