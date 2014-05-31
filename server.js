var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

var config = {
    port: 3000,
    connection: 'mongodb://localhost:27017/blogger'
};

// main config
require('./server/config/config');

// db config
require('./server/config/db.js')(config);


// blog routes
var router = express.Router();
router.use(logger());

router.route('/blogs')
    .get(function (req, res) {
        Blogs.find(function (err, blogs) {
            res.json(blogs);
        });
    })
    .post(function (req, res) {
        var body = req.body;
        var newBlog = new Blogs({
            title: body.title,
            date: new Date(),
            author: body.author,
            image: body.image,
            comments: body.comments
        });

        newBlog.save(function (err, newBLog) {
            if (err) res.status(500).json(err);
            res.status(201).json(newBlog);
        });
    });

router.route('/blogs/:blog_id')
    .get(function (req, res) {
        var blogId = req.params.blog_id;
        Blogs.findById(blogId, function (err, blog) {
            if(err) res.status(500).json(err);
            if(blog) {
                res.json(blog);
            }else{
                res.status(404).json({message :"Id not found: " + blogId});
            }
        });
    })
    .put(function (req, res) {
        var blogId = req.params.blog_id;
        Blogs.findById(blogId, function (err, blog) {
            if(err) res.status(500).json(err);
            if(blog){
                // TODO: upate the blog here
            }else{
                res.status(404).json({message :"Id not found: " + blogId});
            }
        })
    });

app.use('/api', router);


app.listen(config.port);
console.log('Express started on port ' + config.port);