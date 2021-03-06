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
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsApi = exports.ProductsApi = exports.storage = void 0;
const productsFactory_1 = require("../models/productsFactory");
/**
 *
 * ApiProducts Class: here we are receiving the type of storage
 * & connecting with the product controller
 *
 */
exports.storage = productsFactory_1.MemoryType.MongoAtlas;
class ProductsApi {
    constructor() {
        this.products = productsFactory_1.ProductsFactory.get(exports.storage);
    }
    getProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id != null) {
                const result = yield this.products.get(id);
                return result;
            }
            else {
                const result = yield this.products.get();
                return result;
            }
        });
    }
    addProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.products.add(product);
            return result;
        });
    }
    updateProduct(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.products.update(id, product);
            return result;
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.products.delete(id);
            return result;
        });
    }
    query(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.products.query(options);
            return result;
        });
    }
}
exports.ProductsApi = ProductsApi;
exports.productsApi = new ProductsApi();
