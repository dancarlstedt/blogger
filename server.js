var express = require('express');
var app = express();

var settings = require('./server/config/settings')();
require('./server/config/middleware')(express, app);
require('./server/config/db.js')(settings);
require('./server/config/routes')(express, app);

app.listen(settings.port);
console.log('Express started on port ' + settings.port);