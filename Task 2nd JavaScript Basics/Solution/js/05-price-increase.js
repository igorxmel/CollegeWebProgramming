// Task 5. Product catalogue prices
// map() builds a new array, the original one stays untouched.

const prices = [150, 300, 450, 800];
const increasedPrices = prices.map((price) => price * 1.2);

console.log("--- Задание 5. Каталог товаров ---");
console.log("Исходные цены:", prices);
console.log("Цены после наценки 20%:", increasedPrices);
