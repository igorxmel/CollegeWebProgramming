import Benefit from "./Benefit";

const benefits = [
    {
        number: "01",
        title: "Культура",
        text: "Мы создаем сообщество, где кроссовки это образ жизни. Наши ивенты и коллаборации объединяют ценителей уличной моды."
    },
    {
        number: "02",
        title: "Экспертиза",
        text: "Каждая пара проходит проверку нашими экспертами. Мы знаем все о технологиях брендов и особенностях каждой модели."
    },
    {
        number: "03",
        title: "Сервис",
        text: "Подбираем размер по замерам стопы, отправляем заказ в день оформления и меняем пару, если она не подошла."
    }
];

function Brand() {
    return (
        <section className="brand" id="brand">
            <div className="brand__inner">
                <div className="brand__content">
                    <h2 className="brand__title">DreamSneakers &mdash; это не просто магазин</h2>

                    <ul className="brand__list">
                        {benefits.map((benefit) => (
                            <Benefit key={benefit.number} {...benefit} />
                        ))}
                    </ul>
                </div>

                <div className="brand__media">
                    <img className="brand__image" src="/images/brand.svg" alt="Пара кроссовок из витрины магазина" width="640" height="720" />
                </div>
            </div>
        </section>
    );
}

export default Brand;
