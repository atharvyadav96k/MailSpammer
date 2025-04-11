const express = require('express');
const app = express();
require('dotenv').config();

app.get('/', (req, res)=>{
    res.send("App is running");
});


app.listen(process.env.PORT, 'localhost', ()=>{
    console.log(`App is running on PORT: ${process.env.PORT}`);
});