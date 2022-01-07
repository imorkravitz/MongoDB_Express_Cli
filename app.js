//Server setup
const express = require('express');
const app = express();
const port = process.env.PORT || "8080";

const path = require('path');
const http = require('http');

const server = http.createServer(app);
const io = require('socket.io')(server);

server.listen(port,() => console.log(`server is listening on port ${port}`));


const db = require("./db/mongoConnect");
const {PathModel} = require("./models/PathModel");


//Static files
app.use('/client', express.static(path.join(__dirname, 'client')));
app.use('/error', express.static(path.join(__dirname, 'error')));

//Socket setup
// var socket = io.connect('http://localhost:8080/');

// socket.on('connect', function(socket){
//     console.log("made socket connection", socket.id);
// });

var userName = {};

var countOfScreen = 3;
app.get('/screen=:num', async (req, res) => {
    var num = req.params.num;
    let data = await PathModel.find({});
    console.log(data);
    console.log(data[0]._doc.path);


    if(num>0 && num<=countOfScreen){
        res.sendFile(path.join(__dirname, data[0]._doc.path));
    }else{
        res.sendFile(path.join(__dirname, data[1]._doc.path));
    }
})

