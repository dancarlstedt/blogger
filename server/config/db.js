var mongoose = require('mongoose');
var Blogs = new require('../models/blog')(mongoose);

module.exports = function(config){
    mongoose.connect(config.connection);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.on('open', function () {
        console.log('connection successful');
    });

    Blogs.findOne(function (err, blog) {
        if (err) {
            console.error(err);
            return;
        }

        if (!blog) {
            console.log('no blog found... creating default entry');
            var defaultBlog = new Blogs({
                title: "AngularJS",
                date: new Date(),
                author: 'Dan Carlstedt',
                image: 'angular.png',
                comments: [
                    {
                        username: 'Steve Smith',
                        date: new Date(),
                        message: 'Thank you that was a kick ass posting!!'
                    }
                ]
            });
            defaultBlog.save();
        } else {
            console.log('we found a blog');
            console.log(blog);
        }
    });
};