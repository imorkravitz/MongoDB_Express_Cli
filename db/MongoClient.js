const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const connectionURL = 'mongodb://localhost:27017/'
const dataBaseName = 'mydb';
const jsData = require('../client/jsonData.json');

var db;

MongoClient.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (error, client) => {
    if (error) {
        console.log("can't connect to db");
    } else {
        console.log("connection")
    }
    db = client.db(dataBaseName)


    let flag = 0;
    db.collection('screens').insertMany(jsData, (err, data) => {
        if (err) {
            flag = 1;

            db.collection('screens').drop();
            console.log('upload data...')
        } else {
            console.log('insert data to MongoDB 1')
        }

        if (flag) {
            db.collection('screens').insertMany(jsData, (err, data) => {
                if (err) {
                    console.error('error to upload data')
                } else {
                    console.log('insert data to MongoDB 2')
                }
            })
        }
    })
});

module.exports = {
    main: function (req, res) {

        db.collection('screens').find().toArray(function (err, data) {
            if (err) {
                console.log('Error')
            } else if (data != null)
                console.log(data)
            res.send(data);
        });
    },

    // This is store all the clients that are connected the website into MongoDB
    addUsers: function (screenNum) {

        db.collection('activeUsers').insertOne({
            screen: screenNum
        })

        db.collection('historyUsers').find({screen :screenNum}).toArray((err,data) => {
            if(data[0]){
                console.log("this user is already exist!")
            }else{
                db.collection('historyUsers').insertOne({
                    screen: screenNum
                }, (err, data) => {
                    if (err) {
                        console.log("can't save to db");
                    }
                    console.log(`the user ` + screenNum + ` saved in history`)
                })
            }
        })
    },
    deleteUsers: function (screenNum) {

        db.collection('activeUsers').deleteMany({
            screen: screenNum
        })
    }
}