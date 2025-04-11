
export const storeForm = (htmlCode, ids)=>{
    const form = {
        code : htmlCode,
        ids : ids
    };
    const dataString = JSON.stringify(form);
    localStorage.setItem("form", dataString);
}

export const getStoredForm = ()=>{
    const dataString = localStorage.getItem("form");
    const form = JSON.parse(dataString);
    console.log(form);
    return form;
}