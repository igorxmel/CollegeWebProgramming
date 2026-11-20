function ItemStats({ total, categoryCount, foundCount, availableCount }) {
    return (
        <div className="stats">
            <p className="stats__item">Всего моделей: <b>{total}</b></p>
            <p className="stats__item">В выбранной категории: <b>{categoryCount}</b></p>
            <p className="stats__item">Найдено: <b>{foundCount}</b></p>
            <p className="stats__item">Из них в наличии: <b>{availableCount}</b></p>
        </div>
    );
}

export default ItemStats;
