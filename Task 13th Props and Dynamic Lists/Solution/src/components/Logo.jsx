function Logo({ light = false }) {
    return (
        <a className={light ? "logo logo--light" : "logo header__logo"} href="#top">
            <svg className="logo__mark" width="26" height="22" viewBox="0 0 26 22" aria-hidden="true">
                <path d="M1 11 L25 1 L13 21 L10 13 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </svg>
            <span className="logo__text">
                <span className="logo__name">Dream</span>
                <span className="logo__caption">Sneakers</span>
            </span>
        </a>
    );
}

export default Logo;
