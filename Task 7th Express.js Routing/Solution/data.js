// Data for the catalog routes. Taken from the Dream Sneakers database built in
// practice 4 and filled in practice 5, so the API serves the same models.
// Only the models that are still on sale (is_active = 1) get into the catalog.

const sneakers = [
    { id: 1, title: "Nike Air Zoom Pegasus 40", brand: "Nike", category: "Беговые", price: 13990 },
    { id: 2, title: "Nike LeBron XXI", brand: "Nike", category: "Баскетбольные", price: 21500 },
    { id: 3, title: "Adidas Samba OG", brand: "Adidas", category: "Повседневные", price: 9990 },
    { id: 4, title: "Adidas Ultraboost Light", brand: "Adidas", category: "Беговые", price: 17490 },
    { id: 5, title: "New Balance 574", brand: "New Balance", category: "Повседневные", price: 11250 },
    { id: 6, title: "New Balance FuelCell", brand: "New Balance", category: "Беговые", price: 15800 }
];

const news = [
    { id: 1, title: "New Balance FuelCell уже в продаже", date: "2026-04-05", text: "Соревновательная модель появилась в размерах 42 и 43." },
    { id: 2, title: "Adidas Ultraboost Light приехал на склад", date: "2026-03-20", text: "Новое поколение подошвы Light BOOST, вес снижен на 30 процентов." },
    { id: 3, title: "Возвращение Nike LeBron XXI", date: "2026-03-01", text: "Баскетбольная линейка пополнилась моделью с амортизацией Zoom Air." }
];

// Средний балл и число отзывов посчитаны по таблице review из практической 5.
// Модель без отзывов остаётся в списке с пустым баллом, как в запросе с LEFT JOIN.
const rating = [
    { place: 1, productId: 3, title: "Adidas Samba OG", score: 5.0, reviews: 1 },
    { place: 2, productId: 4, title: "Adidas Ultraboost Light", score: 5.0, reviews: 1 },
    { place: 3, productId: 1, title: "Nike Air Zoom Pegasus 40", score: 4.5, reviews: 2 },
    { place: 4, productId: 5, title: "New Balance 574", score: 4.0, reviews: 1 },
    { place: 5, productId: 2, title: "Nike LeBron XXI", score: 3.0, reviews: 1 },
    { place: 6, productId: 6, title: "New Balance FuelCell", score: null, reviews: 0 }
];

const categories = [
    { id: 1, name: "Беговые", description: "Для тренировок и соревнований" },
    { id: 2, name: "Повседневные", description: "Для города и носки каждый день" },
    { id: 3, name: "Баскетбольные", description: "С усиленной амортизацией и фиксацией" }
];

module.exports = { sneakers, news, rating, categories };
