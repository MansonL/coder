"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cart_1 = require("../controllers/cart");
var router_cart = express_1.default.Router();
/* --------------------- ROUTES ---------------------------------- */
router_cart.get('/list', cart_1.getCart);
router_cart.get('/list/:id', cart_1.getProduct);
router_cart.post('/add/:id', cart_1.addToCart);
router_cart.delete('/delete/:id', cart_1.deleteFromCart);
/* --------------------------- EXPORT ------------------------------- */
exports.default = router_cart;
//# sourceMappingURL=routes_cart.js.map