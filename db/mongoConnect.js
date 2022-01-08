const mongoose = require('mongoose');
const jsData = require('../client/jsonData.json');
const scheduler = require('../client/scheduler');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/mydb');
  console.log('MongoDB connected succesfully')

  //________________________collections________________________//
  const db = mongoose.connection;

  await db.dropCollection('screens', (err, data) => {
    if (err) {
      console.log('Error')
    } else console.log('delete')
  });

  await db.collection('screens').insertMany(jsData), (err, data) => {
    if (err) {
      console.log('Error')
    } else console.log('insert json to mongo')
  };
  // function initData() {
    //   for posts:
    //     insert posts with post numbers 
    //   for sc in  screen :
    //     fin posts of sc
    //       insert sc with list of relevant posts
    // }
    
    // db.collection('screens').find({}).toArray((error, tasks) => {
      //   console.log(tasks)
      
      
      // in collection screen:
      //   get screen.posts
      // for post in posts :
      //   in collection posts : 
      //     get posts and add to jsonlist
      
      // return json list
      
      
    }
      function jsonData(){
      console.log("json for the client!")
      return jsData;
    }
//-----


module.exports = {mongoose, jsonData};