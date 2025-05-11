import { getCookies } from "../authCookies/cookies.js";
import { getUrl } from "../production/isProduction.js";


document.addEventListener('DOMContentLoaded', ()=>{
    const urlParams = new URLSearchParams(window.location.search);
    let id;
        try{
            id = urlParams.get("id");
        }catch(err){
            window.location.href = "/dashboard";
        }
    if(!id){
        window.location.href = "/dashboard";
    }
    const form = document.getElementById("sendMail");
    console.log("Hello")
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        const email = e.target.mail.value;
        const subject = e.target.subject.value;
        console.log(email)
        fetch(`${getUrl()}/mails/send-mail`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                cookies: getCookies(),
                subject: subject ? subject : "",
                to: email,
                templateId: id
            })
        }).then(response=>response.json())
        .then((data)=>{
            alert("Sent");
        }).catch((err)=>{
            console.log(err);
            alert("Failed")
        })
    })
})