"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
var up = function (knex) {
    return knex.schema
        .createTable('users', function (users) {
        users.increments('id');
        users.string('user');
    })
        .createTable('messages', function (messages) {
        messages.increments('id');
        messages.string('time');
        messages.string('user');
        messages.string('message');
        messages.integer('user_id').unsigned().references('id').inTable('users');
    });
};
exports.up = up;
var down = function (knex) {
    return knex.schema.dropTable('users').dropTable('messages');
};
exports.down = down;
