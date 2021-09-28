import knex, { Knex } from 'knex';
import { DBCartClass } from '../../../products.interface';
import dbConfig from '../../../../../knexfile'
import { IKnex } from '../../../../common/interfaces';

class SQLCart implements DBCartClass {
    private db : Knex;
    constructor(type: 'mysql' | 'SQLITE3') {
        const options = type === 'mysql' ? process.env.NODE_ENV || 'development' : 'development2';
        const config : IKnex = dbConfig;
        this.db = knex(config[options]);
        const existsCart = this.db.schema.hasTable('carts');
        if (!existsCart) {
            this.db.schema.createTable('carts', (carts) => {
                carts.increments('id');
                carts.timestamp('timestamp').defaultTo(this.db.fn.now());
                carts.string('name').notNullable();
            });
        }
    }
}
