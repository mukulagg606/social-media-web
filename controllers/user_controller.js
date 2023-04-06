const User = require("../models/userModel");

module.exports.profile = function(req,res){
    return res.render('profile',{
        title:"Profile",
    });
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect("/users/profile");
    }
    return res.render('sign-in',{
        title:"Sign In Page",
    })
}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect("/users/profile");
    }
    return res.render('sign-up',{
        title:"Sign Up Page",
    })
}

module.exports.create = async function(req,res){
    if(req.body.password != req.body.confirmPassword){
        return res.redirect('back');
    }
    const user = await User.findOne({email:req.body.email});
       if(!user){
        User.create({
            email:req.body.email,
            password:req.body.password,
            name:req.body.name,
        })
        return res.redirect("/users/sign-in");
       }
};

module.exports.createSession = function(req,res){
    return res.redirect("/");
}

module.exports.destroySession = function(req,res){
    req.logout(function(err){
        return console.log(err);
    });
    return res.redirect("/");
}