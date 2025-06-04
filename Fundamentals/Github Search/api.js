const BASE_URL = "https://api.github.com";

export const searchUsers = async (query, page = 1) => {
    const res = await fetch(`${BASE_URL}/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=10`);
    if (!res) throw new Error("Failed to fetch users");
    const data = await res.json();
    return data;
}

export const getUserList = async (userName) => {
    const res = await fetch(`${BASE_URL}/users/${userName}`);
    if (!res) throw new Error("Failed to fetch user list");
    return await res.json();
}