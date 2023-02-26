const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { API_VERSION } = require('./constants');

const app = express();

//IMPORT ROUTING:
const authRouter = require('./router/auth');

//Configure body Parse:
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Configures Static Folder:
app.use(express.static('uploads'));

//Configure Header HTTP - Cors:
app.use(cors());

//Configure ROUTING:
app.use(`/api/${API_VERSION}`, authRouter);

module.exports = app;