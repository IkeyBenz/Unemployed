const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Post = require('../models/post');
const Industry = require('../models/industry');
const checkAuth = require('../middleware/check-auth');
    //GET: renders home page (feed for now)
    // // TODO: need to setup industries so feed can be customized to certain industry
    router.get('/', (req, res) => { ///TEMPORARY ROUTE LOGIC
        Post.find({}).then(posts => {
            console.log(req.user)
            console.log('Above is the req.user ');
            res.render('index', {posts: posts})
        }).catch(err => {
            console.log(err.message);
        })
    })

    //GET: renders new post form
    router.get('/posts/new', checkAuth, (req, res) => {
        res.render('posts-new')
    });
    // POST route: creates a new post.
    // app.post('/posts', (req, res) => {
    //     post = new Post(req.body);
    //     console.log(req);
    //     User.findOne({googleId: req.user.googleId}).then(user => {
    //         post.author = user._id;
    //         user.posts.unshift(post);
    //         user.save();
    //         return post.save()
    //     }).then(post => {
    //         return res.redirect('/');
    //     }).catch(err => {
    //         console.log(err.message);
    //     });
    // });
        /////////Temporary route.... need to fix user
    router.post('/posts', (req, res) => {
        console.log(req.body);
        const post = new Post(req.body);
        post.save().then(post => {
            console.log(post)

            return res.redirect('/');

        }).catch(err => {
            console.log(err.message)
        })
    })
module.exports = router;
