import { useState } from "react";
import ProductCard from "./ProductCard";
import ItemStats from "./ItemStats";

function ProductList({ items }) {
    const [selectedCategory, setSelectedCategory] = useState("Все");
    const [search, setSearch] = useState("");

    const categories = ["Все", ...new Set(items.map(item => item.category))];

    const categoryItems = items.filter(item =>
        selectedCategory === "Все" || item.category === selectedCategory
    );
    const filteredItems = categoryItems.filter(item =>
        item.title.toLowerCase().includes(search.trim().toLowerCase())
    );
    const availableCount = filteredItems.filter(item => item.isActive).length;

    return (
        <section className="catalog" id="catalog">
            <div className="container">
                <div className="section-head">
                    <h2 className="section-head__title section-head__title--underlined">Каталог</h2>
                    <a className="section-head__link" href="#catalog">Смотреть все &rarr;</a>
                </div>

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

                {filteredItems.length > 0 ? (
                    <div className="catalog__grid">
                        {filteredItems.map(item => (
                            <ProductCard key={item.id} {...item} />
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
