const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./connection/dataBase');
const authRouter = require('./router/authRouter');
const formRouter = require('./router/forms');
const mailRouter = require('./router/mailRouter');
const bodyParser = require('body-parser');

require('dotenv').config();
connectDB();


let corsOptions = {
    origin : false ? ["https://www.fluxmailer.sbs", "https://fluxmailer.sbs"] : ['http://localhost:5500', 'http://127.0.0.1:5500', "http://127.0.0.1:50801"],
    methods: 'GET,POST',
    allowedHeaders: "*"
}    

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/auth', authRouter);
app.use('/forms', formRouter);
app.use('/mails', mailRouter);

app.get('/', (req, res) => {
    res.send("App is running");
});

app.listen(process.env.PORT, () => {
    console.log(`App is running on PORT: ${process.env.PORT}`);
});