import { Knex } from "knex";
const up = (knex: Knex) => {
    return knex.schema.createTable('users', users => {
        users.increments();
        users.string('user');
    }).createTable('messages', (messages) => {
        messages.increments();
        messages.string('time');
        messages.string('user');
        messages.string('message');
        messages.integer('user_id').unsigned().references('id').inTable('users');
    })
};
const down = (knex: Knex) => {
    return knex.schema.dropTable('users').dropTable('messages');
};

export { up, down };
