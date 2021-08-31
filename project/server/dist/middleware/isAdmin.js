"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var EErrors_1 = __importDefault(require("../common/EErrors"));
var NotAuthorizedUser = EErrors_1.default.NotAuthorizedUser;
var isAdmin = true;
var checkAdmin = function (req, res, next) {
    if (isAdmin) {
        next();
    }
    else {
        res.status(401).send({
            error: NotAuthorizedUser,
            message: "User doesn't have permission to access to the requested resource..."
        });
    }
};
exports.default = checkAdmin;
//# sourceMappingURL=isAdmin.js.map