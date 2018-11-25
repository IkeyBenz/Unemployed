const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

// finds user id and attaches to cookie to track a users session
passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/google/callback'
}, function(accessToken, refreshToken, profile, done) {
        User.findOne({ googleId: profile.id}).then(curUser => {
            if(curUser) {
                console.log('Below is the current user: ')
                console.log(curUser)
                done(null, curUser);
            } else {
                const user = new User ({
                    email: profile.emails[0].value,
                    name: profile.displayName,
                    googleId: profile.id,
                    accessToken: accessToken
                });
                user.save().then(newUser => {
                    console.log('Below is the new user: ');
                    console.log(newUser);
                    done(null, newUser);
                });
            }
        }).catch(console.error);
    }
));
