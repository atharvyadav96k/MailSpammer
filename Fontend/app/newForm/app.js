import { getCookies } from "../authCookies/cookies.js";
import { getUrl } from "../production/isProduction.js";

const form = document.getElementById("newForm");

document.addEventListener('DOMContentLoaded', ()=>{
    form.addEventListener('submit', (event)=>{
        event.preventDefault();
        console.log(getCookies())
        console.log(event.target.name.value);
        fetch(`${getUrl()}/forms/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: event.target.name.value,
                cookies: getCookies()
            })
        })
        .then((data)=>{
            if(data.status == 409){
                window.location.href = "/auth/signin.html"
            }
            return data.json();
        })
        .then((data)=>{
            console.log(data);
            window.location.href = "/dashboard"
        })
        .catch((err)=>{
            alert(err.message);
        })
    })
})