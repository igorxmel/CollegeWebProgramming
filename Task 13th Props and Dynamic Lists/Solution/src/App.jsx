import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductList from "./components/ProductList";
import Brand from "./components/Brand";
import Reviews from "./components/Reviews";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";
import { items } from "./data";

function App() {
    const activeItems = items.filter(item => item.isActive);
    const sortedItems = [...items].sort((a, b) => a.price - b.price);

    console.log("Всего моделей:", items.length);
    console.log("В наличии:", activeItems.length);
    console.log("Модели в наличии:", activeItems);
    console.log("Отсортировано по цене:", sortedItems);

    return (
        <>
            <Header />
            <main>
                <Hero />
                <ProductList items={items} />
                <Brand />
                <Reviews />
                <Contacts />
            </main>
            <Footer />
        </>
    );
}

export default App;
