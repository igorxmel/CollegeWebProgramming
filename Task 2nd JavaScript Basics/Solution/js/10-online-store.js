// Task 10. Online store catalogue
// An array of objects, printed with for...of.

const storeProducts = [
    { name: "Наушники", price: 2500 },
    { name: "Кроссовки", price: 6490 },
    { name: "Рюкзак", price: 3200 },
    { name: "Часы", price: 8900 }
];

console.log("--- Задание 10. Интернет-магазин ---");

for (const product of storeProducts) {
    console.log(`${product.name}: ${product.price} руб.`);
}
