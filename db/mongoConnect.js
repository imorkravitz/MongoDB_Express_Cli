const mongoose = require('mongoose');
const jsData = require('../client/jsonData.json');
const scheduler = require('../client/scheduler');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/mydb');
  console.log('MongoDB connected succesfully')

  //________________________collections________________________//
  const db = mongoose.connection;

  db.dropCollection('jsonDB', (err, data) => {
    if (err) {
      console.log('Error')
    } else console.log('delete')
  });

  db.collection('jsonDB').insertMany(jsData), (err, data) => {
    if (err) {
      console.log('Error')
    } else console.log('insert json to mongo')
  };
}

exports.default = mongoose;