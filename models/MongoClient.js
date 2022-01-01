const mongodb = require('mongodb');
const db = require('./mongoData');
const MongoClient = mongodb.MongoClient;
const connectionURL = 'mongodb://localhost:27017/mydb'
const dataBaseName = 'mydb';
const jsonArr = require('../client/jsonData.json')

MongoClient.connect(connectionURL, {
    useUnifiedTopology: true,
  useNewUrlParser: true
}, (err, data) => {
    if (err) {
        return console.log('Cant connect to db');
    }
    console.log('passint the data to Mongo')
    const db = data.db(dataBaseName);

db.collection('jsonDB').insertMany(jsonArr,(err,result) => {
        if(err){
            return console.log('error!')
        }
        console.log(result.acknowledged)
    })

db.collection('paths').findOne({
    }, (error,task) => {
        // console.log(task.path)
        if(error) {
            return console.log('error');
        }
    })   
});
exports.MongoClient = MongoClient;

