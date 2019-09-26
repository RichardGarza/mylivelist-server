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
      // If there's an error, display it and redirect to sign up.
      if (err) {
        res.json({
          authenticated: false,
          err: `${err.message}`,
          userId: user.id
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
  }
};
