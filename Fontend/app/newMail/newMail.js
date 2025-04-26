import { getCookies } from "../authCookies/cookies.js";
import { getUrl } from "../production/isProduction.js";

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('newMail').addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(e.target.mail.value, e.target.password.value, getUrl());
        fetch(`${getUrl()}/mails/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cookies: getCookies(),
                mail: e.target.mail.value,
                password: e.target.password.value
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.success) {
                    window.location.reload();
                }
                alert("Unable to add mail");
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
    });
    const mails = document.getElementById('mails');
    fetch(`${getUrl()}/mails/get-mails`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cookies: getCookies()
        })
    })
        .then((response) => response.json())
        .then((data) => {
            data.data.map((ele) => {
                mails.innerHTML += `<li class="list-group-item" style="display:flex; justify-content: space-between;"><span>${ele.email}</span><i style="cursor: pointer; color:rgb(195, 74, 56);" class="bi bi-trash3"></i></li>`
            });
            deleteMail();
        }).catch((err) => {
            console.log(err.message);
        })
    function deleteMail() {
        mails.querySelectorAll('li').forEach((ele) => {
            const mail = ele.querySelector('span').innerText;
            ele.querySelector('i').addEventListener('click', (e) => {
                fetch(`${getUrl()}/mails/delete`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cookies: getCookies(),
                        mail: mail
                    })
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.data.success) {
                            // window.location.reload();
                        }
                    })
                    .catch((err) => {
                        alert("Unable to delete " + mail)
                    })
            });
        });
    }
});