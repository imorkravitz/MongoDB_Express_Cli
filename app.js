const express = require('express');
const mongoose = require('mongoose');
var path = require('path');

const app = express();
app.use(express.json()); 

const dbClient = require("./models/MongoClient");
const db = require('./models/mongoConnect');
console.log(dbClient.task+"$$$");


app.use('/client', express.static(path.join(__dirname, 'client')));
app.use('/error', express.static(path.join(__dirname, 'error')));


var countOfScreen = 3;
app.get('/screen=:num', (req, res) => {
    var num = req.params.num;
    if(num>0 && num<=countOfScreen){
        res.sendFile(path.join(__dirname, '/client/screen.html'));
    }else{
        res.sendFile(path.join(__dirname, '/error/error.html'));
    }
})

const port = process.env.PORT || "8080";
app.listen(port, () => console.log(`server is listening on port ${port}`));