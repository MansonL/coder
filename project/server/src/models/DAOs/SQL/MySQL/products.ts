import {
    CUDResponse,
    DBProductsClass,
    INew_Product,
    IProduct,
    IQuery,
} from '../../../products.interface';
import dbConfig from '../../../../../knexfile';
import { IKnex } from '../../../../common/interfaces';
import knex, { Knex } from 'knex';
import { utils } from '../../../../utils/utils';

export class SQLProducts implements DBProductsClass {
    private db: Knex;
    constructor(type: 'SQLITE3' | 'mysql') {
        const options =
            type === 'mysql'
                ? process.env.NODE_ENV || 'development'
                : 'development2';
        const config: IKnex = dbConfig;
        this.db = knex(config[options]);
        this.db.schema
            .hasTable('products')
            .then((existsProducts) => {
                if (!existsProducts) {
                    this.db.schema.createTable('products', (products) => {
                        products.increments('id');
                        products
                            .timestamp('timestamp')
                            .defaultTo(this.db.fn.now());
                        products.string('title').notNullable();
                        products.string('description').notNullable();
                        products.string('code').notNullable();
                        products.string('img').notNullable();
                        products
                            .decimal('price', 6, 2)
                            .unsigned()
                            .notNullable();
                        products.integer('stock').notNullable();
                    });
                }
            })
            .then(() => console.log(`Products table created.`))
            .catch((e) => console.log(e));
    }
    async get(id?: string | undefined): Promise<IProduct[] | []> {
        console.log(`Getting products...`);
        if (id != null) {
            const product: IProduct[] | [] = await this.db<IProduct>(
                'products'
            ).where({
                id: id,
            });
            if (product.length > 0) return product;
            return [];
        } else {
            const products: IProduct[] | [] = await this.db<IProduct>(
                'products'
            );
            return products;
        }
    }
    async add(product: INew_Product): Promise<CUDResponse> {
        console.log(`Adding product...`);
        const result = await this.db<IProduct>('products').insert(product);
        const result2: IProduct[] = await this.db<IProduct>('products').where({
            code: product.code,
        });
        console.log(result);
        console.log(result2);
        return { message: `Product added successfully.`, data: result2[0] };
    }
    async update(id: string, data: INew_Product): Promise<CUDResponse> {
        console.log(`Updating product...`);
        const result = await this.db<IProduct>('products')
            .update(data)
            .where({ id: id });
        const product = await this.get(id);
        console.log(result);
        console.log(product);
        return { message: `Product updated successfully.`, data: product[0] };
    }
    async delete(id: string): Promise<CUDResponse> {
        console.log(`Deleting product...`);
        const deleted = await this.get(id);
        const result = await this.db<IProduct>('products')
            .where({ id: id })
            .del();
        console.log(result);
        console.log(deleted);
        return { message: `Product deleted successfully`, data: deleted[0] };
    }
    async query(options: IQuery): Promise<IProduct[] | []> {
        console.log(`Getting query...`);
        const products: IProduct[] = await this.get();
        const results = await utils.query(products, options);
        if (results.length > 0) return results;
        return [];
    }
}
