"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var index_1 = __importDefault(require("./routes/index"));
var cors_1 = __importDefault(require("cors"));
var routeUndefined_1 = __importDefault(require("./utils/routeUndefined"));
/* --------------------------- SERVER, APP & SOCKET ----------------------------- */
var app = (0, express_1.default)();
var server = http_1.default.createServer(app);
var PORT = 8080;
server.listen(PORT, function () { return console.log("Server hosted at PORT: " + PORT); });
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use("/", index_1.default);
app.use(routeUndefined_1.default);
//# sourceMappingURL=server.js.map