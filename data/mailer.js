var nodemailer = require('nodemailer');
const mailCredentials = require('../mongoconfig/authconfig');

function sendEmail(Data){

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'birthdayreminder03@gmail.com',
    pass: 'mdpolugiogtebifa'
  }
});




  var mailOptions = {
    from: 'birthdayreminder03@gmail.com',
    to: 'kevin0108dsa@gmail.com',
    subject: 'Birthdays Today',
    text: `Here are friends that have a birthday today: ${Data}`,
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