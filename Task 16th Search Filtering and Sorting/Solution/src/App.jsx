import Admin from "./components/Admin";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductList from "./components/ProductList";
import Brand from "./components/Brand";
import Reviews from "./components/Reviews";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";
import { items } from "./data";

function Storefront() {
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
            <div className="container"><a href="/admin">Панель заявок</a></div>
        </>
    );
}

export default function App() {
    return window.location.pathname === "/admin" ? <Admin /> : <Storefront />;
}
