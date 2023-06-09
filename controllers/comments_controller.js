const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require("../mailers/comments_mailer");
const Like = require("../models/like");
const comentEmailWorker = require("../workers/comment_worker_email");
const queue = require("../config/kue");

module.exports.create = async function(req, res){

    try{
        let post = await Post.findById(req.body.post);

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

           post.comments.push(comment);
           await  post.save();

            comment = await comment.populate('user', 'name email');
            //commentsMailer.newComment(comment);

           let job =  await queue.create('emails',comment).save(function(err){
                if(err)
                console.log("Error in queue", err);

                console.log(job.id);
            });

            if (req.xhr){
                // Similar for comments to fetch the user's id!    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }


            req.flash('success', 'Comment published!');

            res.redirect('/');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
}


module.exports.destroy = async function(req, res){

    try{
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id){

            let postId = comment.post;

            await Comment.findByIdAndDelete(req.params.id);

            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});


            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }


            req.flash('success', 'Comment deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
}