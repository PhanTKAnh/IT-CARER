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

    // // Kiểm tra nếu tên cookie là 'tokenCompany'
    // if (name === "tokenCompany" || name === "refreshTokenCompany"){
    //     document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/nha-tuyen-dung/;`;
    // } else {
        document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/;`;
    // }
}
export function deleteCookieByName(name) {
    document.cookie = `${name}=; path=/; max-age=0`;
    // document.cookie = `${name}=; path=/nha-tuyen-dung/; max-age=0`;
  }
   