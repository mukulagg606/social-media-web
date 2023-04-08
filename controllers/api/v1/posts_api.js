const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index=async function(req,res){
    const posts = await Post.find({}).sort('-createdAt').populate('user').populate({path:'comments',populate:{path:'user'}}).exec();
  
    return res.status(200).json({
        message:'List of Posts',
        posts:posts
    })
}

module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

       if(post.user == req.user.id){
           await Post.findByIdAndDelete(req.params.id);

            await Comment.deleteMany({post: req.params.id});

            return res.status(200).json({
                message:'Post with comments deleted'
            });
        }else{
           return res.json(401,{
            message: 'You cannot delete this post'
           });
        }

    }catch(err){
        return res.status(500).json({
            messgae:'Internal server error'
        });
    }
    
}