import { useEffect, useState } from "react";
import { api } from "../api";
import { topics, mask } from "./ContactForm";

const statuses = { new: "Новая", processing: "В работе", accepted: "Принята", rejected: "Отклонена", completed: "Завершена" };

export default function Admin() {
    const [authenticated, setAuthenticated] = useState(null);
    const [revision, setRevision] = useState(0);
    const [rows, setRows] = useState([]);
    const [current, setCurrent] = useState(null);
    const [q, setQuery] = useState("");
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (authenticated === false) return;
        const controller = new AbortController();
        const query = new URLSearchParams({ q, status });
        let timer;

        async function loadRequests() {
            try {
                const requests = await api("/requests?" + query, { signal: controller.signal });
                if (controller.signal.aborted) return;
                setRows(requests);
                setAuthenticated(true);
            } catch (error) {
                if (controller.signal.aborted) return;
                if (error.status === 401) {
                    setAuthenticated(false);
                    setRows([]);
                    setCurrent(null);
                    if (authenticated) setMessage("Сеанс завершён. Войдите снова.");
                    return;
                }
                setMessage(error.message);
            }
            timer = setTimeout(loadRequests, 3000);
        }

        loadRequests();
        return () => {
            controller.abort();
            clearTimeout(timer);
        };
    }, [authenticated, q, status, revision]);

    async function run(action) {
        setMessage("");
        try {
            await action();
        } catch (error) {
            if (error.status === 401 && authenticated) {
                setAuthenticated(false);
                setRows([]);
                setCurrent(null);
            }
            setMessage(error.message);
        }
    }
    async function login(event) {
        event.preventDefault();
        const password = new FormData(event.currentTarget).get("password");
        await run(async () => {
            await api("/login", { method: "POST", body: { password } });
            setAuthenticated(true);
        });
    }
    async function logout() {
        await run(async () => {
            await api("/logout", { method: "POST" });
            setAuthenticated(false);
            setRows([]);
            setCurrent(null);
            setQuery("");
            setStatus("");
        });
    }

    return <main className="container management">
        <a href="/">Вернуться в магазин</a>
        <h1>Заявки покупателей</h1>
        {authenticated === null ? <p role="status">Проверяем вход…</p> : !authenticated ? <form className="form" onSubmit={login}>
            <label>Пароль администратора <input className="form__input" type="password" name="password" required /></label>
            <button className="button button--primary">Войти</button>
        </form> : <>
            <button className="button button--outline-accent" onClick={logout}>Выйти</button>
            <div className="filters">
                <input className="form__input" aria-label="Поиск заявок" placeholder="Имя, почта или тема" value={q} onChange={e => setQuery(e.target.value)} />
                <select className="form__input" aria-label="Статус заявки" value={status} onChange={e => setStatus(e.target.value)}>
                    <option value="">Все статусы</option>{Object.entries(statuses).map(([id, label]) => <option key={id} value={id}>{label}</option>)}
                </select>
            </div>
            {rows.length ? <ul className="management__list">{rows.map(row => <li key={row.id}>
                <button className="more" onClick={() => run(async () => setCurrent(await api("/requests/" + row.id)))}>
                    №{row.id} · {row.name} · {row.topic} · {statuses[row.status]}
                </button>
            </li>)}</ul> : <p>Заявки не найдены.</p>}
            {current && <form key={current.id} className="form" onSubmit={event => {
                event.preventDefault();
                run(async () => {
                    const result = await api("/requests/" + current.id, { method: "PUT", body: current });
                    setRevision(value => value + 1);
                    setMessage(result.message);
                });
            }}>
                <h2>Заявка №{current.id}</h2>
                {Object.entries({ name: "Имя", email: "Почта", phone: "Телефон", topic: "Тема", message: "Сообщение", status: "Статус", admin_comment: "Комментарий или причина отказа" }).map(([key, label]) => {
                    const props = { className: "form__input", value: current[key] ?? "", onChange: e => setCurrent(old => ({ ...old, [key]: key === "phone" ? mask(e.target.value) : e.target.value })) };
                    return <label key={key}>{label}
                        {key === "topic" ? <select {...props}>{topics.map(t => <option key={t}>{t}</option>)}</select>
                            : key === "status" ? <select {...props} aria-label="Статус">{Object.entries(statuses).map(([id, name]) => <option key={id} value={id}>{name}</option>)}</select>
                            : ["message", "admin_comment"].includes(key) ? <textarea {...props} maxLength="1000" />
                            : <input {...props} />}
                    </label>;
                })}
                <button className="button button--primary">Сохранить</button>
                <button className="button button--outline-accent" type="button" onClick={() => {
                    if (window.confirm("Удалить заявку №" + current.id + "?")) run(async () => {
                        await api("/requests/" + current.id, { method: "DELETE" });
                        setCurrent(null);
                        setRevision(value => value + 1);
                    });
                }}>Удалить</button>
            </form>}
        </>}
        {message && <p role="status">{message}</p>}
    </main>;
}
