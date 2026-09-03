// Task 11. Employees with a salary above 70000
// filter() keeps only the elements the callback returns true for.

const employees = [
    { name: "Ольга Титова", position: "Руководитель отдела", salary: 120000 },
    { name: "Дмитрий Ершов", position: "Разработчик", salary: 95000 },
    { name: "Мария Гусева", position: "Дизайнер", salary: 70000 },
    { name: "Артём Белов", position: "Стажёр", salary: 35000 },
    { name: "Никита Фомин", position: "Тестировщик", salary: 72000 }
];

const wellPaidEmployees = employees.filter((employee) => employee.salary > 70000);

console.log("--- Задание 11. Сотрудники с зарплатой выше 70000 ---");

wellPaidEmployees.forEach((employee) => {
    console.log(`${employee.name}, ${employee.position}: ${employee.salary} руб.`);
});
