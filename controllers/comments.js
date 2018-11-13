const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const User = require('../models/user');
const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth');

////POST: creates comment that is then stored in the post model
router.post('/posts/:postId/comments', checkAuth, (req, res) => {
    const comment = new Comment(req.body);
    comment.author = req.user._id;
    comment.save().then(comment => {
        console.log(comment);
        return User.findById(req.user._id)
    }).then(user => {
        user.comments.unshift(comment);
        user.save();
        return Post.findById(req.params.postId);
    }).then(post => {
        post.comments.unshift(comment);
        return post.save();
    }).then(post => {
        return res.redirect(`/posts/${post._id}`);
    }).catch(console.error)
});
///////If user is the author they can delete the comment
// NOTE: This route hasn't been tested yet... waiting for Ikey on where to display delete button
router.delete('/posts/:postId/comments/:id', checkAuth, (req, res) => {
    Comment.findById(req.params.id).then(comment => {
        if(comment.author === req.user ) {
            Comment.findOneAndRemove(comment._id).then(comment => {
                res.redirect(`/posts/${req.params.postId}`);
            }).catch(console.error)
        } else {
            res.send("You don't have permission to do that.");
        }
    }).catch(console.error)
});

module.exports = router;
