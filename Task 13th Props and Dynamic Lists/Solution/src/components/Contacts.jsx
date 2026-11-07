import ContactItem from "./ContactItem";
import ContactForm from "./ContactForm";

function Contacts() {
    return (
        <section className="contacts" id="contacts">
            <div className="container contacts__inner">

                <div className="contacts__info">
                    <h2 className="contacts__title">Свяжитесь с нами</h2>
                    <p className="contacts__text">
                        Поможем подобрать размер, расскажем про наличие и посчитаем доставку.
                        Пишите или звоните, отвечаем в рабочие часы.
                    </p>

                    <ul className="contacts__list">
                        <ContactItem
                            label="Телефон"
                            icon={<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />}
                        >
                            <a className="contact-item__value" href="tel:+79118057418">+7 (911) 805-74-18</a>
                        </ContactItem>

                        <ContactItem
                            label="Email"
                            icon={
                                <>
                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                    <path d="m2 7 10 6 10-6" />
                                </>
                            }
                        >
                            <a className="contact-item__value" href="mailto:info@dreamsneakers.ru">info@dreamsneakers.ru</a>
                        </ContactItem>

                        <ContactItem
                            label="Часы работы"
                            accent
                            icon={
                                <>
                                    <circle cx="12" cy="12" r="9" />
                                    <path d="M12 7v5l3 2" />
                                </>
                            }
                        >
                            <span className="contact-item__value">Пн-Пт: 9:00 - 20:00</span>
                        </ContactItem>
                    </ul>
                </div>

                <ContactForm />

            </div>
        </section>
    );
}

export default Contacts;
