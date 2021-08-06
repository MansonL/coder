"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _class = _interopRequireDefault(require("../class"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express["default"].Router();

var test = new _class["default"]();
test.addUpdateProduct('Roast Beef', 8.99, 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/327DBA15-0C31-4CC6-ABCA-2FCE38AF66CD/Derivates/edb1c351-ed50-4560-a2d1-bf3e0be1a04d.jpg', 'save');
test.addUpdateProduct('Milk', 1.29, 'https://33q47o1cmnk34cvwth15pbvt120l-wpengine.netdna-ssl.com/wp-content/uploads/raw-milk-1-e1563894986431.jpg', 'save');
test.addUpdateProduct('Beans', 0.99, 'https://static.independent.co.uk/2021/01/04/09/iStock-969582980.jpg?width=982&height=726&auto=webp&quality=75', 'save');
router.get('/', function (req, res) {
  res.json("You can access the followings addresses:\n    '/api/products/list',\n    '/api/products/list/id',\n    '/api/products/save/' (to save a product)'");
});
router.get('/products', function (req, res) {
  res.json("Go to one of the followings addresses:\n       '/api/products/list',\n       '/api/products/list/id',\n       '/api/products/save/' (to save a product)',\n       '/api/products/update/id',\n       '/api/products/delete/id'");
});
router.get('/products/list', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var products;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return test.getProducts();

          case 2:
            products = _context.sent;
            res.json(products);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.get('/products/list/:id', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var id, products;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.next = 3;
            return test.getOne(id);

          case 3:
            products = _context2.sent;
            res.json(products);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.post('/products/save', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body, title, price, thumbnail, product;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, title = _req$body.title, price = _req$body.price, thumbnail = _req$body.thumbnail;
            _context3.next = 3;
            return test.addUpdateProduct(title, price, thumbnail, 'save');

          case 3:
            _context3.next = 5;
            return test.getOne(test.products.length);

          case 5:
            product = _context3.sent;
            res.json("Last product saved was: ".concat(product));

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.put('/products/update/:id', function (req, res) {
  var _req$body2 = req.body,
      title = _req$body2.title,
      price = _req$body2.price,
      thumbnail = _req$body2.thumbnail;
  console.log(req.body); //let id = req.params.id;
  //await test.addUpdateProduct(title,price,thumbnail,'update',id);
  //let product = await test.getOne(id);
  //res.json(`Last product updated was: ${product}`);
});
router["delete"]('/products/delete/:id', function (req, res) {});
var _default = router;
exports["default"] = _default;