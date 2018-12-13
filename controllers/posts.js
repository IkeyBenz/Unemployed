const Post = require('../models/post');
const posts = require('express').Router();
const User = require('../models/user');

// Top level forwarding from /api/posts/

// GET all posts
posts.get('/', (req, res) => {
    Post.find({}).populate('author').then(posts => {
<<<<<<< HEAD
        console.log(posts[0])
        return res.json(posts)
    }).catch(console.error)
})

=======
        return res.json(posts);
    }).catch(console.error);
});
>>>>>>> 3b462ca0e08c4789767cfb5a312acc0b82a47763

// CREATE a post
posts.post('/', (req, res) => {
    if (req.user) {
        if (String(req.user._id) == String(req.body.author)) {
            const newPost = new Post(req.body);
            newPost.save().then(() => {
                User.findByIdAndUpdate(req.user._id, { $push: { posts: newPost } }).then(user => {
                    res.json({ message: 'Post successfully created' });
                });
            }).catch(error => {
                res.status(400).json({ error: error.message });
            });
        } else {
            res.status(400).json({ error: 'Unauthorized' });
        }
    } else {
        res.status(400).json({ error: 'Not logged in' });
    }
});

// READ a post
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
<<<<<<< HEAD
            console.log(err.message);
=======
            res.status(400).json({ error: err.message });
        });
});

// UPDATE a post
posts.patch('/:id', (req, res) => {
    if (req.user) {
        Post.findById(req.params.id).then(post => {
            if (String(post.author) == String(req.user._id)) {
                Post.findByIdAndUpdate(req.params.id, req.body).then(post => {
                    res.json({ success: "Post successfully updated" });
                }).catch(error => {
                    res.status(400).json({ error: error.message });
                });
            } else {
                res.status(400).json({ error: "Unauthorized to edit this post" });
            }
        });
    } else {
        res.status(400).json({ error: "Not logged in" });
    }
});

// DELETE a post
posts.delete('/:id', (req, res) => {
    if (req.user) {
        Post.findById(req.params.id).then(post => {
            if (String(post.author) == String(req.user._id)) {
                Post.findByIdAndDelete(req.params.id).then(() => {
                    User.findByIdAndUpdate(post.author, { $pull: { posts: req.params.id } }).then(user => {
                        res.json({ messsage: 'Successfully deleted post' });
                    });

                }).catch(error => {
                    res.status(400).json({ error: error.message });
                });
            } else {
                res.status(400).json({ error: 'Unauthorized to delete this post' });
            }
>>>>>>> 3b462ca0e08c4789767cfb5a312acc0b82a47763
        });
    } else {
        res.status(400).json({ error: 'Not logged in' });
    }
});

posts.use('/:id/comments', (req, res, next) => {
    req.postId = req.params.id;
    next();
}, require('./comments'));

module.exports = posts;
