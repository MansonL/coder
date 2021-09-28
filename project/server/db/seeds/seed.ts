import { Knex } from 'knex';
import { mockProducts } from '../../src/models/DAOs/mockProducts';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('table_name').del();

    // Inserts seed entries
    await knex('table_name').insert(mockProducts);
}
