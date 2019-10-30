const jwt = require('jsonwebtoken');
const {
  jwtSecret
} = require('../config/config');

const isLoggedIn = (req, res, next) => {
  let token =
    req.headers['x-access-token'] || req.headers['authorization'] || '';
  token = token.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (e) {
    next({
      name: 'AuthenticationError',
      message: 'Missing authentication.'
    });
  }

};
module.exports = isLoggedIn;
