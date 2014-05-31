module.exports = function(mongoose) {

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

    return mongoose.model('Blogs', blogSchema);
};