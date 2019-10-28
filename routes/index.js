const express = require('express');
const authController = require("../controllers/auth.controller");

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

// POST /signup
router.post("/signup", authController.passportSignup, authController.signup);

// POST /login
router.post("/login", authController.passportLogin);

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
