function ProductCard() {
    return (
        <article className="product-card">
            <div className="product-card__media">
                <img className="product-card__image" src="/images/product-1.svg" alt="Кроссовки Urban Classic" width="480" height="360" />
            </div>
            <h3 className="product-card__title">Urban Classic</h3>
            <p className="product-card__description">
                Низкий силуэт из плотного текстиля. Спокойная база, которая сочетается
                почти с чем угодно.
            </p>
            <div className="product-card__footer">
                <span className="product-card__price">6 490 &#8381;</span>
                <button className="button button--small product-card__button" type="button">В корзину</button>
            </div>
        </article>
    );
}

export default ProductCard;
