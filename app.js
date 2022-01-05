const express = require('express');
const path = require('path');

const app = express();
const db = require("./db/mongoConnect");
const {PathModel} = require("./models/PathModel");

// app.use(express.json()); 
app.use('/client', express.static(path.join(__dirname, 'client')));
app.use('/error', express.static(path.join(__dirname, 'error')));


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

const port = process.env.PORT || "8080";
app.listen(port, () => console.log(`server is listening on port ${port}`));