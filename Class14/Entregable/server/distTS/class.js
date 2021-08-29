"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
var index_1 = require("./utils/index");
var Products = /** @class */ (function () {
    function Products() {
        this.products = [];
        this.getProducts = this.getProducts.bind(this);
        this.addUpdateProducts = this.addUpdateProducts.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }
    Products.prototype.getProducts = function (req, res) {
        var id = req.params.id;
        if (this.products.length === 0) {
            res.send('No products added.');
        }
        else {
            if (id == null) {
                res.send(JSON.stringify(this.products));
            }
            else {
                console.log(id);
                var lookedFor = (0, index_1.findProduct)(this.products, id);
                lookedFor !== -1 ? res.send(JSON.stringify(this.products[lookedFor])) : res.send("Product doesn't exist or wrong id typed...");
            }
        }
    };
    ;
    Products.prototype.addUpdateProducts = function (req, res) {
        if ((0, index_1.valid)(req.body)) {
            var _a = req.body, title = _a.title, price = _a.price, thumbnail = _a.thumbnail;
            if (req.params.id) {
                var id = req.params.id;
                var lookedFor = (0, index_1.findProduct)(this.products, id);
                if (lookedFor !== -1) {
                    if (title)
                        this.products[lookedFor].title = title;
                    if (price)
                        this.products[lookedFor].price = price;
                    if (thumbnail)
                        this.products[lookedFor].thumbnail = thumbnail;
                    res.send("Product successfully updated! " + JSON.stringify(this.products[lookedFor]));
                }
                else {
                    res.send("Product not found. Please try another id...");
                }
            }
            else {
                this.products.push({
                    title: title,
                    price: Number(price),
                    thumbnail: thumbnail,
                    id: (0, index_1.generateID)()
                });
                res.send("Product successfully saved!");
            }
        }
        else {
            res.send("Please, insert the product properties correctly...");
        }
    };
    ;
    Products.prototype.deleteProduct = function (req, res) {
        var id = req.params.id;
        var lookedFor = (0, index_1.findProduct)(this.products, id);
        if (lookedFor !== -1) {
            var deleted = this.products.splice(lookedFor, 1);
            res.send("Product successfully deleted! " + JSON.stringify(deleted));
        }
        else {
            res.send("Product not found. Please try another id...");
        }
    };
    return Products;
}());
var controller = new Products();
exports.controller = controller;
