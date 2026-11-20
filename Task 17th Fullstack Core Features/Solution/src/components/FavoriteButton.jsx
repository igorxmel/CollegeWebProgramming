import { useState } from "react";

function FavoriteButton() {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <button
            className={isFavorite ? "favorite favorite--active" : "favorite"}
            type="button"
            onClick={() => setIsFavorite(!isFavorite)}
        >
            {isFavorite ? "В избранном" : "В избранное"}
        </button>
    );
}

export default FavoriteButton;
