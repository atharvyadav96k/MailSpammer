import { getUrl } from "../production/isProduction.js";
import { storeCookies } from "../authCookies/cookies.js";
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // prevent default form submission

        const formData = new FormData(form);
        const data = new URLSearchParams(formData);

        fetch(`${getUrl()}/auth/signin`, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            if (response.ok) {
                return response.json(); 
            } else {
                throw new Error(`Error: ${response.statusText}`);
            }
        }).then((responseData) => {
            if(responseData.success){
                storeCookies(responseData.cookie);
                window.location.href = "/dashboard/index.html";
            }else{
                alert(responseData.message);
            }
        }).catch((err) => {
            alert(err.message);
            console.log('Request failed:', err.message);
        });
    });
});