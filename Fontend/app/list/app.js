import {form} from "./mapData.js";

const canvas = document.getElementById('canvas');


function getForms(){
    console.log("Hello")
    fetch("http://localhost:4000/forms/get-all", {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': "application/json"
        },
    })
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data.data);
        renderData(data.data)
    })
    .catch((err)=>{
        console.log(err);
    })
}

function renderData(data){
    data.map((ele)=>{
        canvas.innerHTML += form({formName: ele.formName, formId: ele._id});
    })
}


getForms();
