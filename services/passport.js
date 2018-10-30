const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    })
})

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/google/callback'
}, function(accessToken, refreshToken, profile, cb) {
        User.findOne({ googleId: profile.id}).then(user => {
            if(user) {
                cb(null, user);
            } else {
                const user = new User ({
                    email: profile.emails[0].value,
                    name: profile.displayName,
                    googleId: profile.id,
                    accessToken: accessToken
                });
                user.save().then(user => {
                    console.log(user);
                    cb(null, user);
                });
            }
        });
    }
));