const API_URL = "https://rickandmortyapi.com/api/character";

const container = document.querySelector(".characters-container");

function formatDate(isoString) {
    return new Date(isoString).toLocaleDateString("ru-RU");
}

function createCharacterCard(character) {
    return `
        <div class="character-card">
            <img
                src="${character.image}"
                alt="${character.name}"
            >
            <h3>${character.name}</h3>
            <p class="status status-${character.status.toLowerCase()}">${character.status}</p>
            <p>Вид: ${character.species}</p>
            <p>Пол: ${character.gender}</p>
            <p>Происхождение: ${character.origin.name}</p>
            <p>Локация: ${character.location.name}</p>
            <p>Эпизодов: ${character.episode.length}</p>
            <p>Создан в базе: ${formatDate(character.created)}</p>
        </div>
    `;
}

async function getCharacters() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Ошибка сервера");
        }

        const data = await response.json();
        const characters = data.results;

        container.innerHTML = characters.map(createCharacterCard).join("");
    } catch (error) {
        console.log("Ошибка:", error);
        container.innerHTML = `
            <p class="error">Не удалось загрузить данные</p>
        `;
    }
}

getCharacters();
