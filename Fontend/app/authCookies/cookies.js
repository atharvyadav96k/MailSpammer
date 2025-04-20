export const storeCookies = (cookies)=>{
    localStorage.setItem("cookies", cookies);
}
export const getCookies = ()=>{
    return localStorage.getItem("cookies");
}