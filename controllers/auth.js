const passport = require('passport');
const express = require('express');
const router = express.Router();

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email']}))

router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}),
function(req, res) {
    res.redirect('/');
});


router.get('/logout', (req, res) => {
    console.log('logging user out!');
    req.logout();
});

module.exports = router;
