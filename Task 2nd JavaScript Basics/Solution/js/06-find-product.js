// Task 6. Searching for a product
// find() returns the first element the callback is true for.

const products = ["Ноутбук", "Мышь", "Клавиатура", "Монитор"];
const foundProduct = products.find((product) => product === "Монитор");

console.log("--- Задание 6. Поиск товара ---");
console.log("Найденный товар:", foundProduct);
