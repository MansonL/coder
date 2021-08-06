"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _routes = _interopRequireDefault(require("./routes/routes.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*  INITIALIZING SERVER AT PORT 8080     */
var PORT = 8080;
var APP = (0, _express["default"])();

var publicPath = _path["default"].resolve(__dirname, '../public/index.html');

APP.use(_express["default"].json());
APP.use(_express["default"].urlencoded({
  extended: true
}));
var SERVER = APP.listen(PORT, function () {
  console.log("Hi! This server is hosted at PORT: ".concat(SERVER.address().port));
});
SERVER.on('error', function (error) {
  console.log("Error: ".concat(error));
});
APP.use('/api', _routes["default"]);
APP.use(_express["default"]["static"](publicPath));
console.log(publicPath);