const mongoose = require('mongoose');

const PathSchema = new mongoose.Schema({
    name:String,
});

const PathModel = mongoose.model("paths",PathSchema);
exports.PathModel = PathModel;