"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _http = require("http");

var _moment = _interopRequireDefault(require("moment"));

var app = (0, _express["default"])();
var server = (0, _http.createServer)(app);
var PORT = process.argv[2] ? Number(process.argv[2]) : 8080;
server.listen(PORT, function () {
  console.log("Server hosted at PORT: ".concat(PORT));
});
app.get('/', function (req, res) {
  res.send("Express server at port ".concat(PORT, " - PID ").concat(process.pid, " - ").concat((0, _moment["default"])().format("YYYY-MM-DD hh:mm:ss")));
});