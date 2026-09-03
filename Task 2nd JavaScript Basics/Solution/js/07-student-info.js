// Task 7. Student information
// for...in walks through the keys of an object.

const student = {
    name: "Егор Холкин",
    group: "ИСП-41",
    course: 4
};

console.log("--- Задание 7. Информация о студенте ---");

for (const key in student) {
    console.log(`${key}: ${student[key]}`);
}
