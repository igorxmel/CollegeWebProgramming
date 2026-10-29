import ProductCard from "./ProductCard";

function ProductList() {
    return (
        <section className="catalog" id="catalog">
            <div className="container">
                <div className="section-head">
                    <h2 className="section-head__title section-head__title--underlined">Каталог</h2>
                    <a className="section-head__link" href="#catalog">Смотреть все &rarr;</a>
                </div>

                <div className="catalog__grid">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </div>
        </section>
    );
}

export default ProductList;
