const express = require("express");
const appConfig = require("./appConfig/main-config");

const app = express();

appConfig.init(app, express);

module.exports = app;
