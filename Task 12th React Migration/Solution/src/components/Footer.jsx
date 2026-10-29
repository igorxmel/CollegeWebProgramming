import Logo from "./Logo";

function Footer() {
    return (
        <footer className="footer">
            <div className="container footer__inner">

                <div className="footer__column footer__column--about">
                    <Logo light />
                    <p className="footer__text">
                        Кроссовки для каждого шага. Найди идеальную пару для спорта, стиля и комфорта.
                    </p>
                    <ul className="socials">
                        <li className="socials__item">
                            <a className="socials__link" href="#top" aria-label="Instagram">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <rect x="3" y="3" width="18" height="18" rx="5" />
                                    <circle cx="12" cy="12" r="4" />
                                    <circle cx="17.5" cy="6.5" r="1" />
                                </svg>
                            </a>
                        </li>
                        <li className="socials__item">
                            <a className="socials__link" href="#top" aria-label="Telegram">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                                    <path d="M21 4 3 11l6 2 2 6 4-5 4 4z" />
                                </svg>
                            </a>
                        </li>
                        <li className="socials__item">
                            <a className="socials__link" href="#top" aria-label="ВКонтакте">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                                    <path d="M3 8h3c.4 3 1.9 5.4 3.5 6.3V8h3v4.5c1.4-.3 2.9-2 3.4-4.5H21c-.6 2.6-2 4.6-3.4 5.6 1.6 1 3 2.6 3.4 4.4h-3.1c-.5-1.6-1.8-2.9-3.4-3.2V18h-2.8C7.6 18 4.2 14.2 3 8z" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="footer__column">
                    <h3 className="footer__heading">Навигация</h3>
                    <ul className="footer__list">
                        <li className="footer__list-item"><a className="footer__link" href="#catalog">Каталог</a></li>
                        <li className="footer__list-item"><a className="footer__link" href="#brand">О бренде</a></li>
                        <li className="footer__list-item"><a className="footer__link" href="#reviews">Отзывы</a></li>
                        <li className="footer__list-item"><a className="footer__link" href="#contacts">Контакты</a></li>
                    </ul>
                </div>

                <div className="footer__column">
                    <h3 className="footer__heading">Контакты</h3>
                    <p className="footer__text">
                        Email: <a className="footer__link footer__link--plain" href="mailto:info@dreamsneakers.ru">info@dreamsneakers.ru</a><br />
                        Телефон: <a className="footer__link footer__link--plain" href="tel:+79118057418">+7 (911) 805-74-18</a>
                    </p>
                    <a className="button button--outline-accent" href="#contacts">Написать нам</a>
                </div>

            </div>

            <div className="footer__bottom">
                <p className="footer__copyright">&copy; 2025 Dream Sneakers. Все права защищены.</p>
            </div>
        </footer>
    );
}

export default Footer;
