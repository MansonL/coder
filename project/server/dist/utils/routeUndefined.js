"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var EErrors_1 = __importDefault(require("../common/EErrors"));
var RouteUndefined = EErrors_1.default.RouteUndefined;
var availableRoutes = "\n'/products/list': show available products.\n'/products/list/id': show the product you want by typing the product id.\n'/products/update/id': to update a product with its corresponding id.\n'/products/save': to save a product.\n'/products/delete/id': to delete a product with its id.\n\n'/cart/list': to list the products in the cart.\n'/cart/list/id': to show a product in the cart by its id.\n'/cart/delete/id': to delete a product from the cart by typing its id.\n'/cart/add/id': to add a product to the cart with its id.";
var unknownRoute = function (req, res) {
    res.status(404).json({ error: RouteUndefined, message: "The route doesn't exist, please try the followings: " + availableRoutes + " " });
};
exports.default = unknownRoute;
//# sourceMappingURL=routeUndefined.js.map