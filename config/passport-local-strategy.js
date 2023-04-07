const passport = require("passport");
const User = require("../models/userModel");
const LocalStrategy = require("passport-local").Strategy;

//Authentication using Passport
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true,
},
    async function(req,email,password,done){
        //Find a User and establish the identity
        const user = await User.findOne({email:email});
        if(!user || user.password != password){
            req.flash('error','Invalid Username/Password')
            return done(null,false);
        }
        return done(null,user);
    }
));

//Serialising the user to choose which key is to be kept in cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//Deserialising the user from the cookies
passport.deserializeUser(async function(id,done){
    const user = await User.findById(id);
    if(user){
        return done(null,user);
    }
    else{
        return done(null);
    }
});

module.exports = passport;

//Check if the user is Authenticated
passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}
