"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
var seed = function (knex) {
    var welcome = {
        time: (0, moment_1.default)().format('MM D YYYY HH mm ss'),
        user: 'Welcome Bot',
        message: 'Welcome everyone to my Message API chat.',
    };
    return knex.table('messages').del().insert(welcome);
};
