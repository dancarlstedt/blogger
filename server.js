var express = require('express');
var logger = require('morgan');
var _ = require('underscore');
var bodyParser = require('body-parser');
var app = express();

var config = {
    port: 3000
};

var blogs = [
    {
        _id_: 1,
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
    }
];

// ****** Router Stuff *****
// static assets only
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

var router = express.Router();
router.use(logger());

router.route('/blogs')
    .get(function (req, res) {
        res.json(blogs);
    })
    .post(function (req, res) {
        var maxPosting = _.max(blogs, function (blog) {
            return blog._id_;
        });

        var newBlog = {_id_: maxPosting._id_ + 1};
        var body = req.body;
        newBlog.title = body.title;
        newBlog.date = new Date();
        newBlog.author = body.author;
        newBlog.image = body.imag;
        newBlog.comments = body.comments;


        blogs.push(newBlog);

        res.status(201).json(newBlog);
    });

router.route('/blogs/:blog_id')
    .get(function (req, res) {
        var blogId = req.params.blog_id;
        var blog = _.find(blogs, function (blog) {
            return blog._id_ == blogId;
        })
        res.json(blog);
    });

app.use('/api', router);

// **** End Router Stuff ****

app.listen(config.port);
console.log('Express started on port ' + config.port);