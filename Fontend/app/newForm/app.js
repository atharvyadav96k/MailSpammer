const form = document.getElementById("newForm");

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    fetch('https://api.fluxmailer.sbs/forms/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: event.target.name.value
        })
    })
    .then((data)=>{
        console.log(data);
        window.location.href = "/Fontend/dashboard/index.html"
    })
    .catch((err)=>{
        alert(err.message);
    })
})