const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pathsSchema = new Schema({
    path:{
        type: String
        }
    },{
    timeseries:true,
});

const PathModel = mongoose.model('PathModel', pathsSchema);

module.exports = PathModel;