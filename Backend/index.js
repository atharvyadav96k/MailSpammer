const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./connection/dataBase');
const bodyParser = require('body-parser');

require('dotenv').config();
connectDB();

const formRouter = require('./router/forms');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/forms', formRouter);

app.get('/', (req, res)=>{
    res.send("App is running");
});


app.listen(process.env.PORT, 'localhost', ()=>{
    console.log(`App is running on PORT: ${process.env.PORT}`);
});