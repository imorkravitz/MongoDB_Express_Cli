//Server setup
const express = require('express');
const app = express();
const http = require('http').Server(app);
const env = require('dotenv');

const bodyParser=require('body-parser')
const bcrypt=require('bcryptjs')


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
app.use('/client', express.static(path.join(__dirname, 'client')));
app.use('/error', express.static(path.join(__dirname, 'error')));
app.use('/',express.static(path.join(__dirname,'./client/register.html')))
app.use(bodyParser.json())


//Socket setup

app.get('/post', main);

app.post('/login', (req,res) => {

  const {username, password} = req.body;
  res.json({status: 'ok', data: 'sssdsdsds'})
  let test = MongoClient.checkUser(username , password);
  console.log(test +' %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')

  })
  
  // console.log(MongoClient.main)
  
  app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./client/register.html'));
  })
  app.post('/register',async (req,res)=>{
  
    console.log(req.body)
    const {username,password:plainTextPassword} = req.body;
    if(!username ||typeof username !=='string'){
      return res.json({status: 'error',error: 'Invalid username'})
    }
    if(!plainTextPassword|| typeof plainTextPassword !=='string'){
      return res.json({status: 'error',error: 'Invalid password'})
    }
    if(plainTextPassword.length<5){
      console.log('the pass lens 5');
      return res.json({
        status: 'error',
        error: 'Password too small. Should be at least 6 characters'
      })
    }
    const password = await bcrypt.hash(plainTextPassword,10);
    //console.log(await bcrypt.hash(password,10))
    let checkin = MongoClient.insertAdmin(username,password);
    console.log('CHECKING: '+ checkin);
    
    res.json({status:'ok'})
})


var countOfScreen = 3;
app.get('/screen=:num', async (req, res) => {
  var num = req.params.num;

  if (num > 0) {
    res.sendFile(path.join(__dirname, process.env.pathScreen));
  } else {
    res.sendFile(path.join(__dirname, process.env.pathError));
  }
});

app.get('/login',(req, res) =>{
  res.sendFile(path.join(__dirname, './client/login.html'));
})

var usernames = {};
var adminUser = 'orkr';
var adminpass = '123456';

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
  
  socket.on('loginConfirm', function (username, password) {
    if(adminUser == username && adminpass == password){
            app.get('/admin',  (req, res)=>{
        res.sendFile(path.join(__dirname, "./admin/admin.html"));
      });

      io.sockets.emit('loginSuccess', 'http://localhost:8080/admin')
    }
  });

  socket.on('Success', function () {
    
      io.sockets.emit('loginSuccess', 'http://localhost:8080/admin')
    })
  });