import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    const existsProducts = await knex.schema.hasTable('products');
    const existsCart = await knex.schema.hasTable('cart');
    if (!existsProducts) {
        await knex.schema.createTable('products', (products) => {
            products.increments('id');
            products.timestamp('timestamp').defaultTo(knex.fn.now());
            products.string('title').notNullable();
            products.text('description', 'longText').notNullable();
            products.string('code').notNullable();
            products.string('img').notNullable();
            products.decimal('price', 6, 2).unsigned().notNullable();
            products.integer('stock').notNullable();
        });
    }
    if (!existsCart) {
        await knex.schema.createTable('cart', (cart) => {
            cart.increments('id');
            cart.timestamp('timestamp').defaultTo(knex.fn.now());
            cart.string('title').notNullable();
            cart.string('description').notNullable();
            cart.string('code').notNullable();
            cart.string('img').notNullable();
            cart.decimal('price', 6, 2).unsigned().notNullable();
            cart.integer('stock').notNullable();
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('products');
}
