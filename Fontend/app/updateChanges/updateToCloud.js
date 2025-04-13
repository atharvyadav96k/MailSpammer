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
    fetch("http://localhost:4000/forms/update/67fa6dcc70a418cccd16b10a", {
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