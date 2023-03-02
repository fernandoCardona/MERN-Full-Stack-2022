const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { API_VERSION } = require('./constants');

const app = express();

//IMPORT ROUTING:
const authRouter = require('./router/auth');
const userRouter = require('./router/user');
const menuRouter = require('./router/menu');
const courseRouter = require('./router/course');
const postRouter = require('./router/post');
const newsletterRouter = require('./router/newsletter');

//Configure body Parse:
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Configures Static Folder:
app.use(express.static('uploads'));

//Configure Header HTTP - Cors:
app.use(cors());

//Configure ROUTING:
app.use(`/api/${API_VERSION}`, authRouter);
app.use(`/api/${API_VERSION}`, userRouter);
app.use(`/api/${API_VERSION}`, menuRouter);
app.use(`/api/${API_VERSION}`, courseRouter);
app.use(`/api/${API_VERSION}`, postRouter);
app.use(`/api/${API_VERSION}`, newsletterRouter);

module.exports = app;