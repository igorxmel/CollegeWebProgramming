function ContactForm() {
    return (
        <div className="form-card contacts__form-card">
            <h3 className="form-card__title">Оставьте заявку</h3>
            <p className="form-card__subtitle">Свяжемся с вами в течение 15 минут</p>

            <form className="form" action="#" method="post">
                <div className="form__field">
                    <label className="form__label" htmlFor="name">Ваше имя</label>
                    <input className="form__input" id="name" name="name" type="text" placeholder="Ваше имя *" required />
                </div>

                <div className="form__field">
                    <label className="form__label" htmlFor="phone">Телефон</label>
                    <input className="form__input" id="phone" name="phone" type="tel" placeholder="Телефон *" required />
                </div>

                <div className="form__field">
                    <label className="form__label" htmlFor="email">Email</label>
                    <input className="form__input" id="email" name="email" type="email" placeholder="Email *" required />
                </div>

                <div className="form__field">
                    <label className="form__label" htmlFor="message">Сообщение</label>
                    <textarea className="form__input form__input--textarea" id="message" name="message" rows="4" placeholder="Ваше сообщение..."></textarea>
                </div>

                <label className="form__agreement">
                    <input className="form__checkbox" type="checkbox" name="agreement" required />
                    <span className="form__agreement-text">
                        Согласен с <a className="form__agreement-link" href="#contacts">политикой конфиденциальности</a>
                    </span>
                </label>

                <button className="button button--primary form__submit" type="submit">Отправить заявку</button>
            </form>
        </div>
    );
}

export default ContactForm;
