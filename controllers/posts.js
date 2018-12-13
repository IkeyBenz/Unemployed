const Post = require('../models/post');
const posts = require('express').Router();

// Top level forwarding from /api/posts/

//GET: sends JSON response containing array of post objects  (feed for now)
// // TODO: need to setup industries so feed can be customized to certain industry
posts.get('/', (req, res) => {
    Post.find({}).populate('author').then(posts => {
        console.log(posts[0])
        return res.json(posts)
    }).catch(console.error)
})


/// NOTE: Temp POST route until we figure out Auth with React////
posts.post('/', (req, res) => {
    const post = new Post(req.body);
    post.save().then(post => {
        res.status(200).send('Post successfully Created!')
    }).catch(err => {
        console.log(err.message);
        res.status(400).send(err)
    })
})

// GET: Show individual post 
posts.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .populate('author')
        .populate({
            path: 'comments',
            populate: {
                path: 'author'
            }
        }).then(post => {

            res.json(post);
        }).catch(err => {
            console.log(err.message);
        });
});

posts.use('/:id/comments', (req, res, next) => {
    req.postId = req.params.id;
    next();
}, require('./comments'));

module.exports = posts;
