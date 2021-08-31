"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var products_1 = require("../controllers/products");
var isAdmin_1 = __importDefault(require("../middleware/isAdmin"));
var router_products = express_1.default.Router();
/* ------------------------ ROUTES ---------------------------- */
router_products.get('/list', isAdmin_1.default, products_1.getAll);
router_products.get('/list/:id', isAdmin_1.default, products_1.getOne);
router_products.put('/update/:id', isAdmin_1.default, products_1.modifyProduct);
router_products.post('/save', isAdmin_1.default, products_1.saveProduct);
router_products.delete('/delete/:id', isAdmin_1.default, products_1.wipeProduct);
/* --------------------------- EXPORT ------------------------------- */
exports.default = router_products;
//# sourceMappingURL=routes_products.js.map