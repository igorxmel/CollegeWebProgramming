// Практическая 8: REST API каталога Dream Sneakers.
// Продолжение практической 7: там маршруты только отдавали данные, здесь над
// ресурсом выполняется полный набор операций CRUD.

const express = require("express");
const { sneakers } = require("./data");

const app = express();
const PORT = 3000;

app.use(express.json());

// Счётчик идентификаторов. Считать от длины массива нельзя: после удаления
// модели длина уменьшится, и следующая добавленная получит занятый номер.
let nextId = sneakers.length + 1;

function findById(rawId) {
    const id = Number(rawId);
    return sneakers.find((item) => item.id === id);
}

// Получение всех моделей. Дополнительное задание: если в строке запроса
// передана категория, список фильтруется по ней.
app.get("/sneakers", (req, res) => {
    const { category } = req.query;

    if (!category) {
        return res.status(200).json(sneakers);
    }

    const filtered = sneakers.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
    );
    res.status(200).json(filtered);
});

// Получение одной модели по идентификатору.
app.get("/sneakers/:id", (req, res) => {
    const sneaker = findById(req.params.id);

    if (!sneaker) {
        return res.status(404).json({ message: "Модель не найдена" });
    }

    res.status(200).json(sneaker);
});

// Добавление модели.
app.post("/sneakers", (req, res) => {
    const { title, brand, category, price } = req.body;

    if (!title || !brand || !category || !price) {
        return res.status(400).json({ message: "Необходимо заполнить все поля" });
    }

    const newSneaker = { id: nextId, title, brand, category, price };
    nextId += 1;
    sneakers.push(newSneaker);

    res.status(201).json(newSneaker);
});

// Изменение модели.
app.put("/sneakers/:id", (req, res) => {
    const sneaker = findById(req.params.id);

    if (!sneaker) {
        return res.status(404).json({ message: "Модель не найдена" });
    }

    const { title, brand, category, price } = req.body;

    if (!title || !brand || !category || !price) {
        return res.status(400).json({ message: "Необходимо заполнить все поля" });
    }

    sneaker.title = title;
    sneaker.brand = brand;
    sneaker.category = category;
    sneaker.price = price;

    res.status(200).json(sneaker);
});

// Удаление модели.
app.delete("/sneakers/:id", (req, res) => {
    const sneaker = findById(req.params.id);

    if (!sneaker) {
        return res.status(404).json({ message: "Модель не найдена" });
    }

    // splice меняет тот же массив, на который ссылается data.js. Через filter
    // получилась бы новая копия, а импортированная ссылка осталась бы старой.
    sneakers.splice(sneakers.indexOf(sneaker), 1);

    res.status(200).json({ message: "Модель успешно удалена" });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
