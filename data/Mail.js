const nodemailer = require("nodemailer")

async function sendEmail(BirthdayData){
    let transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    secure: true,
    port: 465,
    auth: {
      user: 'birthdayreminder@zohomail.com',
      pass: 'Cole0108world',
    }
  })

  const mailOptions = {
    from: 'birthdayreminder@zohomail.com', // sender address
    to: 'kevin0108dsa@gmail.com',
    subject: 'Some subject', // Subject line
    html: '<p>test</p>', // plain text body
   };

   await transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
   console.log(err);
    }
  });
}

 function scheduledMail(Email, Data){
  console.log(Email,Data);
  let today = Data[0]
  let tommrow = Data[1]
  let message = (
    '<h2>Today</h2>'+
    '<table style="border: 1px solid #333;">' +
    '<thead>' +
    '<th> Name </th>' +
    '<th> Age </th>'  +
    /*...*/
    '</thead>'
  ); 
  
  for(let x of today) {
     message += (
       '<tr>' +
        '<td>' + x.Name + '</td>' +
        '<td>' + x.Age + '</td>' +
        /*...*/
      '</tr>'
     );
  }
  
  message +=  ('</table>'+
  '<h2>Tommrow</h2>'+
  '<table style="border: 1px solid #333;">' +
  '<thead>' +
  '<th> Name </th>' +
  '<th> Age </th>'  +
  /*...*/
  '</thead>'
  );
  
  for(let x of tommrow) {
    message += (
      '<tr>' +
       '<td>' + x.Name + '</td>' +
       '<td>' + x.Age + '</td>' +
       /*...*/
     '</tr>'
    );
 }

 message += '</table>'






  let transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  secure: true,
  port: 465,
  auth: {
    user: 'birthdayreminder@zohomail.com',
    pass: 'Cole0108world',
  }
})

const mailOptions = {
  from: 'birthdayreminder@zohomail.com', // sender address
  to: Email,
  subject: "Birthday's Today", // Subject line
  html: message, // plain text body
 };

 transporter.sendMail(mailOptions, function(err, info) {
  if (err) {
 console.log(err);
  }
});
}

module.exports = {
    sendEmail,
    scheduledMail,
}