const express = require('express');
const app = express();

const cookieParser = require('cookie-parser')
const bodyparser = require('body-parser')
const errorMiddleware = require('./middlewares/errors')
const fileUpload = require('express-fileupload')

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(fileUpload());

const dotenv = require('dotenv');
dotenv.config({path: `backend/config/config.env`})

// Import all routes
const rolls = require('./routes/roll');
const auth = require('./routes/auth');
const payment = require('./routes/payment')
const order = require('./routes/order');


app.use('/api/v1', rolls)
app.use('/api/v1', auth)
app.use('/api/v1', payment)
app.use('/api/v1', order)
//Middleware to handle errors
app.use(errorMiddleware);

module.exports = app