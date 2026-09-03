// Task 4. Adding a product to the cart
// push() appends the new item to the end of the array and returns the new length.

const cart = ["Футболка", "Джинсы", "Кепка"];

console.log("--- Задание 4. Добавление товара в корзину ---");
// A copy is logged on purpose: the browser console shows arrays by reference,
// so the original one would already look modified.
console.log("До добавления:", [...cart]);

cart.push("Кроссовки");

console.log("После добавления:", [...cart]);
