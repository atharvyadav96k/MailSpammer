import { getUrl } from "../production/isProduction.js";
import {form} from "./mapData.js";
import {getCookies} from "../authCookies/cookies.js"

const canvas = document.getElementById('canvas');


function getForms() {
    console.log("Hello");
    
    const params = new URLSearchParams({ cookies: getCookies() });

    fetch(`${getUrl()}/forms/get-all`, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            cookies: getCookies()
        })
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data.data);
        renderData(data.data);
    })
    .catch((err) => {
        console.log(err);
    });
}


function renderData(data){
    data.map((ele)=>{
        canvas.innerHTML += form({formName: ele.formName, formId: ele._id});
    })
}


getForms();
