import { Knex } from 'knex';
import moment from 'moment';
import { utils } from '../../src/utils/utils';
import { mockProducts } from '../../src/models/DAOs/mockProducts';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('products').del();

    // Inserts seed entries
    await knex('products').insert(
        mockProducts.map((product) => {
            product.timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
            product.code = utils.generateCode();
            return product;
        })
    );
    console.log(`Mock data inserted!`);
}
