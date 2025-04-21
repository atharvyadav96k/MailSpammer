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
    canvas.innerHTML = ''; // Clear old content
    data.map((ele) => {
        let htmlCode = "";

        try {
            const parsed = typeof ele.data === 'string' ? JSON.parse(ele.data) : ele.data;
            htmlCode = parsed.code || "<p>No preview available</p>";
        } catch (err) {
            console.error("Failed to parse form data:", err);
            htmlCode = "<p>Preview not available</p>";
        }

        canvas.innerHTML += form({
            formName: ele.formName,
            formId: ele._id,
            formHtml: htmlCode
        });
    });
}



getForms();
