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