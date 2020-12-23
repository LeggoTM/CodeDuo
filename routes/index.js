var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');
var config = require('../config');
var transporter = nodemailer.createTransport(config.mailer);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'CodeDuo - A platform for sharing code.' });
});

router.get('/about', function (req, res, next) {
  res.render('about', { title: 'CodeDuo - A platform for sharing code.' });
});

router.route('/contact')
  .get(function (req, res, next) {
    res.render('contact', { title: 'CodeDuo - A platform for sharing code.' });
  })
  .post(function (req, res, next) {



    var mailOptions = {
      from: 'CodeDuo <no-reply@codeduo.com>',
      to: 'tanmaymohapatra17@gmail.com',
      subject: 'You have a new message from visitor',
      text: req.body.message,
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error);
      }
      res.render('thank', { title: 'CodeDuo - A platform for sharing code.' });
    })



  });


router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login your account' });
});

router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Registe a new account' });
});

module.exports = router;
