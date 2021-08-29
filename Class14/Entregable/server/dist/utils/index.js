"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findProduct = exports.generateID = exports.valid = void 0;

var valid = function valid(body) {
  var title = body.title,
      price = body.price,
      thumbnail = body.thumbnail;
  return title != '' && price != '' && !isNaN(Number(price)) && thumbnail != '';
};

exports.valid = valid;

var generateID = function generateID() {
  return "_".concat(Math.random().toString(36).substr(2, 9));
};

exports.generateID = generateID;

var findProduct = function findProduct(products, id) {
  return products.findIndex(function (product) {
    return product.id === id;
  });
};

exports.findProduct = findProduct;