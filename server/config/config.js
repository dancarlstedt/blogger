module.exports = function (app) {
    app.use(express.static(__dirname + '/public'));
    app.use(bodyParser());
};