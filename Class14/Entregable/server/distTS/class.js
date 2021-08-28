"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
var valid = function (body) {
    var title = body[0], price = body[1], thumbnail = body[2];
    return title != '' && price != '' && !isNaN(Number(price)) && thumbnail != '';
};
var Products = /** @class */ (function () {
    function Products() {
        this.products = [];
        this.getProducts = this.getProducts.bind(this);
        this.addUpdateProducts = this.addUpdateProducts.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }
    Products.prototype.getProducts = function (req, res) {
        var id = req.params.id;
        this.products.length === 0
            ? res.send("No products added.")
            : id == null
                ? res.send(this.products)
                : res.send(this.products[Number(id)]);
    };
    ;
    Products.prototype.addUpdateProducts = function (req, res) {
        if (valid(req.body)) {
            var _a = req.body, title = _a[0], price = _a[1], thumbnail = _a[2];
            if (req.params.id) {
                var id = Number(req.params.id);
                if (this.products[id]) {
                    if (title)
                        this.products[id].title = title;
                    if (price)
                        this.products[id].price = price;
                    if (thumbnail)
                        this.products[id].thumbnail = thumbnail;
                    res.send("Product successfully updated! " + this.products[id]);
                }
                else {
                    res.send("Product not found. Please try another id...");
                }
            }
            else {
                this.products.push({
                    title: title,
                    price: price,
                    thumbnail: thumbnail,
                    id: this.products.length + 1,
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
        var id = Number(req.params.id);
        if (this.products[id]) {
            var deleted = this.products.splice(id - 1, 1);
            this.products.forEach(function (product) {
                if (product.id > (id + 1))
                    product.id -= 1;
            });
            res.send("Product successfully deleted! " + deleted);
        }
        else {
            res.send("Product not found. Please try another id...");
        }
    };
    return Products;
}());
var controller = new Products();
exports.controller = controller;
