var express = require('express');
var router = express.Router();
var xlsx = require('node-xlsx');
var path = require('path');
var File = require('./models/File');

// var fs = require('fs');


// This route will read in the excel file contents, parse them and save them to the database
router.post('/files', function (req, res) {

  var newFile = new File();
  newFile.filename = req.file.originalname;
  newFile.content = xlsx.parse('./' + req.file.path);
  newFile.dateAdded = Date.now();

  File.saveFile(newFile, function(err) {
    if(err) {
      res.json(err);
    } else {
      res.json(newFile);
    }
  });
});

// This route will send back a json object of all the files in the database
router.get('/files', function (req,res) {
  File.getFiles(function (files, err) {
    if(err) {
      res.send(err);
    } else {
      res.json(files);
    }
  });
});

// This route will send back a single file that is specified by the id parameter
router.get('/files/:id', function (req, res) {
  File.getFileByID(req.params.id, function (file, err) {
    if(err) {
      res.send(err);
    } else {
      res.json(file);
    }
  });
});

module.exports = router;
