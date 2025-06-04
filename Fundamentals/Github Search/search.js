let currentPage = 1;
let currentQuery = "";

const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");
const loadMoreBtn = document.getElementById("loadMore");

let debounceTimer;
searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        currentPage = 1;
        currentQuery = searchInput.value.trim();
        resultsDiv.innerHTML = "";
        if (currentQuery) fetchUsers();
    }, 500)
});

loadMoreBtn.addEventListener('click', () => {
    currentPage++;
    fetchUsers(true);
});

async function fetchUsers(append = false) {
    try {
        const res = await fetch(`https://api.github.com/search/users?q=${encodeURIComponent(currentQuery)}&page=${currentPage}&per_page=10`);
        const data = await res.json();
        if (!append) resultsDiv.innerHTML = "";
        data.items?.forEach((user) => {
            const userDiv = document.createElement('div');
            userDiv.innerHTML = `
                <img src=${user.avatar_url} width="50" height="50" />
                <a href=${user.html_url} target="_blank">${user.login} </a>
            `
            resultsDiv.appendChild(userDiv);
        });
    } catch (e) {
        resultsDiv.innerHTML = `<div style={{"color": "red"}}>${e.message}</div>`
    }
}