import { showUserModal } from './main.js';

export const handleRouting = () => {
    const hash = location.hash;

    if (hash.startsWith("#/user/")) {
        const userName = hash.split("/")[2];
        showUserModal(userName);
    }
}