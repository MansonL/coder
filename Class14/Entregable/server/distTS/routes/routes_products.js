"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router_products = void 0;
var express_1 = __importDefault(require("express"));
var class_1 = require("../class");
var router_products = express_1.default.Router();
exports.router_products = router_products;
/* ------------------------ ROUTES GET ---------------------------- */
router_products.get("/list", class_1.controller.getProducts);
router_products.get("/list/:id", class_1.controller.getProducts);
router_products.put("/update/:id", class_1.controller.addUpdateProducts);
router_products.post("/save", class_1.controller.addUpdateProducts);
router_products.delete("/delete/:id", class_1.controller.deleteProduct);
