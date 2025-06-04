export const getCachedUser = (userName) => {
    return JSON.parse(localStorage.getItem(`gh-user-${userName}`));
}

export const setCachedUser = (userName, data) => {
    localStorage.setItem(`gh-user-${userName}`, JSON.stringify(data));
}