export async function api(path, { token, body, method = "GET" } = {}) {
    const headers = {};
    if (token) headers.Authorization = "Bearer " + token;
    if (body !== undefined) headers["Content-Type"] = "application/json";
    const response = await fetch("/api" + path, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) });
    if (response.status === 204) return;
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Запрос не выполнен.");
    return data;
}
