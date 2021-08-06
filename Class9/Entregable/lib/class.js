"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Postman = /*#__PURE__*/function () {
  function Postman() {
    _classCallCheck(this, Postman);

    this.products = [];
  }

  _createClass(Postman, [{
    key: "getProducts",
    value: function () {
      var _getProducts = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.products.length === 0 ? {
                  error: 'No products saved.'
                } : this.products);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getProducts() {
        return _getProducts.apply(this, arguments);
      }

      return getProducts;
    }()
  }, {
    key: "getOne",
    value: function () {
      var _getOne = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", _typeof(this.products[id]) === 'object' ? this.products[id] : "Couldn't find any product. Try another id starting on 0...");

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getOne(_x) {
        return _getOne.apply(this, arguments);
      }

      return getOne;
    }()
  }, {
    key: "addUpdateProduct",
    value: function () {
      var _addUpdateProduct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var title,
            price,
            thumbnail,
            type,
            id,
            _id,
            _args3 = arguments;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                title = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : null;
                price = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : null;
                thumbnail = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : null;
                type = _args3.length > 3 ? _args3[3] : undefined;
                id = _args3.length > 4 && _args3[4] !== undefined ? _args3[4] : null;
                _context3.prev = 5;
                _context3.t0 = type;
                _context3.next = _context3.t0 === 'save' ? 9 : _context3.t0 === 'update' ? 18 : 19;
                break;

              case 9:
                if (!(typeof title !== 'string')) {
                  _context3.next = 11;
                  break;
                }

                throw new Error('Title must be a string');

              case 11:
                if (!(typeof price !== 'number')) {
                  _context3.next = 13;
                  break;
                }

                throw new Error('Price must be a number');

              case 13:
                if (!(typeof thumbnail !== 'string')) {
                  _context3.next = 15;
                  break;
                }

                throw new Error('Thumbnail must be an URL string');

              case 15:
                _id = this.products.length;
                this.products.push({
                  title: title,
                  price: price,
                  thumbnail: thumbnail,
                  id: _id
                });
                return _context3.abrupt("break", 19);

              case 18:
                return _context3.abrupt("break", 19);

              case 19:
                _context3.next = 24;
                break;

              case 21:
                _context3.prev = 21;
                _context3.t1 = _context3["catch"](5);
                console.error(_context3.t1);

              case 24:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[5, 21]]);
      }));

      function addUpdateProduct() {
        return _addUpdateProduct.apply(this, arguments);
      }

      return addUpdateProduct;
    }()
  }]);

  return Postman;
}();

exports["default"] = Postman;