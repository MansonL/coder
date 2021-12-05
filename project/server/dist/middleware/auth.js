"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../controller/auth");
const passport_1 = __importDefault(require("../passport/passport"));
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post('/signup', (req, res, next) => {
    passport_1.default.authenticate('signup', function (err, user, info) {
        if (err) {
            return res.status(500).send(err);
        }
        if (user) {
            return res.status(201).send(user);
        }
        return res.send(info);
    })(req, res, next);
});
exports.authRouter.post('/login', (req, res, next) => {
    passport_1.default.authenticate('login', function (err, user, info) {
        if (err) {
            return res.status(500).send(err);
        }
        if (user) {
            return res.status(201).send(user);
        }
        return res.send(info);
    })(req, res, next);
});
exports.authRouter.get('/login', auth_1.authController.login);
exports.authRouter.get('/logout', auth_1.authController.logout);
exports.authRouter.get('/signup', auth_1.authController.signup);
