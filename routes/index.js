var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

// POST /signup
router.post('/signup', function (req, res) {
  res.send(req.body)
})

// POST /login
router.post('/login', function (req, res) {
  res.send(req.body)
})

/* GET user info. */
router.get('/me', function (req, res, next) {
  res.send({
    userId: '1',
    userName: 'fastnguyen',
    password: 'thisIsFastNguyen',
    name: 'Fast Nguyen',
    address: 'Vietnam'
  })
});

module.exports = router;
