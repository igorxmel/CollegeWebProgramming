import { useEffect, useState } from "react";
import { api } from "./api";
import Checkout from "./components/Checkout";
import Admin from "./components/Admin";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductList from "./components/ProductList";
import Brand from "./components/Brand";
import Reviews from "./components/Reviews";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";

function Storefront() {
    const [items, setItems] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [catalogMessage, setCatalogMessage] = useState("Загружаем каталог…");

    useEffect(() => {
        let active = true;
        api("/products").then(data => {
            if (active) { setItems(data); setCatalogMessage(""); }
        }).catch(() => {
            if (active) setCatalogMessage("Каталог недоступен. Проверьте подключение и обновите страницу.");
        });
        return () => { active = false; };
    }, []);

    function change(id, delta) {
        setQuantities(current => ({ ...current, [id]: Math.max(0, Math.min(20, (current[id] ?? 0) + delta)) }));
    }
    return (
        <>
            <Header />
            <main>
                <Hero />
                {catalogMessage ? <p className="container management" role="status">{catalogMessage}</p>
                    : <ProductList items={items} onAdd={id => change(id, 1)} cartCount={Object.values(quantities).reduce((sum, n) => sum + n, 0)} />}
                <Checkout items={items} quantities={quantities} change={change} clear={() => setQuantities({})} />
                <Brand />
                <Reviews />
                <Contacts />
            </main>
            <Footer />
            <div className="container management"><a className="more" href="/admin">Панель заявок</a></div>
        </>
    );
}

export default function App() {
    return window.location.pathname === "/admin" ? <Admin /> : <Storefront />;
}
