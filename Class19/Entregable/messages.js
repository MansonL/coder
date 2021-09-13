"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fsPromises = require("fs/promises");
var moment = require("moment");
var path = require("path");
var axios_1 = require("axios");
var messagesPath = path.resolve(__dirname + '/messages.json');
var newMessages = function () { return __awaiter(void 0, void 0, void 0, function () {
    var quotes, messages;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1["default"].get('https://goquotes-api.herokuapp.com/api/v1/random?count=10')];
            case 1: return [4 /*yield*/, (_a.sent()).data.quotes];
            case 2:
                quotes = _a.sent();
                messages = quotes.map(function (messages) { return messages.text; });
                return [2 /*return*/, messages];
        }
    });
}); };
var newUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var users, i, _a, first, last;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                users = [];
                i = 0;
                _b.label = 1;
            case 1:
                if (!(i < 10)) return [3 /*break*/, 4];
                return [4 /*yield*/, axios_1["default"].get('https://randomuser.me/api/')];
            case 2:
                _a = (_b.sent()).data.results[0].name, first = _a.first, last = _a.last;
                users.push(first + last);
                _b.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, users];
        }
    });
}); };
var addMessages = function () { return __awaiter(void 0, void 0, void 0, function () {
    var messages, users, chat;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, newMessages()];
            case 1:
                messages = _a.sent();
                return [4 /*yield*/, newUsers()];
            case 2:
                users = _a.sent();
                chat = users.map(function (user, idx) { return ({
                    time: moment().format('LLL'),
                    user: user,
                    message: messages[idx]
                }); });
                return [4 /*yield*/, fsPromises.writeFile(messagesPath, JSON.stringify(chat, null, '\t'))];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
addMessages();
