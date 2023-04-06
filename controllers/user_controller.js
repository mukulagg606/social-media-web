const User = require("../models/userModel");

module.exports.profile = async function(req,res){
    if(req.cookies.user_id){
        const user = await User.findById(req.cookies.user_id);
        if(user){
            return res.render('profile',{
                title:"Profile",
                user:user,
            });
        }else{
            res.redirect("/users/sign-in");
        }
    }else{
        res.redirect("/users/sign-in");
    }
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

module.exports.createSession = async function(req,res){
    const user = await User.findOne({email:req.body.email});
    if(user){
        if(user.password != req.body.password){
            return res.redirect("back");
        }
        res.cookies('user_id',user.id);
        return res.redirect("/users/profile");
    }else{
        return res.redirect("/users/sign-up");
    }
}