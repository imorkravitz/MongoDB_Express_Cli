//Server setup
const express = require('express');
const app = express();
const http = require('http').Server(app);
const env = require('dotenv');
env.config();
const port = process.env.PORT;
const io = require('socket.io')(http, { cors: {}});
const path = require('path');

http.listen(port,() => console.log(`server is listening on port ${port}`));

//MongoConnection
const db = require("./db/mongoConnect");
const {PathModel} = require("./models/PathModel"); // in order to include the schema

//Static files

// app.use(express.json());
app.use('/client', express.static(path.join(__dirname, 'client')));
app.use('/error', express.static(path.join(__dirname, 'error')));
//Socket setup

io.on('connection', (socket) => {
    console.log('Connected to socket!')
})

// console.log(db.jsonData());

app.get('/post', (req, res) => {
    res.send(db.jsonData())
})

var countOfScreen = 3;
app.get('/screen=:num', async (req, res) => {
    var num = req.params.num;

    if(num>0 && num<=countOfScreen){
        res.sendFile(path.join(__dirname, process.env.pathScreen));
    }else{
        res.sendFile(path.join(__dirname, process.env.pathError));
    }
});

