var express = require('express');
var app = express();

var config = {
    port: 3000
};

app.use(express.static(__dirname + '/public'));

app.listen(config.port);
console.log('Express started on port ' + config.port);


/** Route Stuff **/
//var router = express.Router();
//router.use(logger());

//router.get('/' , function(req, res){
//
//    res.render('index',{message : "Hello There!"});
//
//});
//
//// happens after every route
//app.use(function (req, res, next) {
//});
//
//// error route
//app.use(function (err, req, res, next) {
//    res.send("An error has occured " + err.stack);
//});

