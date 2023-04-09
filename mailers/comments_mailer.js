const nodeMailer = require("../config/nodemailer");

exports.newComment = (comment)=>{
    //console.log(comment);
    //let htmlString = nodeMailer.renderTemplate("/comments/new_comment.ejs",{comment:comment});
    nodeMailer.transporter.sendMail({
        from:'workatmukul@gmail.com',
        to:comment.user.email,
        subject:'New comment published',
        html:'<h4>Your coment is published<h/4>'
    },(err,info)=>{
        if(err){
            console.log("Error in sending mail",err);
            return;
        }
        console.log("Message sent",info);
        return;
    
})
}