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
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var models_1 = require("./models");
var uri = "mongodb+srv://mansonl_00:lautaro123@20practice.q4rlk.mongodb.net/20Practice?retryWrites=true&w=majority";
var CRUD = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Connecting to the DB");
                return [4 /*yield*/, (0, mongoose_1.connect)(uri)];
            case 1:
                _a.sent();
                return [4 /*yield*/, models_1.default.deleteMany({})];
            case 2:
                _a.sent();
                return [4 /*yield*/, models_1.default.insertMany([
                        { name: 'Pedro', surname: 'Mei', age: 21, DNI: '31155898', course: '1A', grade: 7 },
                        { name: 'Ana', surname: 'Gonzalez', age: 32, DNI: '27651878', course: '1A', grade: 8 },
                        { name: 'José', surname: 'Picos', age: 29, DNI: '34554398', course: '2A', grade: 6 },
                        { name: 'Lucas', surname: 'Blanco', age: 22, DNI: '30355874', course: '3A', grade: 10 },
                        { name: 'María', surname: 'García', age: 36, DNI: '29575148', course: '1A', grade: 9 },
                        { name: 'Federico', surname: 'Perez', age: 41, DNI: '320118321', course: '2A', grade: 5 },
                        { name: 'Tomas', surname: 'Sierra', age: 19, DNI: '38654790', course: '2B', grade: 4 },
                        { name: 'Carlos', surname: 'Fernández', age: 33, DNI: '26935670', course: '3B', grade: 2 },
                        { name: 'Fabio', surname: 'Pieres', age: 39, DNI: '4315388', course: '1B', grade: 9 },
                        { name: 'Daniel', surname: 'Gallo', age: 25, DNI: '37923460', course: '3B', grade: 2 }
                    ])];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
CRUD();
