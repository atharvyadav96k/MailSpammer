import { getUrl } from "../production/isProduction.js";

const form = document.getElementById('signup');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    fetch(`${getUrl()}/auth/signup`, {
        method: 'POST',
        body: JSON.stringify({
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => response.json())
    .then((data) => {
        console.log(data);
        if(data.success){
            window.location.href = "/auth/signin.html";
        }else{
            alert(data.message);
        }
    })
    .catch((err) => {
        console.log(err)
    })
});