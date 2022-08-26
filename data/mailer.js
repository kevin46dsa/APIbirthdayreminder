var nodemailer = require('nodemailer');
const mailCredentials = require('../mongoconfig/authconfig');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword'
  }
});

var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Birthdays Today',
  text: 'Here are friends that have a birthday today',
  html: '<h1>Welcome</h1><p>That was easy!</p>' // test this out 
};

function sendMail(){
transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
const ReportService = {
	sendMail
};

export default ReportService;


// try ZOHO MAIL

/*
I used Zoho mail and it works fine. Make sure to use the same Zoho email address in the from field of mailOptions as it will throw an error otherwise.

var transport = nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true, //ssl
    auth: {
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASSWORD
    }
});

var mailOptions = {
    from: process.env.EMAIL,
    to: req.body.email,
    subject: "Subject",
    html: ""
};
Generally Gmail is not the preferred service to use with Nodemailer since it is targeted at real users and not for automatic/programmed use. See Nodemailer with Gmail for more info. Also here is a list of alternative email services supported by Nodemailer WELL-KNOWN SERVICES.

*/
