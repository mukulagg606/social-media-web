const Post = require("../models/post");

module.exports.create = async function(req,res){
    console.log(req.user);
    await Post.create({
        content:req.body.content,
        user:req.user._id,
    })
    return res.redirect("back");
}