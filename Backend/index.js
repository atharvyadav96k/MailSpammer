const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./connection/dataBase');
const authRouter = require('./router/authRouter');
const bodyParser = require('body-parser');

require('dotenv').config();
connectDB();

const formRouter = require('./router/forms');

app.use(cors({
    origin: "https://www.fluxmailer.sbs",
    credentials: true,
    sameSite: 'None'
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/auth', authRouter);
app.use('/forms', formRouter);

app.get('/', (req, res) => {
    res.send("App is running");
});

app.listen(process.env.PORT, () => {
    console.log(`App is running on PORT: ${process.env.PORT}`);
});