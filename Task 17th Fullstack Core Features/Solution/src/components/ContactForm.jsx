import { useState } from "react";
import { api } from "../api";

export const topics = ["Подбор размера", "Наличие модели", "Доставка"];
const empty = { name: "", email: "", phone: "", topic: "", message: "" };

export function mask(value) {
    let digits = value.replace(/\D/g, "");
    if (/^[78]/.test(digits)) digits = digits.slice(1);
    digits = digits.slice(0, 10);
    if (!digits) return "";
    return "+7 (" + digits.slice(0, 3) + (digits.length > 3 ? ") " + digits.slice(3, 6) : "") +
        (digits.length > 6 ? "-" + digits.slice(6, 8) : "") + (digits.length > 8 ? "-" + digits.slice(8) : "");
}

function validate(values) {
    const errors = {};
    if (values.name.trim().length < 2) errors.name = "Введите имя (от 2 символов).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Введите корректный email.";
    if (!/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(values.phone)) errors.phone = "Введите номер целиком.";
    if (!topics.includes(values.topic)) errors.topic = "Выберите тему.";
    if (values.message.trim().length < 10) errors.message = "Сообщение должно содержать от 10 символов.";
    return errors;
}

export default function ContactForm() {
    const [form, setForm] = useState(empty);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const [busy, setBusy] = useState(false);

    async function submit(event) {
        event.preventDefault();
        setMessage("");
        const found = validate(form);
        setErrors(found);
        if (Object.keys(found).length) return;
        setBusy(true);
        try {
            const result = await api("/requests", { method: "POST", body: form });
            setMessage("Заявка №" + result.id + " отправлена.");
            setForm(empty);
        } catch (error) {
            setMessage(error.message);
        } finally {
            setBusy(false);
        }
    }

    return <div className="form-card contacts__form-card">
        <h3 className="form-card__title">Оставьте заявку</h3>
        <form className="form" onSubmit={submit} noValidate>
            {[
                ["name", "Имя", "text", 100], ["email", "Электронная почта", "email", 254],
                ["phone", "Телефон", "tel", 18], ["topic", "Тема"], ["message", "Сообщение", null, 1000]
            ].map(([key, label, type, limit]) => {
                const change = event => {
                    const value = key === "phone" ? mask(event.target.value) : event.target.value;
                    setForm(current => ({ ...current, [key]: value }));
                };
                const props = { className: "form__input", value: form[key], onChange: change, "aria-invalid": Boolean(errors[key]), required: true };
                return <label key={key} className="form__field">
                    <span className="form__label">{label}</span>
                    {key === "topic" ? <select {...props}><option value="">Выберите тему</option>{topics.map(t => <option key={t}>{t}</option>)}</select>
                        : key === "message" ? <textarea {...props} maxLength={limit} rows="4" />
                        : <input {...props} type={type} maxLength={limit} />}
                    {errors[key] && <span className="field-error">{errors[key]}</span>}
                </label>;
            })}
            <button className="button button--primary form__submit" disabled={busy}>Отправить заявку</button>
            {message && <p role="status">{message}</p>}
        </form>
    </div>;
}
