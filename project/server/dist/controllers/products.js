"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wipeProduct = exports.modifyProduct = exports.saveProduct = exports.getAll = exports.getOne = void 0;
var index_1 = require("../utils/index");
var products_1 = __importDefault(require("../models/products"));
var EErrors_1 = __importDefault(require("../common/EErrors"));
var moment_1 = __importDefault(require("moment"));
var getProduct = products_1.default.getProduct, getProducts = products_1.default.getProducts, addProduct = products_1.default.addProduct, updateProduct = products_1.default.updateProduct, deleteProduct = products_1.default.deleteProduct;
var PropertiesIncorrect = EErrors_1.default.PropertiesIncorrect, IdIncorrect = EErrors_1.default.IdIncorrect, NoProducts = EErrors_1.default.NoProducts, ProductNotFound = EErrors_1.default.ProductNotFound;
var getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, getProducts()];
            case 1:
                products = _a.sent();
                if (products.length > 0) {
                    res.json({ data: products });
                }
                else {
                    throw { error: NoProducts, message: "No products added." };
                }
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                res.status(404).json(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAll = getAll;
var getOne = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, product, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, getProduct(id)];
            case 1:
                product = _a.sent();
                if (product != undefined) {
                    res.json({ data: product });
                }
                else {
                    throw { error: ProductNotFound, message: "Wrong id or product doesn't exist..." };
                }
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                res.status(400).json(e_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getOne = getOne;
var saveProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product, result, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!(0, index_1.validSave)(req.body)) return [3 /*break*/, 2];
                product = __assign({ id: (0, index_1.generateID)(), timestamp: (0, moment_1.default)().format('DD/MM/YYYY HH:mm:ss') }, req.body);
                product.stock = Number(product.stock);
                product.price = Number(product.price);
                return [4 /*yield*/, addProduct(product)];
            case 1:
                result = _a.sent();
                if (result)
                    res.json(result);
                return [3 /*break*/, 3];
            case 2: throw { error: PropertiesIncorrect, message: "Please, set your products properties correctly..." };
            case 3: return [3 /*break*/, 5];
            case 4:
                e_3 = _a.sent();
                res.status(422).json(e_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.saveProduct = saveProduct;
var modifyProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, newProperties, result, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                id = req.params.id;
                if (!((0, index_1.validUpdate)(req.body) && id !== '')) return [3 /*break*/, 2];
                newProperties = req.body;
                newProperties.stock = Number(newProperties.stock);
                newProperties.price = Number(newProperties.price);
                return [4 /*yield*/, updateProduct(id, newProperties)];
            case 1:
                result = _a.sent();
                if (result)
                    res.json(result);
                return [3 /*break*/, 3];
            case 2: throw { error: PropertiesIncorrect, message: "Please, set your products properties correctly or input an id..." };
            case 3: return [3 /*break*/, 5];
            case 4:
                e_4 = _a.sent();
                res.status(422).json(e_4);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.modifyProduct = modifyProduct;
var wipeProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                id = req.params.id;
                if (!(id !== '')) return [3 /*break*/, 2];
                return [4 /*yield*/, deleteProduct(id)];
            case 1:
                result = _a.sent();
                if (result)
                    res.json(result);
                return [3 /*break*/, 3];
            case 2: throw { error: IdIncorrect, message: "Please, insert a valid id..." };
            case 3: return [3 /*break*/, 5];
            case 4:
                e_5 = _a.sent();
                res.status(422).json(e_5);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.wipeProduct = wipeProduct;
//# sourceMappingURL=products.js.map