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
    req.checkBody('name', 'Empty name').notEmpty();
    req.checkBody('email', 'Invalid email').isEmail();
    req.checkBody('message', 'Empty message').notEmpty();
    var errors = req.validationErrors();

    if(errors) {
      res.render('contact', {
        title: 'CodeDuo - A platform for sharing code.',
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        errorMessages: errors
      });
    } else {
      var mailOptions = {
        from: 'CodeDuo <no-reply@codeduo.com>',
        to: 'tanmaymohapatra17@gmail.com',
        subject: 'You have a new message from visitor',
        text: req.body.message,
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return console.log(error);
        }
        res.render('thank', { title: 'CodeDuo - A platform for sharing code.' });
      });

    }
  });

module.exports = router;
