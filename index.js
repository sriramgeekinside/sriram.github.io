const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  secure: false,
  port: 465,
  secure: false, // use SSL
  auth: {
    user: 'redleafdevpro@gmail.com',
    pass: 'jR%7}L/7m!hGahr*'
  },
  ignoreTLS: true,
  tls: {
    ciphers: 'SSLv3',
    //rejectUnauthorized: false
  }
});

var mailOptions = {
  from: 'redleafdevpro@gmail.com',
  to: 'sriramgeekinside@gmail.com',
  subject: 'Contact received from portfolio',
  html: null
};


app.post('/api/contact', function (req, res) {
  mailOptions.html = `<style>table { border-collapse: collapse; } table, th, td { border: 1px solid black; }</style>
  <table><tr><td style="width:150px;">First name</td><td>${req.body.first_name}</td></tr>
  <tr><td>Last name</td><td>${req.body.last_name}</td></tr>
  <tr><td>Email</td><td>${req.body.email}</td></tr>
  <tr><td>Company</td><td>${req.body.company}</td></tr>
  <tr><td>Message</td><td>${req.body.message}</td></tr>
  </table>`;
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Thanks for contact me');
    }
  });
});
app.listen(process.env.PORT || 9000, function () {
  console.log('Server Started..')
});