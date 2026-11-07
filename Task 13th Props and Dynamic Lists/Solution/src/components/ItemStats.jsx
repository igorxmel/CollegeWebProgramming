function ItemStats({ items }) {
    const activeCount = items.filter(item => item.isActive).length;
    const categories = new Set(items.map(item => item.category));

    return (
        <div className="stats">
            <p className="stats__item">Всего моделей: <b>{items.length}</b></p>
            <p className="stats__item">В наличии: <b>{activeCount}</b></p>
            <p className="stats__item">Категорий: <b>{categories.size}</b></p>
        </div>
    );
}

export default ItemStats;
