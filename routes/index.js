const express = require('express');
const authController = require("../controllers/auth.controller");
const isLoggedIn = require('../middlewares/isLoggedIn');

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

// POST /signup
router.post("/signup", authController.signup, );

// POST /login
router.post("/login", authController.login);

/* GET user info. */
router.get('/me', isLoggedIn, authController.getUserInfo);

module.exports = router;
