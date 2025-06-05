import { searchUsers, getUserDetails } from "./api";
import { createUserCard, renderSkeletons, renderUserModal } from "./dom";
import { getCachedUser, setCachedUser } from "./cache";
import { handleRouting } from "./router";

const input = document.getElementById("searchInput");
const results = document.getElementById("results");
const modal = document.getElementById("userModal");

let currentPage = 1, query="", isLoading = false;

input.addEventListener("input", () => {
    query = input.value.trim();
    currentPage = 1;
    results.innerHTML = "";
    if (query.length < 2) return;
    fetchUsers();
});

let debounceTimer;
const fetchUsers = async () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        fetchAndRenderUsers();
    }, 400)
};

const fetchAndRenderUsers = async () => {
    if (isLoading) return;
    isLoading = true;
    renderSkeletons(results);

    try {
        const data = await searchUsers(query, currentPage);
        results.innerHTML = "";
        data.items?.forEach((user) => results.appendChild(createUserCard(user)));

    } catch (e) {
        results.innerHTML = `<p class="error"> Error: ${e.message} </p>`;
    } finally {
        isLoading = false;
    }
};

export const showUserModal = async (userName) => {
    modal.classList.remove("hidden");
    modal.innerHTML = `<p> Loading... </p>`;

    let user = getCachedUser(userName);
    if (!user) {
        try {
            user = await getUserDetails(userName);
            setCachedUser(userName, user);
        } catch(e) {
            modal.innerHTML = `<p> Error loading user </p>`;
            return;
        }
    }

    modal.innerHTML = renderUserModal(user);

    document.getElementById("closeModal").onclick = () => {
        modal.classList.add("hidden");
        history.pushState(null, "", "/");
    };
};

window.addEventListener("hashchange", handleRouting);
handleRouting();

// Infinite Scroll
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isLoading) {
        currentPage++;
        fetchAndRenderUsers();
    }
})