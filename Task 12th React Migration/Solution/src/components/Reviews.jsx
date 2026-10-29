import ReviewCard from "./ReviewCard";

const reviews = [
    {
        rating: 5,
        text: "Заказывала пару в подарок, привезли на следующий день. Размер сошелся по таблице замеров, коробка не помята, все честно.",
        initials: "АК",
        name: "Анна Ковалева",
        role: "покупает второй год"
    },
    {
        rating: 5,
        text: "Долго выбирал беговые, консультант расспросил про пронацию и километраж и предложил три варианта. Взял Night Runner, за месяц ни одной мозоли.",
        initials: "МС",
        name: "Максим Соколов",
        role: "любительский бег"
    },
    {
        rating: 4,
        text: "Пара пришла на полразмера меньше, обменяли без вопросов за свой счет. Единственное, курьер приехал ближе к вечеру, хотя обещали днем.",
        initials: "ИЛ",
        name: "Илья Лебедев",
        role: "первый заказ"
    }
];

function Reviews() {
    return (
        <section className="reviews" id="reviews">
            <div className="container">
                <h2 className="reviews__title">Реальные отзывы наших клиентов</h2>

                <div className="reviews__grid">
                    {reviews.map((review) => (
                        <ReviewCard key={review.name} {...review} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Reviews;
