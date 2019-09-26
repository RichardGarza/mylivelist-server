module.exports = {
  init(app) {
    const indexRoutes = require("../routes/index");
    const userRoutes = require("../routes/users");
    const storeRoutes = require("../routes/stores");

    // In testing environment, use fake authorization
    if (process.env.NODE_ENV === "test") {
      const mockAuth = require("../spec/support/mock-auth");
      mockAuth.fakeIt(app);
    }

    app.use(indexRoutes);
    app.use(userRoutes);
    app.use(storeRoutes);
  }
};
