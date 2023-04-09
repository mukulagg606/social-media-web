const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.com',
    port:465,
    secure:false,
    auth:{
        user:'youremail',
        pass:'yourpassword'
    }
});

let renderTemplate = (data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailer', relativePath),
        data,
        function(err, template){
         if (err){console.log('error in rendering template', err); return}
         
         mailHTML = template;
        }
    )

    return mailHTML;
}

module.exports = {
    transporter:transporter,
    renderTemplate:renderTemplate
};