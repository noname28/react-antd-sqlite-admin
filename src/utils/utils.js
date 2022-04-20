
const TOKEN_KEY = 'user';

export const Loginls = (wuser) => {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(wuser));
}

export const logoutls = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const isLoginls = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }

    return false;
}