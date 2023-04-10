const nodemailer = require("nodemailer");
const env = require("./environment");

let transporter = nodemailer.createTransport(env.smtp);

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