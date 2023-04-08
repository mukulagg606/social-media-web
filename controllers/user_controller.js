const User = require("../models/userModel");

module.exports.profile = async function(req,res){
    const user = await User.findById(req.params.id);
    return res.render('profile',{
        title:"Profile",
        profile_user:user,
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
    req.flash('success','Logged in successfully');
    return res.redirect("/");
}

module.exports.destroySession = function(req,res){
    req.logout(function(err){
        req.flash('success','Logged out successfully');
        return console.log(err);
    });
    return res.redirect("/");
}

module.exports.update = async function(req,res){
    if(req.user.id == req.params.id){
       let user = await User.findById(req.params.id);
       
       User.uploadedAvatar(req,res,function(err){
        if(err){console.log('***Multer Error',err)};

        user.name = req.body.name;
        user.email = req.body.email;
        if(req.file){
            //this is saving the path of uploaded file into avatar field in the user
            user.avatar = User.avatarPath+"/"+ req.file.filename;
        }
       });
       await user.save();
       
        req.flash('success','Profile Updated');
        return res.redirect("back");
    }else{
        req.flash('error','Unauthorized!');
        return res.status(401).send("Unauthorized");
    }
}