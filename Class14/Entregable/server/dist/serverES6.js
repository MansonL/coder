"use strict";

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _socket = _interopRequireDefault(require("socket.io"));

var _routes_products = require("./routes/routes_products");

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* --------------------------- SERVER, APP & SOCKET ----------------------------- */
var app = (0, _express["default"])();

var server = _http["default"].createServer(app);

var PORT = 8080;
server.listen(PORT, function () {
  return console.log("Server hosted at PORT: ".concat(server.address().port));
});
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _cors["default"])());
app.use("/products", _routes_products.router_products);