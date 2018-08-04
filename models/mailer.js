var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ducksk64@gmail.com',
      pass: 'Sammy123!'
    }
  });
  
  var mailReceived = {
    from: 'ducksk64@gmail.com',
    //variable for email input
    //to: 'myfriend@yahoo.com',
    subject: 'Support Update',
    text: 'Ticket Recieved'
  };
  
  //var mailInProgress = {
    //from: 'ducksk64@gmail.com',
    //variable for email input
    //to: 'myfriend@yahoo.com',
    //subject: 'Support Update',
    //text: 'Ticket In Progress'
  //};
  
  //var mailCompleted = {
    //from: 'ducksk64@gmail.com',
    //variable for email input
    //to: 'myfriend@yahoo.com',
    //subject: 'Support Update',
    //text: 'Ticket Completed'
  //};
  
  transporter.sendMail(mailReceived, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  
  transporter.sendMail(mailInOProgress, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  
  transporter.sendMail(mailCompleted, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });