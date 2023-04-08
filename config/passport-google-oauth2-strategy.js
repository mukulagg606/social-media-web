const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/userModel');


// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: 'your client id', // e.g. asdfghjkkadhajsghjk.apps.googleusercontent.com
        clientSecret: 'your client secret', // e.g. _ASDFA%KFJWIASDFASD#FAD-
        callbackURL: "http://localhost:8000/users/auth/google/callback",
    },

    async function(accessToken, refreshToken, profile, done){
        // find a user
       let user = await User.findOne({email: profile.emails[0].value}).exec();
            console.log(accessToken, refreshToken);
            console.log(profile);

            if (user){
                // if found, set this user as req.user
                return done(null, user);
            }else{
                // if not found, create the user and set it as req.user
                await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                });

                    return done(null, user);
            }
        })
);


module.exports = passport;
