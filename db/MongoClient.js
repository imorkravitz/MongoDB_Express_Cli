const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const connectionURL = 'mongodb://localhost:27017/'
const dataBaseName = 'mydb';
const jsData = require('../client/jsonData.json');

var db;

MongoClient.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
},(error, client) => {
    if (error) {
        console.log("can't connect to db");
    } else {
        console.log("connection")
    }
    db = client.db(dataBaseName)

    // db.collection('screens').drop();
});

module.exports = {
    main: function (req, res) {
        db.collection('screens').insertMany(jsData, (err, data) => {
            if (err){
                console.log('Error')
            }else{
                console.log('insert data to MongoDB')
            }
        })

        db.collection('screens').find().toArray(function (err, data) {
            if(err) {
                console.log('Error')
            }else if (data!= null)
            console.log(data)
            res.send(data);
        });
    }
}
