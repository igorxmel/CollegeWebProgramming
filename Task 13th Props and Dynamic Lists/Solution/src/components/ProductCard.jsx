function ProductCard({ title, description, category, image, isActive, price }) {
    const cardClass = isActive ? "product-card" : "product-card product-card--inactive";

    return (
        <article className={cardClass}>
            <div className="product-card__media">
                <img className="product-card__image" src={image} alt={`Кроссовки ${title}`} width="480" height="360" />
                <span className="product-card__category">{category}</span>
            </div>
            <h3 className="product-card__title">{title}</h3>
            <p className="product-card__description">{description}</p>
            <p className={isActive ? "product-card__status" : "product-card__status product-card__status--off"}>
                {isActive ? "В наличии" : "Нет в наличии"}
            </p>
            <div className="product-card__footer">
                <span className="product-card__price">{price.toLocaleString("ru-RU")} &#8381;</span>
                <button className="button button--small product-card__button" type="button" disabled={!isActive}>
                    В корзину
                </button>
            </div>
        </article>
    );
}

export default ProductCard;
