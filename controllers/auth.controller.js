const passport = require("passport");

const passportSignup = passport.authenticate("signup", {
  session: true
});

const signup = (req, res, next) => {
  res.redirect("/");
};

const passportLogin = (req, res, next) => {
  passport.authenticate("login", (err, user, info) => {
    if (err) {
      return res.json(err);
    }
    if (!user) {
      return res.render("pages/login", {
        ...req.body,
        error: info
      });
    }
    req.login(
      user, {
        session: true
      },
      error => {
        if (error) return next(error);
        return res.redirect("/");
      }
    );
  })(req, res, next);
};

/*
Reference: https://scotch.io/@devGson/api-authentication-with-json-web-tokensjwt-and-passport
*/

module.exports = {
  passportSignup,
  passportLogin,
  signup
};
