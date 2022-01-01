

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydb',{
  useUnifiedTopology: true,
  useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log('MongoDB connected succesfully')
});

module.exports = db;