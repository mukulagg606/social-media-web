const Post = require("../models/post");
const User = require("../models/userModel");

module.exports.home = async function(req,res){
 try{
  const posts = await Post.find({}).sort('-createdAt').populate('user').populate({path:'comments',populate:{path:'user'}}).exec();
  const users = await User.find({});
   return res.render('home',{
    title:"Home",
    posts:posts,
    all_users:users,
});
 }catch(err){
  console.log("Error:", err);
 }
}