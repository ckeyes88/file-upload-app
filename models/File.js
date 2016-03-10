var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Set up a mongoose schema to store the data
var FileSchema = new Schema({
  filename: String,
  content: Object,
  dateAdded: Date
});

var File = module.exports = mongoose.model('File', FileSchema);

// Function to save a file to the database
module.exports.saveFile = function(file, callback) {
  File.create(file, callback);
};

// Function to get all files in the database
module.exports.getFiles = function(callback) {
  File.find()
    .exec(callback);
};

// Function to get a single file by id from the database
module.exports.getFileByID = function (id, callback) {
  File.findById(id, callback)
};
