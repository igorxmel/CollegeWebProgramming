// Task 2. Age check for a 16+ concert
// The visitor is allowed in when the age is 16 or above.

const AGE_LIMIT = 16;
let visitorAge = 17;

console.log("--- Задание 2. Проверка доступа к мероприятию ---");

if (visitorAge >= AGE_LIMIT) {
    console.log("Вход разрешён");
} else {
    console.log("Вход запрещён");
}
