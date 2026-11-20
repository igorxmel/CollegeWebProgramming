import { useState } from "react";
import { api } from "../api";
import { mask } from "./ContactForm";

export default function Checkout({ items, quantities, change, clear }) {
    const [phone, setPhone] = useState("");
    const [result, setResult] = useState("");
    const [busy, setBusy] = useState(false);
    const cart = items.filter(item => quantities[item.id] > 0);
    const total = cart.reduce((sum, item) => sum + item.price * quantities[item.id], 0);

    async function submit(event) {
        event.preventDefault();
        setResult("");
        const name = new FormData(event.currentTarget).get("name").trim();
        if (name.length < 2 || phone.length !== 18) {
            setResult("Введите имя и полный номер телефона.");
            return;
        }
        setBusy(true);
        try {
            const order = await api("/orders", { method: "POST", body: {
                name, phone, lines: cart.map(item => ({ id: item.id, quantity: quantities[item.id] }))
            } });
            setResult("Заказ №" + order.id + " оформлен. Сумма " + Number(order.total).toLocaleString("ru-RU") + " ₽.");
            clear();
            setPhone("");
        } catch (error) { setResult(error.message); }
        finally { setBusy(false); }
    }

    return <section className="container management" id="cart">
        <h2>Корзина</h2>
        {!cart.length ? <p>Добавьте модель из каталога.</p> : <>
            <ul className="management__list">{cart.map(item => <li key={item.id} className="cart-line">
                <strong>{item.title}</strong>
                <span>{item.price.toLocaleString("ru-RU")} ₽ за пару</span>
                <button type="button" disabled={busy} aria-label={"Уменьшить количество " + item.title} onClick={() => change(item.id, -1)}>−</button>
                <span>{quantities[item.id]}</span>
                <button type="button" disabled={busy || quantities[item.id] >= 20} aria-label={"Увеличить количество " + item.title} onClick={() => change(item.id, 1)}>+</button>
                <button type="button" disabled={busy} className="more" onClick={() => change(item.id, -quantities[item.id])}>Убрать</button>
            </li>)}</ul>
            <p>Итого <strong>{total.toLocaleString("ru-RU")} ₽</strong></p>
            <form className="form" onSubmit={submit}>
                <label>Имя <input className="form__input" name="name" maxLength="100" required /></label>
                <label>Телефон <input className="form__input" type="tel" value={phone} onChange={e => setPhone(mask(e.target.value))} required /></label>
                <button className="button button--primary" disabled={busy}>Оформить заказ</button>
            </form>
        </>}
        {result && <p role="status">{result}</p>}
    </section>;
}
