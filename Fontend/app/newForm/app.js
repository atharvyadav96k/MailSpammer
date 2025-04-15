const form = document.getElementById("newForm");

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    fetch('http://localhost:4000/forms/create', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: event.target.name.value
        })
    })
    .then((data)=>{
        console.log(data);
        window.location.href = "/dashboard/index.html"
    })
    .catch((err)=>{
        alert(err.message);
    })
})