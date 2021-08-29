"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.controller = void 0;

var _index = require("./utils/index.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Products = /*#__PURE__*/function () {
  function Products() {
    _classCallCheck(this, Products);

    this.products = [];
    this.getProducts = this.getProducts.bind(this);
    this.addUpdateProducts = this.addUpdateProducts.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  _createClass(Products, [{
    key: "getProducts",
    value: function getProducts(req, res) {
      var id = req.params.id;

      if (this.products.length === 0) {
        res.send('No products added.');
      } else {
        if (id == null) {
          res.send(JSON.stringify(this.products));
        } else {
          console.log(id);
          var lookedFor = (0, _index.findProduct)(this.products, id);
          lookedFor !== -1 ? res.send(JSON.stringify(this.products[lookedFor])) : res.send("Product doesn't exist or wrong id typed...");
        }
      }
    }
  }, {
    key: "addUpdateProducts",
    value: function addUpdateProducts(req, res) {
      if ((0, _index.valid)(req.body)) {
        var _req$body = req.body,
            title = _req$body.title,
            price = _req$body.price,
            thumbnail = _req$body.thumbnail;

        if (req.params.id) {
          var id = req.params.id;
          var lookedFor = (0, _index.findProduct)(this.products, id);

          if (lookedFor !== -1) {
            if (title) this.products[lookedFor].title = title;
            if (price) this.products[lookedFor].price = price;
            if (thumbnail) this.products[lookedFor].thumbnail = thumbnail;
            res.send("Product successfully updated! ".concat(JSON.stringify(this.products[lookedFor])));
          } else {
            res.send("Product not found. Please try another id...");
          }
        } else {
          this.products.push({
            title: title,
            price: Number(price),
            thumbnail: thumbnail,
            id: (0, _index.generateID)()
          });
          res.send("Product successfully saved!");
        }
      } else {
        res.send("Please, insert the product properties correctly...");
      }
    }
  }, {
    key: "deleteProduct",
    value: function deleteProduct(req, res) {
      var id = req.params.id;
      var lookedFor = (0, _index.findProduct)(this.products, id);

      if (lookedFor !== -1) {
        var deleted = this.products.splice(lookedFor, 1);
        res.send("Product successfully deleted! ".concat(JSON.stringify(deleted)));
      } else {
        res.send("Product not found. Please try another id...");
      }
    }
  }]);

  return Products;
}();

var controller = new Products();
exports.controller = controller;