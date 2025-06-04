export const createUserCard = (user) => {
    const userDiv = document.createElement('div');
    userDiv.className = 'user-card';
    userDiv.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}'s avatar" />
        <a href="#/user/${user.login}">${user.login}</a>
    `
    return userDiv;
};

export const renderSkeletons = (container, count=5) => {
    container.innerHTML = "";
    for (let i=0; i<count; i++) {
        const skeleton = document.createElement("div");
        skeleton.className = "skeleton";
        container.appendChild(skeleton);
    }
};

export const renderUserModal = (user) => {
    return `
        <div class="modal-content">
            <span class="close" id="closeModal">&times;</span>
            <img src="${user.avatar_url}" width="100" />
            <h2>${user.name || user.login}</h2>
            <p> ${user.bio || "No bio available"} </p>
            <p> Followers ${user.followers} & Following ${user.following}</p>
        </div>
    `;
};