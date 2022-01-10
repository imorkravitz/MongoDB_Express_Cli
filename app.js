//Server setup
const express = require('express');
const app = express();
const http = require('http').Server(app);
const env = require('dotenv');
env.config();
const port = process.env.PORT;
const io = require('socket.io')(http, {
  cors: {}
});
const path = require('path');

http.listen(port, () => console.log(`server is listening on port ${port}`));

//MongoConnection
const MongoClient = require('./db/MongoClient');
const {
  main
} = require('./db/MongoClient');
//Static files
// app.use(express.json());
app.use('/client', express.static(path.join(__dirname, 'client')));
app.use('/error', express.static(path.join(__dirname, 'error')));
//Socket setup

app.get('/post', main);

var countOfScreen = 3;
app.get('/screen=:num', async (req, res) => {
  var num = req.params.num;

  if (num > 0) {
    res.sendFile(path.join(__dirname, process.env.pathScreen));
  } else {
    res.sendFile(path.join(__dirname, process.env.pathError));
  }
});

var usernames = {};

io.sockets.on('connection', function (socket) {

  // when the client emits 'adduser', this listens and executes
  socket.on('adduser', function (username) {
    // we store the username in the socket session for this client
    socket.username = username;
    // add the client's username to the global list
    usernames[username] = username;
    // echo to client they've connected
    MongoClient.addUsers(username);
    console.log("screen " + username + " is connected");
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    // remove the username from global usernames list
    console.log("screen " + usernames[socket.username] + " is disconnected");
    MongoClient.deleteUsers(usernames[socket.username]);
    delete usernames[socket.username];
    // update list of users in chat, client-side

  });
});