var logger = require('morgan');

module.exports = function(express,app, repository) {
    var router = express.Router();
    router.use(logger());
    var Blogs = repository.Blogs;

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
                if (err) res.status(500).json(err);
                if (blog) {
                    res.json(blog);
                } else {
                    res.status(404).json({message: "Id not found: " + blogId});
                }
            });
        })
        .put(function (req, res) {
            var blogId = req.params.blog_id;
            Blogs.findById(blogId, function (err, blog) {
                if (err) res.status(500).json(err);
                if (blog) {
                    // TODO: upate the blog here
                } else {
                    res.status(404).json({message: "Id not found: " + blogId});
                }
            })
        });

    app.use('/api', router);
}