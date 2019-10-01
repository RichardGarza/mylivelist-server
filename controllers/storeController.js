const storeQueries = require("../queries/storeQueries");

module.exports = {
  create(req, res, next) {
    console.log("CREATING STORE", req.body);
    // Make newUser object from request body.
    newStore = {
      userId: parseInt(req.body.userId),
      name: req.body.name
    };

    // Call createuser with newUser object.
    storeQueries.createStore(newStore, (err, store) => {
      console.log("newStore");
      // If there's an error, respond accordingly.
      if (err) {
        if (err.message) {
          error = err.message;
        } else {
          error = err;
        }
        console.log("STORE ERROR", err);
        res.json({ err: `${error}`, store: undefined });
      } else {
        res.json({ err: null, store });
      }
    });
  },
  getAll(req, res, next) {
    // Make newUser object from request body.
    const userId = req.body.userId;

    // Call createuser with newUser object.
    storeQueries.getAll(userId, (err, stores) => {
      console.log("AllStores");
      // If there's an error, respond accordingly.
      if (err) {
        if (err.message) {
          error = err.message;
        } else {
          error = err;
        }
        console.log("STORE Retrieval ERROR", err);
        res.json({ err: `${error}`, stores: [] });
      } else {
        res.json({ err: null, stores });
      }
    });
  }
};
