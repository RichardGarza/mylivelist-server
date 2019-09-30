const User = require("../models").User;
const Store = require("../models").Store;
const bcrypt = require("bcryptjs");

module.exports = {
  createUser(newUser, callback) {
    console.log("2", newUser);
    if (newUser.password.length < 5 || newUser.password.length > 12) {
      let err = {
        message:
          "Validation error: Password must be between 5 and 12 characters."
      };
      return callback(err);
    } else {
      const salt = bcrypt.genSaltSync();
      const hashedPassword = bcrypt.hashSync(newUser.password, salt);

      return User.create({
        email: newUser.email,
        password: hashedPassword
      })
        .then(user => {
          callback(null, user);
        })
        .catch(err => {
          callback(err);
        });
    }
  },

  getUser(newUser, callback) {
    let result = {};
    let { email } = newUser;

    User.findOne({ where: { email } }).then(user => {
      if (!user) {
        callback(404);
      } else {
        result["user"] = user;

        Store.scope({ method: ["allStoresFor", user.id] })
          .findAll()
          .then(stores => {
            result["stores"] = stores;
          })
          .catch(err => {
            console.log(err);
          });
      }
      callback(null, result);
    });
  }
};
