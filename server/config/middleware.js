var bodyParser = require('body-parser');

module.exports = function (express, app) {
    app.use(express.static(__dirname + '/public'));
    app.use(bodyParser());
};