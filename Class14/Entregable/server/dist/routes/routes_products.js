"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router_products = void 0;

var _express = _interopRequireDefault(require("express"));

var _class = require("../class");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router_products = _express["default"].Router();
/* ------------------------ ROUTES GET ---------------------------- */


exports.router_products = router_products;
router_products.get("/list", _class.controller.getProducts);
router_products.get("/list/:id", _class.controller.getProducts);
router_products.put("/update/:id", _class.controller.addUpdateProducts);
router_products.post("/save", _class.controller.addUpdateProducts);
router_products["delete"]("/delete/:id", _class.controller.deleteProduct);
/* --------------------------- EXPORT ------------------------------- */