const userQueries = require("../queries/userQueries");
const passport = require("passport");

module.exports = {
  create(req, res, next) {
    console.log("UserController Start");
    // Make newUser object from request body.
    newUser = {
      email: req.body.email,
      password: req.body.password
    };

    // Call createuser with newUser object.
    userQueries.createUser(newUser, (err, user) => {
      console.log("UserQueries Callback Start", err, user, newUser);
      // If there's an error, respond accordingly.
      if (err) {
        console.log("TESTING TESTING ", err);
        if (err.message) {
          res.json({
            authenticated: false,
            err: `${err.message}`,
            userId: undefined
          });
        } else {
          res.json({
            authenticated: false,
            err: `${err}`,
            userId: undefined
          });
        }
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
