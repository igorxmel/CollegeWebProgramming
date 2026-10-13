// Ресурс REST API. Модели те же, что в каталоге практической 7, и те же, что в
// таблице product базы из практической 4. База здесь не подключается, данные
// лежат в массиве и живут только пока работает сервер.

const sneakers = [
    { id: 1, title: "Nike Air Zoom Pegasus 40", brand: "Nike", category: "Беговые", price: 13990 },
    { id: 2, title: "Nike LeBron XXI", brand: "Nike", category: "Баскетбольные", price: 21500 },
    { id: 3, title: "Adidas Samba OG", brand: "Adidas", category: "Повседневные", price: 9990 },
    { id: 4, title: "Adidas Ultraboost Light", brand: "Adidas", category: "Беговые", price: 17490 },
    { id: 5, title: "New Balance 574", brand: "New Balance", category: "Повседневные", price: 11250 },
    { id: 6, title: "New Balance FuelCell", brand: "New Balance", category: "Беговые", price: 15800 }
];

module.exports = { sneakers };
