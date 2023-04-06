const User = require("../models/userModel");

module.exports.profile = function(req,res){
    return res.render('profile',{
        title:"Profile",
    });
}

module.exports.signIn = function(req,res){
    return res.render('sign-in',{
        title:"Sign In Page",
    })
}

module.exports.signUp = function(req,res){
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
    
}