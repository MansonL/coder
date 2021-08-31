"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findProduct = exports.generateID = exports.validUpdate = exports.validSave = void 0;
var validSave = function (body) {
    var title = body.title, description = body.description, code = body.code, img = body.img, stock = body.stock, price = body.price;
    return title !== '' && description !== '' && code !== '' && img !== '' && !isNaN(price) && !isNaN(stock);
};
exports.validSave = validSave;
var validUpdate = function (body) {
    var title = body.title, description = body.description, code = body.code, img = body.img, stock = body.stock, price = body.price;
    return title !== '' || description !== '' || code !== '' || img !== '' || !isNaN(stock) || isNaN(stock) || isNaN(price);
};
exports.validUpdate = validUpdate;
var generateID = function () {
    return "_" + Math.random().toString(36).substr(2, 9);
};
exports.generateID = generateID;
var findProduct = function (products, id) {
    return products.find(function (product) { return product.id === id; });
};
exports.findProduct = findProduct;
//# sourceMappingURL=index.js.map