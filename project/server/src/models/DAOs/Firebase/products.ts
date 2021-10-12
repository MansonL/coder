import {
    DBProductsClass,
    IProduct,
    INew_Product,
    CUDResponse,
    IUpdate,
    IQuery,
} from '../../../models/products.interface';
import * as admin from 'firebase-admin';
import serviceAccount from './firebase.json';
import { ServiceAccount } from 'firebase-admin';
import { utils } from '../../../utils/utils';
import { mockProducts } from '../mockProducts';

export class FireProducts implements DBProductsClass {
    private products;
    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount as ServiceAccount),
        });
        const db = admin.firestore();
        this.products = db.collection('products');
        this.products.get().then(oldData => {
            const batch = db.batch();
            oldData.forEach(data => batch.delete(data.ref))
            batch.commit().then(() => console.log(`Products cleaned.`))
        })
        this.get().then((product) => {
                const batch = db.batch();
                mockProducts.forEach((mockProduct) => {
                    const ref = this.products.doc();
                    batch.set(ref, mockProduct);
                });
                batch
                    .commit()
                    .then(() => console.log(`Mock products inserted`));
            
        });
    }
    async get(id?: string | undefined): Promise<IProduct[] | []> {
        if (id != null) {
            const data = await this.products.doc(id).get();
            const dataID = data.id;
            const productData = data.data()
            if (data.exists) {
                const product = {
                    id: dataID as string,
                    ...productData,
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
                        id: data.id as string,
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
        const resultSnapShot = await (await this.products.add(newProduct)).get();
        const resultID = resultSnapShot.id;
        const result = resultSnapShot.data()
        if (result) {
            const data = {
                id: resultID,
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
        const result = (await this.products.get()).docs;
        const products = result.map(product => {
            const data = product.data();
            return {
                id: product.id,
                ...data
            } as IProduct
        });
        const queryResult : IProduct[] | [] = utils.query(products, options)
        console.log(queryResult)
        return queryResult
    }
}
