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
        const postDiv = document.createElement("div");
        postDiv.className = "post";
        postDiv.innerHTML = `<h4>${post.title}</h4>
            <p>${post.body}</p>    
        `;
        frag.appendChild(postDiv);
    });
    feed.appendChild(frag);
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
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        loadMorePosts();
    }
});

loadMorePosts();
