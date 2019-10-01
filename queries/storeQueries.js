const Store = require("../models").Store;

module.exports = {
  createStore(newStore, callback) {
    console.log("Called");

    console.log("2Store", newStore);

    if (newStore.name.length < 3 || newStore.name.length > 15) {
      let err = {
        message:
          "Validation error: Store Name must be between 3 and 15 characters."
      };
      return callback(err);
    } else {
      return Store.create(newStore)
        .then(user => {
          callback(null, user);
        })
        .catch(err => {
          callback(err);
        });
    }
  },
  getAll(userId, callback) {
    console.log("Called");

    if (userId === null || userId === undefined) {
      let err = {
        message: "Validation error: UserId must be valid to retrieve stores."
      };
      return callback(err);
    } else {
      return Store.findAll({ where: { userId } })
        .then(user => {
          callback(null, user);
        })
        .catch(err => {
          callback(err);
        });
    }
  }
};
