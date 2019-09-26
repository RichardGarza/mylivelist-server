const passportConfig = require("./passport-config");
const routeConfig = require("./route-config");
const cors = require("cors");
const createError = require("http-errors");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

module.exports = {
  init(app, express) {
    // Cross Origin Resourse Sharing (Required to share resources as API)
    app.use(cors());

    // Logger
    app.use(logger("dev"));

    // Express setup
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, "public")));

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      next(createError(404));
    });

    // error handler
    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render("error");
    });

    // Additional Config
    passportConfig.init(app);
    routeConfig.init(app);
  }
};
