
export const storeForm = (htmlCode, ids, version)=>{
    const form = {
        code : htmlCode,
        ids : ids,
        version: version
    };
    const dataString = JSON.stringify(form);
    localStorage.setItem("form", dataString);
}

export const getStoredForm = ()=>{
    const dataString = localStorage.getItem("form");
    const form = JSON.parse(dataString);
    return form;
}