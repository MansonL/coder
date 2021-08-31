"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_products_1 = __importDefault(require("./routes_products"));
var routes_cart_1 = __importDefault(require("./routes_cart"));
var router = express_1.default.Router();
router.use('/products', routes_products_1.default);
router.use('/cart', routes_cart_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map