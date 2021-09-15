"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var cors_1 = __importDefault(require("cors"));
var routes_1 = __importDefault(require("./routes"));
var socket_io_1 = require("socket.io");
var app = (0, express_1.default)();
var server = http_1.default.createServer(app);
var PORT = 8080;
server.listen(PORT, function () { return console.log("Server hosted at PORT: " + PORT); });
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use('/', routes_1.default);
var io = new socket_io_1.Server(server);
console.log(io);
io.on('connection', function (socket) {
    console.log('New client connected!');
    io.sockets.emit('renderAll');
    socket.on('saveMessage', function () {
        console.log('Updating messages');
        io.sockets.emit('updateMessages');
    });
    socket.on('saveUser', function () {
        console.log('Updating users');
        io.sockets.emit('updateUsers');
    });
});
