function ContactItem({ icon, label, children, accent = false }) {
    return (
        <li className={accent ? "contact-item contact-item--accent" : "contact-item"}>
            <span className="contact-item__icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {icon}
                </svg>
            </span>
            <span className="contact-item__body">
                <span className="contact-item__label">{label}</span>
                {children}
            </span>
        </li>
    );
}

export default ContactItem;
