export async function api(path, { body, method = "GET", signal } = {}) {
    const headers = {};
    if (body !== undefined) headers["Content-Type"] = "application/json";
    const response = await fetch("/api" + path, { method, headers, signal, body: body === undefined ? undefined : JSON.stringify(body) });
    if (response.status === 204) return;
    const data = await response.json();
    if (!response.ok) {
        const error = new Error(data.message || "Запрос не выполнен.");
        error.status = response.status;
        throw error;
    }
    return data;
}
