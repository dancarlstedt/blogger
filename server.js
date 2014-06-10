var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var settings = require('./server/config/settings')();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

var repository  = require('./server/config/db.js')(settings);
require('./server/config/routes')(express, app, repository);

app.listen(settings.port);
console.log('Express started on port ' + settings.port);