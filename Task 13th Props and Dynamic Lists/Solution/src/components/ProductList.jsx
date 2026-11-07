import ProductCard from "./ProductCard";
import ItemStats from "./ItemStats";

function ProductList({ items }) {
    return (
        <section className="catalog" id="catalog">
            <div className="container">
                <div className="section-head">
                    <h2 className="section-head__title section-head__title--underlined">Каталог</h2>
                    <a className="section-head__link" href="#catalog">Смотреть все &rarr;</a>
                </div>

                <ItemStats items={items} />

                <div className="catalog__grid">
                    {items.map(item => (
                        <ProductCard key={item.id} {...item} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ProductList;
