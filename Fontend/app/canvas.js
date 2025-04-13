import { getId } from "./globalFunction.js";
import { GlobalSelectedItem } from "./selectedItem.js";
export const canvas = document.getElementById("mailScreen");

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy: ", err);
    });
}
document.getElementById("saveButton").addEventListener('click', () => {
    const elements = canvas.querySelectorAll("*");
    GlobalSelectedItem.item.style.border = "none";
    let txt = `
    <html>
    <head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Poppins', sans-serif;
        }
.primary{
    background-color: #0d6df9;
    color: white;
}
.secondary{
    background-color: #6c757d;
    color: #ffffff;
}
.success{
    background-color: #198754;
    color: white;
}
.danger{
    background-color: #dc3545;
    color: white;
}
.warning{
    background-color: #d4a20e;
    color: black;
}
.info{
    background-color: #0dcaf0;
    color: black;
}
.light{
    background-color: white;
    color: black;
}
.dark{
    background-color: #212529;
    color: black;
}
.dark:hover{
    background-color: #bcbcbc;
    color: white;
}
        </style>
        </head>
        <body>
            ${canvas.innerHTML}
    </body>
    </html>`;
    copyToClipboard(txt);
    GlobalSelectedItem.item.style.border = "1px dashed rgba(0, 0, 0, 0.3)";
});

export function canvasState(){
    GlobalSelectedItem.item.style.border = "none";
    const data = canvas.innerHTML;
    GlobalSelectedItem.item.style.border = "1px dashed rgba(0, 0, 0, 0.3)";
    return data;
}
