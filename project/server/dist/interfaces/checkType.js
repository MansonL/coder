"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCUDResponse = exports.isInternalError = exports.isMessages = exports.isUser = exports.isProduct = exports.isCartProduct = void 0;
const isCartProduct = (data) => {
    return 'product_id' in data[0];
};
exports.isCartProduct = isCartProduct;
const isProduct = (data) => {
    return '_id' in data[0];
};
exports.isProduct = isProduct;
const isUser = (data) => {
    return 'username' in data[0];
};
exports.isUser = isUser;
const isMessages = (data) => {
    return 'author' in data[0];
};
exports.isMessages = isMessages;
const isInternalError = (data) => {
    return 'error' in data;
};
exports.isInternalError = isInternalError;
const isCUDResponse = (data) => {
    return 'data' in data;
};
exports.isCUDResponse = isCUDResponse;
