const mongodb = require('mongodb');
const jsData = require('../client/jsonData.json');

const MongoClient = mongodb.MongoClient;
const connectionURL = 'mongodb://localhost:27017/'
const dataBaseName = 'mydb';

MongoClient.connect(connectionURL, {
    useNewUrlParser: true, useUnifiedTopology: true
}, async (error, client) => {
    if (error) {
        return console.log("Can't connect to db")
    }
    console.log('MongoDB connected succesfully')

    var db = client.db(dataBaseName)

    await db.dropCollection('screens', (err, data) => {
        if (err) {
            console.log('Error')
        } else console.log('delete')
    });

    await db.collection('screens').insertMany(jsData), (err, data) => {
        if (err) {
            console.log('Error')
        } else console.log('insert json to MongoDB')
    };

    db.collection('screens').find().toArray(function(err, result){
        if(err) throw err;
        console.log(result);
        client.close();
    })
});




module.exports.MongoClient = MongoClient;

// exports.MongoClient = MongoClient;









 