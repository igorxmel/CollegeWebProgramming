import { useState } from "react";
import ProductCard from "./ProductCard";
import ItemStats from "./ItemStats";

function ProductList({ items, onAdd, cartCount }) {
    const [selectedCategory, setSelectedCategory] = useState("Все");
    const [search, setSearch] = useState("");
    const [inStockOnly, setInStockOnly] = useState(false);
    const [criterion, setCriterion] = useState("price");
    const [direction, setDirection] = useState("asc");

    const categories = ["Все", ...new Set(items.map(item => item.category))];

    const categoryItems = items.filter(item =>
        selectedCategory === "Все" || item.category === selectedCategory
    );
    const filteredItems = categoryItems.filter(item =>
        (!inStockOnly || item.isActive) && item.title.toLowerCase().includes(search.trim().toLowerCase())
    );
    const sortedItems = [...filteredItems].sort((a, b) => {
        const order = criterion === "price" ? a.price - b.price : a.title.localeCompare(b.title, "ru");
        return direction === "asc" ? order : -order;
    });
    const availableCount = filteredItems.filter(item => item.isActive).length;

    return (
        <section className="catalog" id="catalog">
            <div className="container">
                <div className="section-head">
                    <h2 className="section-head__title section-head__title--underlined">Каталог</h2>
                    <a className="section-head__link" href="#catalog">Смотреть все &rarr;</a>
                </div>

                <a className="cart-link more" href="#cart">Корзина ({cartCount})</a>

                <ItemStats
                    total={items.length}
                    categoryCount={categoryItems.length}
                    foundCount={filteredItems.length}
                    availableCount={availableCount}
                />

                <div className="filters">
                    <ul className="filters__list">
                        {categories.map(category => (
                            <li key={category}>
                                <button
                                    className={category === selectedCategory ? "filters__button filters__button--active" : "filters__button"}
                                    type="button"
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <input
                        className="filters__search"
                        type="text"
                        value={search}
                        onChange={event => setSearch(event.target.value)}
                        placeholder="Поиск по названию..."
                    />
                </div>

                <div className="catalog-options">
                    <label><input type="checkbox" checked={inStockOnly} onChange={e => setInStockOnly(e.target.checked)} /> Только в наличии</label>
                    <label>Сортировка <select value={criterion} onChange={e => setCriterion(e.target.value)}><option value="price">Цена</option><option value="title">Название</option></select></label>
                    <label>Направление <select value={direction} onChange={e => setDirection(e.target.value)}><option value="asc">По возрастанию</option><option value="desc">По убыванию</option></select></label>
                    <button className="button button--small button--outline-accent" type="button" onClick={() => {
                        setSelectedCategory("Все");
                        setSearch("");
                        setInStockOnly(false);
                        setCriterion("price");
                        setDirection("asc");
                    }}>Сбросить</button>
                </div>

                {filteredItems.length > 0 ? (
                    <div className="catalog__grid">
                        {sortedItems.map(item => (
                            <ProductCard key={item.id} {...item} onAdd={onAdd} />
                        ))}
                    </div>
                ) : (
                    <p className="catalog__empty">По вашему запросу ничего не найдено.</p>
                )}
            </div>
        </section>
    );
}

export default ProductList;
