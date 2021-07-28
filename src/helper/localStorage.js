
export const getFromLocalStorage = (key) => {
    const ls = localStorage.getItem(key);
    return JSON.parse(ls);
}

export const setInLocalStorage = (key, data) => {
    const dParsed = JSON.stringify(data);
    localStorage.setItem(key, dParsed);
}

export const removeFromLocalStorage = (key) => {
    localStorage.removeItem(key);
}

export const clearLocalStorage = () => {
    localStorage.clear();
}
