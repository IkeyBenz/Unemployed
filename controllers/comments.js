const Comment = require('../models/comment');
const Post = require('../models/post');
const comments = require('express').Router();

// Top level forwarding from '/api/posts/:postId/comments

///POST: route creates new comment on specific post
// NOTE: this currently does not save comments to the user (no author(?))
comments.post('/', (req, res) => {
    const comment = new Comment(req.body);
    comment.save().then(comment => {
        console.log(comment);
        return Post.findByIdAndUpdate(req.postId, { $push: { comments: comment } });
    }).then(() => {
        return res.status(200).send('successfully Created Comment!');
    }).catch(err => {
        res.status(400).send(err);
    });
});

module.exports = comments;

