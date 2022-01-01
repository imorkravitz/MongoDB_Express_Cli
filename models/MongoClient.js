const mongodb = require('mongodb');
const db = require('./mongoData');
const MongoClient = mongodb.MongoClient;
const connectionURL = 'mongodb://localhost:27017/mydb'
const dataBaseName = 'mydb';
const jsonArr = require('../client/jsonData.json');

MongoClient.connect(connectionURL, {
    useUnifiedTopology: true,
  useNewUrlParser: true
}, (err, data) => {
    if (err) {
        return console.log('Cant connect to db');
    }
    console.log('passing the data to Mongo')
    const db = data.db(dataBaseName);

db.collection('jsonDB').insertMany(jsonArr,(err,result) => {
        if(err){
            return console.log('error!')
        }
        console.log(result.acknowledged)
    })
db.collection('jsonDB').find({

})

db.collection('paths').find({path: "/client/screen.html"}).toArray((error,tasks) => {
    console.log(tasks)
})

// db.collection('paths').findOne({}, (error,task) => {
//         if (error) throw error;
//         console.log(task.path)
//     })
});
exports.MongoClient = MongoClient;

