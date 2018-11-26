const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const app = express();
const authRoutes = require('./routes/auth');



mongoose.connect(keys.mongoURI, error => {
    if (error) {
        console.log('Error! - ', error);
    } else {
        console.log('Connected to mongoDB');
    }
});

app.use(cors());

// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());





app.use('/api/auth', authRoutes);


module.exports = app;