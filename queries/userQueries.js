const User = require("../models").User;
const Store = require("../models").Store;
const bcrypt = require("bcryptjs");

module.exports = {
  createUser(newUser, callback) {
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

  getUser(id, callback) {
    let result = {};

    User.findByPk(id).then(user => {
      if (!user) {
        callback(404);
      } else {
        result["user"] = user;

        Store.scope({ method: ["allStoresFor", id] })
          .findAll()
          .then(stores => {
            result["stores"] = stores;
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  }
};
