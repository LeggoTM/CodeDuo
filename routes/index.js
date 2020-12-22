var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CodeDuo - A platform for sharing code.' });
});

router.get('/about', function(req, res, next) {
  res.render('about', {title: 'CodeDuo - A platform for sharing code.'});
});

module.exports = router;
