const messageBox = document.getElementById("message");
const usersList = document.getElementById("users");
const tokenOutput = document.getElementById("token");

const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const refreshButton = document.getElementById("refresh");

function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = "message " + type;
}

async function request(url, options) {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Ошибка запроса");
    }

    return data;
}

function createUserItem(user) {
    const item = document.createElement("li");

    const info = document.createElement("div");
    info.className = "user-info";

    const name = document.createElement("strong");
    name.textContent = user.name;

    const email = document.createElement("span");
    email.textContent = user.email;

    info.append(name, email);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "delete";
    button.textContent = "Удалить";
    button.addEventListener("click", () => deleteUser(user.id));

    item.append(info, button);

    return item;
}

async function loadUsers() {
    try {
        const users = await request("/users");
        usersList.replaceChildren();

        if (users.length === 0) {
            const empty = document.createElement("li");
            empty.className = "empty";
            empty.textContent = "Пользователей пока нет";
            usersList.append(empty);
            return;
        }

        for (const user of users) {
            usersList.append(createUserItem(user));
        }
    } catch (error) {
        showMessage(error.message, "error");
    }
}

async function deleteUser(id) {
    try {
        const result = await request(`/users/${id}`, { method: "DELETE" });
        showMessage(result.message, "success");
        await loadUsers();
    } catch (error) {
        showMessage(error.message, "error");
    }
}

registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(registerForm));
    data.consent = registerForm.elements.consent.checked;

    try {
        const result = await request("/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        showMessage(result.message, "success");
        registerForm.reset();
        await loadUsers();
    } catch (error) {
        showMessage(error.message, "error");
    }
});

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(loginForm));

    try {
        const result = await request("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        showMessage(result.message, "success");
        tokenOutput.hidden = false;
        tokenOutput.textContent = "JWT: " + result.token;
        loginForm.reset();
    } catch (error) {
        showMessage(error.message, "error");
    }
});

refreshButton.addEventListener("click", loadUsers);

loadUsers();
