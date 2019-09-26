const User = require("./models").User;
const Store = require("./models").Store;
const bcrypt = require("bcryptjs");

module.exports = {
  createUser(newUser, callback) {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

    if (newUser.email === "admin@secretsaucyness.com") {
      return User.create({
        email: newUser.email,
        password: hashedPassword,
        role: "admin"
      })
        .then(user => {
          callback(null, user);
        })
        .catch(err => {
          callback(err);
        });
    } else {
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
