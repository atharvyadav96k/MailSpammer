import {showCustomToast} from "../app.js"

const updating = (status)=>{
    const updated = document.getElementById("updated");
    const uploading = document.getElementById("uploading");
    if(status){
        updated.style.display = "none";
        uploading.style.display = "inline";
        return;
    }
    updated.style.display = "inline";
    uploading.style.display = "none";
}
export const updateToCloud = (code, ids, version)=>{
    const form = {
        code,
        ids,
        version
    }
    updating(true);
    const formId = new URLSearchParams(window.location.search).get("form");
    fetch(`https://api.fluxmailer.sbs/forms/update/${formId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: JSON.stringify(form),
            version: version
        })
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        updating(false);
    })
    .catch((err) => {
        updating(false);
        console.log(err);
        showCustomToast({message: "Unable to save your changes to cloud", type: "danger", duration: 2000});
        showCustomToast({message: "We will save these changes locally😁😁😁", type: "info", duration: 3000});
        console.log(err);
    });
}