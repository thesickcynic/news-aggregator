const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const routes = require('express').Router();
const bcrypt = require('bcrypt');
const {register, login} = require('../src/controllers/authController');
const preferencesRoute = require('../src/controllers/preferencesController');
require("dotenv").config();

const app = express()
// app.use(cors);
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());



routes.post('/register', register);
routes.post('/login', login);
routes.get('/preferences', preferencesRoute);
routes.put('/preferences', preferencesRoute);
// app.use('/news', news);

app.listen(process.env.PORT, (err) => {
    if(err) {
        console.log("Server failed to start.")
    } else {
        console.log("Started.")
    }
})