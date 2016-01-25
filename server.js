var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var database = require('./config/database');

// ################## configuration
mongoose.connect(database.url);
var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error'));

app.use(express.static(__dirname + "/public"));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.json({type : 'application/vnd.api+json'}));
app.use(methodOverride());
require('./app/routes')(app);

// ################# app start
app.listen(8080);
console.log("app running at port 8080....");






