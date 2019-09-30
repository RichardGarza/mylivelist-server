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
      console.log("newUser");
      // If there's an error, respond accordingly.
      if (err) {
        if (err.message) {
          error = err.message;
        } else {
          error = err;
        }
        console.log("err", err);
        res.json({
          authenticated: false,
          err: `${error}`,
          userId: undefined
        });
      } else {
        passport.authenticate("local")(req, res, () => {
          if (!req.user) {
            console.log("123");
            res.json({
              authenticated: false,
              err: `User Created, Login Failed.`,
              userId: user.id
            });
          } else {
            console.log("918237", req.user);
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
    console.log("STARTED");
    // Make newUser object from request body.
    newUser = {
      email: req.body.email,
      password: req.body.password
    };

    // Call createuser with newUser object.
    userQueries.getUser(newUser, (err, result) => {
      let user = result["user"];
      console.log("newUser", user);
      // If there's an error, respond accordingly.
      if (err) {
        if (err.message) {
          error = err.message;
        } else {
          error = err;
        }
        console.log("err", err);
        res.json({
          authenticated: false,
          err: `${error}`,
          userId: undefined
        });
      } else {
        passport.authenticate("local")(req, res, () => {
          if (!req.user) {
            console.log("123");
            res.json({
              authenticated: false,
              err: `User Created, Login Failed.`,
              userId: user.id
            });
          } else {
            console.log("918237", req.user);
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
