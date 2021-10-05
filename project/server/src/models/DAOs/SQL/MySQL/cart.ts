import knex, { Knex } from 'knex';
import {
    CUDResponse,
    DBCartClass,
    ICartProduct,
    INew_Product,
} from '../../../products.interface';
import dbConfig from '../../../../../knexfile';
import { IKnex } from '../../../../common/interfaces';
import { IProduct } from '../../../products.interface';

export class SQLCart implements DBCartClass {
    private db: Knex;
    constructor(type: 'mysql' | 'SQLITE3') {
        const options =
            type === 'mysql'
                ? process.env.NODE_ENV || 'development'
                : 'development2';
        const config: IKnex = dbConfig;
        this.db = knex(config[options]);
        this.db.schema
            .hasTable('cart')
            .then((existsCart) => {
                if (!existsCart) {
                    this.db.schema.createTable('cart', (cart) => {
                        cart.increments('id');
                        cart.timestamp('timestamp').defaultTo(this.db.fn.now());
                        cart.string('title').notNullable();
                        cart.string('description').notNullable();
                        cart.string('code').notNullable();
                        cart.string('img').notNullable();
                        cart.decimal('price', 6, 2).unsigned().notNullable();
                        cart.integer('stock').notNullable();
                    });
                }
            })
            .then(() => {
                console.log(`Cart table created.`);
            })
            .catch((e) => console.log(e));
             this.init();
    }
    async init(): Promise<void> {
        await this.db<ICartProduct>('cart').del();
        console.log(`Cart cleaned.`)
    }
    async get(id?: string | undefined): Promise<ICartProduct[] | []> {
        if (id != null) {
            const product: ICartProduct[] = await this.db<ICartProduct>(
                'cart'
            ).where({
                product_id: Number(id),
            });
            return product;
        } else {
            const products: ICartProduct[] = await this.db<ICartProduct>(
                'cart'
            );
            return products;
        }
    }
    async add(id: string, product: INew_Product): Promise<CUDResponse> {
        const cartProduct: ICartProduct = {
            product_id: Number(id),
            ...product,
        };
        await this.db<ICartProduct>('cart').insert(cartProduct);
        return {
            message: `Product successfully added.`,
            data: { id: Number(id), ...product },
        };
    }
    async delete(id: string): Promise<CUDResponse> {
        const product: IProduct[] = await this.db<IProduct>('products').where({
            id: Number(id),
        });
        const result = await this.db<ICartProduct>('cart')
            .where({ product_id: Number(id) })
            .del();
        console.log(result);
        return { message: `Product successfully deleted`, data: product[0] };
    }
}
