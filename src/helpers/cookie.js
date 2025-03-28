export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function setCookie(name, value, minutes) {
    const date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000); 
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}


export function deleteAllCookies() {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
        const cookieName = cookie.split("=")[0].trim();
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
}
