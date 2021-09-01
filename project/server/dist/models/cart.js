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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var EErrors_1 = __importDefault(require("../common/EErrors"));
var path_1 = __importDefault(require("path"));
var utils_1 = require("../utils/utils");
var products_1 = require("./products");
var cartFile = path_1.default.resolve(__dirname, '../../cart.json');
var NoProducts = EErrors_1.default.NoProducts, ProductNotFound = EErrors_1.default.ProductNotFound;
var Cart = /** @class */ (function () {
    function Cart() {
    }
    Cart.prototype.getOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var products, productsJSON, lookedFor, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs_1.promises.readFile(cartFile, 'utf-8')];
                    case 1:
                        products = _a.sent();
                        if ((0, utils_1.productsExist)(products)) {
                            productsJSON = JSON.parse(products);
                            lookedFor = (0, utils_1.findProduct)(productsJSON, id);
                            if (lookedFor != null)
                                return [2 /*return*/, lookedFor];
                            throw { error: ProductNotFound, message: "Wrong id or product isn't at cart..." };
                        }
                        else {
                            throw { error: NoProducts, message: "No products added to the cart." };
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        throw e_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Cart.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var products, productsJSON, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs_1.promises.readFile(cartFile, 'utf-8')];
                    case 1:
                        products = _a.sent();
                        if ((0, utils_1.productsExist)(products)) {
                            productsJSON = JSON.parse(products);
                            return [2 /*return*/, productsJSON];
                        }
                        else {
                            throw { error: NoProducts, message: "No products added to the cart." };
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        throw e_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Cart.prototype.add = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var products, productsJSON, lookedFor, cartProducts, cartProductsJSON, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 11, , 12]);
                        return [4 /*yield*/, fs_1.promises.readFile(products_1.productsFile, 'utf-8')];
                    case 1:
                        products = _a.sent();
                        if (!(0, utils_1.productsExist)(products)) return [3 /*break*/, 9];
                        productsJSON = JSON.parse(products);
                        lookedFor = (0, utils_1.findProduct)(productsJSON, id);
                        if (!(lookedFor != null)) return [3 /*break*/, 7];
                        return [4 /*yield*/, fs_1.promises.readFile(cartFile, 'utf-8')];
                    case 2:
                        cartProducts = _a.sent();
                        cartProductsJSON = void 0;
                        if (!(cartProducts !== '')) return [3 /*break*/, 4];
                        cartProductsJSON = JSON.parse(cartProducts);
                        cartProductsJSON.push(lookedFor);
                        return [4 /*yield*/, fs_1.promises.writeFile(cartFile, JSON.stringify(cartProductsJSON, null, '\t'))];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        cartProductsJSON = [lookedFor];
                        return [4 /*yield*/, fs_1.promises.writeFile(cartFile, JSON.stringify(cartProductsJSON, null, '\t'))];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/, { message: "Product added to the cart successfully!", data: lookedFor }];
                    case 7: throw { error: ProductNotFound, message: "Wrong id or product doesn't exist..." };
                    case 8: return [3 /*break*/, 10];
                    case 9: throw { error: NoProducts, message: "No products available to add to the cart.." };
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        e_3 = _a.sent();
                        throw e_3;
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    ;
    Cart.prototype.deleteProduct = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var cartProducts, cartProductsJSON, lookedFor, arrayID, deleted, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, fs_1.promises.readFile(cartFile, 'utf-8')];
                    case 1:
                        cartProducts = _a.sent();
                        if (!(0, utils_1.productsExist)(cartProducts)) return [3 /*break*/, 5];
                        cartProductsJSON = JSON.parse(cartProducts);
                        lookedFor = (0, utils_1.findProduct)(cartProductsJSON, id);
                        if (!(lookedFor != null)) return [3 /*break*/, 3];
                        arrayID = cartProductsJSON.indexOf(lookedFor);
                        deleted = cartProductsJSON.splice(arrayID, 1)[0];
                        return [4 /*yield*/, fs_1.promises.writeFile(cartFile, JSON.stringify(cartProductsJSON, null, '\t'))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { message: "Product deleted from the cart successfully", data: deleted }];
                    case 3: throw { error: ProductNotFound, message: "Wrong id or the product isn't at the cart..." };
                    case 4: return [3 /*break*/, 6];
                    case 5: throw { error: NoProducts, message: "The cart is empty..." };
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        e_4 = _a.sent();
                        throw e_4;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return Cart;
}());
var cartModel = new Cart();
exports.default = cartModel;
//# sourceMappingURL=cart.js.map