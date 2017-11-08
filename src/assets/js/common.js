export const setItem = (name,item) =>{
    window.sessionStorage.setItem(name, item);
}

export const getItem = (name) => {
    return window.sessionStorage.getItem(name);
}
