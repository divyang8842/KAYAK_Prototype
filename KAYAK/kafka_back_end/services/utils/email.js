var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: 'gmailuserid',
        pass: 'gmailPassword'
    }
}));


var mailOptions = {};

var setMailOptions = function(to,message){
    mailOptions = {
        from: 'divyang8842@gmail.com',
        to: to,
        subject: 'Dropbox File Shared',
        text: message
    };
}

var sendEmail=function(){
    transport.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

exports.setMailOptions = setMailOptions;
exports.sendEmail = sendEmail;