import {
    DBProductsClass,
    IProduct,
    INew_Product,
    CUDResponse,
    IUpdate,
    IQuery,
} from '../../../models/products.interface';
import {
    initializeApp,
    ServiceAccount,
    firestore,
    credential,
} from 'firebase-admin';
import serviceAccount from './ecommerce-bfca0-firebase-adminsdk-lrcdg-4f02ec25d6.json';
import { utils } from '../../../utils/utils';
import { mockProducts } from '../mockProducts';

export class FireProducts implements DBProductsClass {
    private products;
    constructor() {
        initializeApp({
            credential: credential.cert(serviceAccount as ServiceAccount),
        });
        const db = firestore();
        this.products = db.collection('products');
        this.get().then((product) => {
            if (product.length > 0) {
                const batch = db.batch();
                mockProducts.forEach((product) => {
                    const ref = this.products.doc();
                    batch.set(ref, product);
                });
                batch
                    .commit()
                    .then(() => console.log(`Mock products inserted`));
            }
        });
    }
    async get(id?: string | undefined): Promise<IProduct[] | []> {
        if (id != null) {
            const data = await (await this.products.doc(id).get()).data();
            if (data) {
                const product = {
                    id: data.id as string,
                    ...data,
                } as IProduct;
                return [product];
            } else {
                return [];
            }
        } else {
            const data = (await this.products.get()).docs;
            if (data) {
                const products = data.map((data) => {
                    const product = data.data();
                    return {
                        id: product.id,
                        ...product,
                    } as IProduct;
                });
                return products;
            } else {
                return [];
            }
        }
    }
    async add(newProduct: INew_Product): Promise<CUDResponse> {
        const result = await (
            await (await this.products.add(newProduct)).get()
        ).data();
        if (result) {
            const data = {
                id: result.id,
                ...result,
            } as IProduct;
            return {
                message: `Product successfully saved.`,
                data: data,
            };
        } else {
            return {
                message: `Couldn't save product. Something happened.`,
                data: [],
            };
        }
    }
    async update(id: string, data: IUpdate): Promise<CUDResponse> {
        const oldProduct = (await this.get(id))[0];
        if (oldProduct) {
            const newProduct: IProduct = {
                id: id,
                title: oldProduct.title,
                timestamp: oldProduct.timestamp,
                description: oldProduct.description, // Need to modify this when data from update have been analyzed
                code: oldProduct.code,
                img: oldProduct.img,
                stock: oldProduct.stock,
                price: oldProduct.price,
            };
            const result = await this.products.doc(id).update(data);
            console.log(result);
            return {
                message: `Product successfully updated.`,
                data: newProduct,
            };
        } else {
            return {
                message: `The product couldn't been updated`,
                data: [],
            };
        }
    }
    async delete(id: string): Promise<CUDResponse> {
        const deleted: IProduct[] = await this.get(id);
        const result = await this.products.doc(id).delete();
        console.log(result);
        return {
            message: `Product deleted successfully`,
            data: deleted[0],
        };
    }
    async query(options: IQuery): Promise<IProduct[] | []> {
        const result = this.products.get()
    }
}
