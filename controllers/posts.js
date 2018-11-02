const User = require('../models/user');
const Post = require('../models/post');
const Industry = require('../models/industry');

module.exports = function(app) {
    //GET: renders home page (feed for now)
    // // TODO: need to setup industries so feed can be customized to certain industry
    app.get('/', (req, res) => { ///TEMPORARY ROUTE LOGIC
        Post.find({}).then(posts => {
            res.render('index', {posts: posts})
        }).catch(err => {
            console.log(err.message);
        })
    })

    //GET: renders new post form
    app.get('/posts/new', (req, res) => {
        res.render('posts-new');
    });
    // POST route: creates a new post.
    app.post('/posts', (req, res) => {
        post = new Post(req.body);
        post.author = req.user._id;
        post.save().then(post => {
            return User.findById(req.user._id)
        }).then(user => {
            user.posts.unshift(post);
            user.save();
            return res.redirect('/');
        }).catch(err => {
            console.log(err.message);
        });
    });
    
}
