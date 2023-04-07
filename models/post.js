const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        }
    ]
},{
    timestamps:true,
    strictPopulate:false,

});

const Post = mongoose.model('Post',postSchema);
module.exports = Post;