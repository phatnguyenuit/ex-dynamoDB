const jwt = require('jsonwebtoken');
const dynamoose = require('dynamoose');
const UserSchema = require('../model/user.model');
const {
  jwtSecret,
  jwtExpiresIn
} = require('../config/config');

const {
  encryptText,
  compareEncrypted
} = require('../helpers/crypto');


const signup = async (req, res, next) => {
  const {
    userName,
    password,
    name,
    address
  } = req.body;
  const User = dynamoose.model("User", UserSchema);
  User.scan({
    userName: {
      eq: userName
    },
  }, async (error, results) => {
    if (error) {
      next(error);
    }
    if (!results.count) {
      const hashedPassword = await encryptText(password);
      const newUser = new User({
        userName,
        name,
        address,
        password: hashedPassword,
      })
      await newUser.save();
      const token = jwt.sign({
        userId: newUser.id,
        userName: newUser.userName
      }, jwtSecret, {
        expiresIn: jwtExpiresIn
      });
      res.send({
        token
      })
    } else {
      next({
        name: 'Existed Data',
        message: 'User existed!'
      })
    }
  });

}

const login = async (req, res, next) => {
  const {
    userName,
    password,
  } = req.body;
  const User = dynamoose.model("User", UserSchema);
  User.scan({
    userName: {
      eq: userName
    },
  }, async (error, results) => {
    if (error) {
      next(error);
    }
    if (results.count === 1) {
      const searchedUser = results[0];
      const matchedPassword = await compareEncrypted(password, searchedUser.password);
      if (matchedPassword) {
        res.send({
          loggedIn: true,
          token: jwt.sign({
            userId: searchedUser.id,
            userName: searchedUser.userName
          }, jwtSecret, {
            expiresIn: jwtExpiresIn
          })
        })
      } else {
        next({
          name: 'NotMatchData',
          message: 'Wrong password!'
        })
      }
    } else {
      next({
        name: 'NotFoundData',
        message: 'Wrong user name!'
      })
    }
  });
}

const getUserInfo = async (req, res, next) => {
  const User = dynamoose.model("User", UserSchema);
  User.get({
    id: req.user.userId,
  }).then(({
    userName,
    address,
    name
  }) => {
    res.send({
      userName,
      name,
      address
    })
  }).catch(e => next(e))

}

module.exports = {
  signup,
  login,
  getUserInfo
};
