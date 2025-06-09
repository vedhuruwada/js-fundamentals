const feed = document.getElementById("feed");
const loading = document.getElementById("loading");

let offset = 0;
const limit = 10;
let loadingInProgress = false;

// Fetch paginated posts
const getPosts = async (offset, limit = 10) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${offset}&_limit=${limit}`);
    const posts = await res.json();
    return posts;
}

// Render posts
const renderPosts = (posts) => {
    const frag = document.createDocumentFragment();
    posts.forEach((post) => {
        const postDiv = createPostCard(post, theme="light");
        frag.appendChild(postDiv);
    });
    feed.appendChild(frag);
}

// create Post card
const createPostCard = (post) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <small> Post ID: ${post.id} </small>
    `;
    return card;
}

// Load More Posts
const loadMorePosts = async () => {
    if (loadingInProgress) return;
    loadingInProgress = true;
    loading.style.display = "block";

    const newPosts = await getPosts(offset, limit);
    if (newPosts.length === 0) {
        loading.textContent = "No more posts available.";
    } else {
        renderPosts(newPosts);
        offset += newPosts.length;
        loading.style.display = newPosts.length < limit ? "block" : "none";
    }
    loadingInProgress = false;
}

window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
        loadMorePosts();
    }
});

loadMorePosts();

// Add a form to create and render new posts on top
const form = document.getElementById("postForm");
const postMap = new Map();
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = e.target.title.value.trim();
    const body = e.target.body.value.trim();

    if (!title || !body) return alert("all fields required");
    const newPost = {
        id: Date.now(),
        title,
        body
    }
    postMap.set(newPost.id, newPost);
    feed.prepend(createPostCard(newPost));
    form.reset();
});

const toggleBtn = document.getElementById("toggleTheme");
toggleBtn.addEventListener('click', () => {
    const root = document.documentElement;
    const isDark = root.getAttribute("data-theme") === "dark";
    root.setAttribute("data-theme", isDark ? "light" : "dark");
});
