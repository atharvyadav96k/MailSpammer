import {getCookies} from "../authCookies/cookies.js";
import {getUrl} from "../production/isProduction.js";

fetch(`${getUrl()}/auth/isLoggedIn`, {
    method: 'POST',
    headers : {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        cookies: getCookies()
    })
})
.then((response)=>{
    if(response.status != 200){
        window.location.href = "/auth/signin.html";
    }
    return response.json();
})
.then((data)=>{
    console.log("Logged");
})
.catch((err)=>{
    window.location.href = "/auth/signin.html"
})