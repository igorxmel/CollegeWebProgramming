function ReviewCard({ rating, text, initials, name, role }) {
    const stars = "★".repeat(rating) + "☆".repeat(5 - rating);

    return (
        <article className="review-card">
            <p className="review-card__rating" aria-label={`Оценка ${rating} из 5`}>{stars}</p>
            <blockquote className="review-card__text">{text}</blockquote>
            <footer className="review-card__author">
                <span className="review-card__avatar" aria-hidden="true">{initials}</span>
                <span className="review-card__info">
                    <span className="review-card__name">{name}</span>
                    <span className="review-card__role">{role}</span>
                </span>
            </footer>
        </article>
    );
}

export default ReviewCard;
