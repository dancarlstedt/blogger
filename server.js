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

app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

// db config

var db = mongoose.createConnection(config.connection);
db.on('error', console.error.bind(console, 'connection error'));
db.on('open', function () {
    console.log('connection successful');
});

// blog model and init
var blogSchema = new mongoose.Schema({
    title: String,
    date: Date,
    author: String,
    image: String,
    comments: [
        {username: String, date: Date, message: String}
    ]
});

var Blog = db.model('Blog', blogSchema);
Blog.findOne(function (err, blog) {
    if (err) {
        console.error(err);
        return;
    }

    if (!blog) {
        console.log('no blog found... creating default entry');
        var defaultBlog = new Blog({
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

// blog routes
var router = express.Router();
router.use(logger());

router.route('/blogs')
    .get(function (req, res) {
        Blog.find(function (err, blogs) {
            res.json(blogs);
        });
    })
    .post(function (req, res) {
        var body = req.body;
        var newBlog = new Blog({
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
        Blog.findById(blogId, function (err, blog) {
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
        Blog.findById(blogId, function (err, blog) {
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