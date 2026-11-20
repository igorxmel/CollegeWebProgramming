function Benefit({ number, title, text }) {
    return (
        <li className="benefit">
            <span className="benefit__number">{number}</span>
            <div className="benefit__body">
                <h3 className="benefit__title">{title}</h3>
                <p className="benefit__text">{text}</p>
            </div>
        </li>
    );
}

export default Benefit;
