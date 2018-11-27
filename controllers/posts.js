const User = require('../models/user');
const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth');


module.exports = function (app) {

    //GET: sends JSON response containing array of post objects  (feed for now)
    // // TODO: need to setup industries so feed can be customized to certain industry
    app.get('/posts', (req, res) => {
        Post.find({}).then(posts => {
            const newPosts = posts.map(async (post) => {
                let editedPost = post;
                await User.find({_id: post.author}).then(author => {
                    console.log(author);
                    editedPost['author'] = author;
                });
                return editedPost;
            });
            Promise.all(newPosts).then(posts => {
                console.log(posts);
                res.json(posts);
            });
        }).catch(err => {
            console.log(err.message);
        });
    });


    // POST route: creates a new post.
    // app.post('/posts', (req, res) => {
    //     const post = new Post(req.body);
    //     post.save().then(post => {
    //         return User.findById(req.user._id);
    //     }).then(user => {
    //         user.posts.unshift(post);
    //         user.save();
    //         return res.status(200).send('Post successfully created!')
    //     }).catch(console.error);
    // });
//////// NOTE: Temp POST route until we figure out Auth with React////
    app.post('/posts', (req, res) => {
        const post = new Post(req.body);
        post.save().then(post => {
            console.log(post);
            res.status(200).send('Post successfully Created!')
        }).catch(err => {
            console.log(err.message);
            res.status(400).send(err)
        })
    })

    // GET: Show individual post // QUESTION: Do we need this any longer?
    // app.get('/posts/:id', (req, res) => {
    //     Post.findById(req.params.id).populate('author').populate({
    //         path: 'comments',
    //         populate: { path: 'author' }
    //     }).then(post => {
    //         res.render('posts-show', { post: post });
    //     }).catch(console.error);
    // });

    // Temporary route.... need to fix user
}
