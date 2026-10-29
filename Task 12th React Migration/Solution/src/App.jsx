import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductList from "./components/ProductList";
import Brand from "./components/Brand";
import Reviews from "./components/Reviews";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";

function App() {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <ProductList />
                <Brand />
                <Reviews />
                <Contacts />
            </main>
            <Footer />
        </>
    );
}

export default App;
