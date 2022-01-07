//Server setup
const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || "8080";
const io = require('socket.io')(http, { cors: {}});
const path = require('path');
// app.use(express.json());


http.listen(port,() => console.log(`server is listening on port ${port}`));

//MongoConnection
const db = require("./db/mongoConnect");
const {PathModel} = require("./models/PathModel"); // in order to include the schema

//Static files

app.use('/client', express.static(path.join(__dirname, 'client')));
app.use('/error', express.static(path.join(__dirname, 'error')));
//Socket setup

io.on('connection', (socket) => {
    console.log('Connected to socket!')
})

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
});

