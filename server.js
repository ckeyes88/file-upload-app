var express = require('express'); // Express server side framework
var app = express();
var mongoose = require('mongoose'); // ORM for mongodb
var morgan = require('morgan'); // Log to the console
var bodyParser = require('body-parser'); // Access POST body
var path = require('path'); // Access fs paths
var multer = require('multer'); // multipart form data middleware

// Configure view engine using ejs templates and set all .html files to be processed by ejs
app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Get api routes for database Access
var api = require('./upload-api');

// Connect to the remote mongo database: username and password are hard coded = BAD
mongoose.connect('mongodb://test:test@ds045714.mlab.com:45714/file-upload-app', function (err) {
  if(err) throw err;
});

// Give a response to show that the database is connected
var db = mongoose.connection;
db.once('open', function () {
  console.log('mongoose connected!');
});

app.use(morgan('dev')); // Configure Morgan logger for dev mode
// Configure bodyparser middleware for json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set public directory for client side code
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to attach multipart/formdata to the request: Allow file uploads
app.use(multer({dest: './public/uploads'}).single('file'));

// Register api middleware for adding the file to the database
app.use('/api', api);

// Renders the only front end page for root route
app.get('/', function (req, res) {
    res.render('index.html');
});

// Send all other routes to error 404 page
app.get('*', function (req, res) {
    res.render('404page.html');
});

// Run server on port 8080
app.listen(8080);
console.log("App listening on port 8080");
