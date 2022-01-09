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
const MongoClient = require('./db/MongoClient');
const { main } = require('./db/MongoClient');
//Static files
// app.use(express.json());
app.use('/client', express.static(path.join(__dirname, 'client')));
app.use('/error', express.static(path.join(__dirname, 'error')));
//Socket setup

var clientConnect = [];
var storeClientConnection = function (id, data){
    message.push({id: id, data: data});
    if(message > 100){
        message.shift();
    }
}

io.sockets.on('connection', function (client){
    client.on("messege", function(message){
        client.get("id", function(err, data){
            storeMessage(data, message)
        });
    });
});

io.on('connection', (socket) => {
    
    console.log('Connected to socket!')
});


app.get('/post', main);

var countOfScreen = 3;
app.get('/screen=:num', async (req, res) => {
    var num = req.params.num;

    if(num>0 && num<=countOfScreen){
        res.sendFile(path.join(__dirname, process.env.pathScreen));
    }else{
        res.sendFile(path.join(__dirname, process.env.pathError));
    }
});

