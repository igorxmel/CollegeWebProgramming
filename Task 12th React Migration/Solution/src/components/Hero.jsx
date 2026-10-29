function Hero() {
    return (
        <section className="hero">
            <div className="container hero__inner">
                <div className="hero__content">
                    <h1 className="hero__title">Кроссовки для каждого шага</h1>
                    <p className="hero__text">
                        Найди идеальную пару для спорта, стиля и комфорта. Оригинальные модели,
                        честные размеры и доставка по всей России.
                    </p>
                    <div className="hero__actions">
                        <a className="button button--primary" href="#catalog">Подобрать пару</a>
                        <a className="button button--outline" href="#catalog">Коллекция</a>
                    </div>
                </div>

                <div className="hero__media">
                    <img className="hero__image" src="/images/hero-sneaker.svg" alt="Кроссовки из новой коллекции" width="640" height="400" />
                </div>
            </div>
        </section>
    );
}

export default Hero;
