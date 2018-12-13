const Comment = require('../models/comment');
const Post = require('../models/post');
const comments = require('express').Router();

// Top level forwarding from '/api/posts/:postId/comments

// CREATE new comment
comments.post('/', (req, res) => {
    if (req.user) {
        const comment = new Comment(req.body);
        comment.save().then(() => {
            return Post.findByIdAndUpdate(req.postId, { $push: { comments: comment._id } });
        }).then(() => {
            return User.findByIdAndUpdate(req.user._id, { $push: { comments: comment._id } });
        }).then(() => {
            res.status(200).json({ message: 'Successfully created comment' });
        }).catch(err => {
            res.status(400).json({ error: err.message });
        });
    } else {
        res.status(400).json({ error: 'Not logged in' });
    }
});

// UPDATE comment comment
comments.patch('/:id', (req, res) => {
    if (req.user) {
        Comment.findById(req.params.id).then(comment => {
            if (String(req.user._id) == String(comment.author)) {
                return Comment.findByIdAndDelete(req.params.id).then(() => {
                    res.status(200).json({ message: "Successfully updated comment" });
                });
            } else {
                res.status(400).json({ error: "Unauthorized to edit this post" });
            }
        }).catch(error => {
            res.status(400).json({ error: error.message });
        })
    } else {
        res.status(400).json({ error: 'Not logged in' });
    }
})

// DELETE comment
comments.delete('/:id', (req, res) => {
    if (req.user) {
        Comment.findById(req.params.id).then(comment => {
            if (String(req.user._id) == String(comment.author)) {
                Comment.findByIdAndDelete(req.params.id).then(comment => {
                    return Post.findByIdAndUpdate(req.postId, { $pull: { comments: req.params.id } })
                }).then(() => {
                    return User.findByIdAndUpdate(req.user._id, { $pull: { comments: req.params.id } });
                }).then(() => {
                    res.status(200).json({ message: 'Successfully delete comment' });
                });
            } else {
                res.status(400).json({ error: 'Unauthorized to delete this comment' });
            }
        })
    } else {
        res.status(400).json({ error: 'Not logged in' });
    }
});

module.exports = comments;

