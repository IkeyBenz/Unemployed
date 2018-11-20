const User = require('../models/user');
const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth');


module.exports = function (app) {

    //GET: renders home page (feed for now)
    // // TODO: need to setup industries so feed can be customized to certain industry
    app.get('/', (req, res) => { ///TEMPORARY ROUTE LOGIC
        Post.find({}).then(posts => {
            console.log(req.user);
            console.log('Above is the req.user ');
            res.render('index', { posts: posts, user: req.user })
        }).catch(err => {
            console.log(err.message);
        });
    });

    //GET: renders new post form
    app.get('/posts/new', checkAuth, (req, res) => {
        res.render('posts-new');
    });

    // POST route: creates a new post.
    app.post('/posts', checkAuth, (req, res) => {
        const post = new Post(req.body);
        post.author = req.user._id;
        post.save().then(post => {
            return User.findById(req.user._id);
        }).then(user => {
            user.posts.unshift(post);
            user.save();
            return res.redirect(`/posts/${post._id}`);
        }).catch(console.error);
    });

    // GET: Show individual post
    app.get('/posts/:id', (req, res) => {
        Post.findById(req.params.id).populate('author').populate({
            path: 'comments',
            populate: { path: 'author' }
        }).then(post => {
            res.render('posts-show', { post: post });
        }).catch(console.error);
    });

    // Temporary route.... need to fix user
    app.post('/posts', (req, res) => {
        const post = new Post(req.body);
        post.postType = 'admin';
        post.save().then(post => {
            console.log(post)

            return res.redirect('/');

        }).catch(err => {
            console.log(err.message)
        });
    });

}


