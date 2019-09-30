const userQueries = require("../queries/userQueries");
const passport = require("passport");

module.exports = {
  create(req, res, next) {
    // Make newUser object from request body.
    newUser = {
      email: req.body.email,
      password: req.body.password
    };

    // Call createuser with newUser object.
    userQueries.createUser(newUser, (err, user) => {
      // If there's an error, respond accordingly.
      if (err) {
        if (err.message) {
          error = err.message;
        } else {
          error = err;
        }
        res.json({
          authenticated: false,
          err: `${error}`,
          userId: undefined
        });
      } else {
        passport.authenticate("local")(req, res, () => {
          if (!req.user) {
            res.json({
              authenticated: false,
              err: `User Created, Login Failed.`,
              userId: user.id
            });
          } else {
            res.json({
              authenticated: true,
              err: null,
              userId: user.id
            });
          }
        });
      }
    });
  },
  login(req, res, next) {
    passport.authenticate("local")(req, res, () => {
      if (!req.user) {
        res.json({
          authenticated: false,
          err: `Authentication Failed.`,
          userId: user.id
        });
      } else {
        res.json({
          authenticated: true,
          err: null,
          userId: user.id
        });
      }
    });
  }
};
