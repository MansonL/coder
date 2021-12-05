"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsFactory = exports.MemoryType = void 0;
const products_1 = require("./DAOs/Mongo/products");
/**
 *
 * Different types of memory storage
 *
 */
var MemoryType;
(function (MemoryType) {
    MemoryType["MongoAtlas"] = "Mongo-Atlas";
    MemoryType["LocalMongo"] = "Local-Mongo";
})(MemoryType = exports.MemoryType || (exports.MemoryType = {}));
/**
 *
 *
 * Factory of Products DAOs
 *
 * This class will return the selected type of memory storage
 *
 *
 */
class ProductsFactory {
    static get(type) {
        switch (type) {
            case MemoryType.MongoAtlas:
                console.log(`Using MongoAtlas`);
                return new products_1.MongoProducts('atlas');
            case MemoryType.LocalMongo:
                console.log(`Using Local Mongo`);
                return new products_1.MongoProducts('local');
            default:
                console.log(`DEFAULT: MongoAtlas`);
                return new products_1.MongoProducts('atlas');
        }
    }
}
exports.ProductsFactory = ProductsFactory;
