// Task 3. Shopping list
// Print every product with its position number using a classic for loop.

const shoppingList = ["Хлеб", "Молоко", "Яблоки", "Сыр", "Кофе"];

console.log("--- Задание 3. Список покупок ---");

for (let i = 0; i < shoppingList.length; i++) {
    console.log(`${i + 1}. ${shoppingList[i]}`);
}
