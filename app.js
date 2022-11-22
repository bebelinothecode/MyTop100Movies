"use strict"
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 4000;
const movieRoutes = require('./routes/movie');

//middleware
app.use(express.json());

//routes
app.use('/api/v1/movies',movieRoutes);


mongoose.connect('mongodb+srv://bebelino:hwJHIvhJUso8fePe@cluster0.bwd7gvm.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true})
    .then((result)=>app.listen(port, console.log(`Server is listening on port ${port} and is connected to the database`)))
    .catch((error)=>console.log(`error occured${error}`));

module.exports = app;