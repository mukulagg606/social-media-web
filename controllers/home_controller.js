const Post = require("../models/post");

module.exports.home = async function(req,res){
     const posts = await Post.find({}).populate('user').populate({path:'comments',populate:{path:'user'}}).exec();
    return res.render('home',{
        title:"Home",
        posts:posts,
    });
}