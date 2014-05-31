module.exports = function (express, app) {
    var settings = {
        port: 3000,
        connection: 'mongodb://localhost:27017/blogger'
    };

    return settings;
};