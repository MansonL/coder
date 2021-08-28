"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.controller = void 0;

function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var valid = function valid(body) {
  var _body = _slicedToArray(body, 3),
      title = _body[0],
      price = _body[1],
      thumbnail = _body[2];

  return title != '' && price != '' && !isNaN(Number(price)) && thumbnail != '';
};

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
      this.products.length === 0 ? res.send("No products added.") : id == null ? res.send(this.products) : res.send(this.products[id]);
    }
  }, {
    key: "addUpdateProducts",
    value: function addUpdateProducts(req, res) {
      if (valid(req.body)) {
        var _req$body = _slicedToArray(req.body, 3),
            title = _req$body[0],
            price = _req$body[1],
            thumbnail = _req$body[2];

        if (req.params.id) {
          var id = req.params.id;

          if (this.products[id]) {
            if (title) this.products[id].title = title;
            if (price) this.products[id].price = price;
            if (thumbnail) this.products[id].thumbnail = thumbnail;
            res.send("Product successfully updated! ".concat(this.products[id]));
          } else {
            res.send("Product not found. Please try another id...");
          }
        } else {
          this.products.push({
            title: title,
            price: price,
            thumbnail: thumbnail,
            id: this.products.length + 1
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
      var id = --req.params.id;

      if (this.products[id]) {
        var deleted = this.products.splice(id, 1);
        this.products.forEach(function (product) {
          if (product.id > (+id, _readOnlyError("id"))) product.id -= 1;
        });
        res.send("Product successfully deleted! ".concat(deleted));
      } else {
        res.send("Product not found. Please try another id...");
      }
    }
  }]);

  return Products;
}();

var controller = new Products();
exports.controller = controller;