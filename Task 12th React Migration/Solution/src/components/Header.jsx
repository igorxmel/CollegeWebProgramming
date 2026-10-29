import Logo from "./Logo";

function Header() {
    return (
        <header className="header" id="top">
            <div className="container header__inner">
                <Logo />

                <nav className="nav header__nav" aria-label="Основная навигация">
                    <ul className="nav__list">
                        <li className="nav__item"><a className="nav__link" href="#catalog">Каталог</a></li>
                        <li className="nav__item"><a className="nav__link" href="#brand">О бренде</a></li>
                        <li className="nav__item"><a className="nav__link" href="#reviews">Отзывы</a></li>
                        <li className="nav__item"><a className="nav__link" href="#contacts">Связаться с нами</a></li>
                    </ul>
                </nav>

                <a className="button button--ghost header__login" href="#contacts">Войти</a>
            </div>
        </header>
    );
}

export default Header;
