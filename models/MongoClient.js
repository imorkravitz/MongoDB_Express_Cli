const mongodb = require('mongodb');
const db = require('./mongoConnect');
const MongoClient = mongodb.MongoClient;
const connectionURL = 'mongodb://localhost:27017/mydb'
const dataBaseName = 'mydb';
const jsonArr = require('../client/jsonData.json');
const { query } = require('express');

MongoClient.connect(connectionURL, {
    useUnifiedTopology: true,
  useNewUrlParser: true
}, (err, data) => {
    if (err) {
        return console.log('Cant connect to db');
    }
    console.log('passing the data to Mongo')
    const db = data.db(dataBaseName);

    //adding the advertasing jason to the mongo db collection name jsonDB
    db.collection('jsonDB').insertMany(jsonArr,(err,result) => {
            if(err){
                return console.log('error!')
            }
            console.log(result.acknowledged)
        })

        // db.collection('paths').findOne({
        //     _id: new mongodb.ObjectID("61d00f222393077dafc164b8")
        // }, (error,task) => {
        //     console.log(task.path)
        // })

    });

    function getTypes() {
            MongoClient.connect(connectionURL, async function (err, db) {
            let dbo = db.db(dataBaseName);
            return await dbo.collection("paths").findOne({
                _id: new mongodb.ObjectID("61d00f222393077dafc164b8")
            },(err,task)=>{
                console.log(task.path);
            });
        });
        // module.exports.getTypes = getTypes;
        // 
    }

function myFilter(Callback) {
    if(Callback()){
        const task = mongoose.model('paths', getTypes)
        module.exports = task
    }
}
myFilter(getTypes);

exports.MongoClient = MongoClient;

