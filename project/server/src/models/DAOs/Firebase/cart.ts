import { firestore } from 'firebase-admin';
import {
    DBCartClass,
    ICartProduct,
    INew_Product,
    CUDResponse,
} from '../../../models/products.interface';


export class FireCart implements DBCartClass {
    private cart;
    constructor() {
        const db = firestore();
        this.cart = db.collection('cart');
        this.get().then((products) => {
            if (products.length > 0) {
                const batch = db.batch();
                this.cart.get().then((data) => {
                    const productsData = data.docs;
                    productsData.map((product) => {
                        batch.delete(product.data().id);
                    });
                });
                batch.commit().then(() => console.log(`Cart cleaned.`));
            }
        });
    }

    async get(id?: string | undefined): Promise<ICartProduct[] | []> {
        const data = (await this.cart.get()).docs;
        if (data.length > 0) {
            const products = data.map((productData) => {
                const product = productData.data();
                return {
                    ...product,
                } as ICartProduct;
            });
            return products;
        } else {
            return [];
        }
    }
    async add(id: string, product: INew_Product): Promise<CUDResponse> {
        const result = await this.cart.add({
            product_id: id,
            ...product,
        });
        console.log(result);
        const dataTest = (await result.get()).data();
        if (dataTest) {
            const idTest = dataTest.id;
            console.log(idTest);
            return {
                message: `Product added successfully.`,
                data: {
                    id: id,
                    ...product,
                },
            };
        } else {
            return {
                message: `Couldn't add the product. Try again...`, // This line will be removed once we have analyzed the idTest and the result of the add operation.
                data: [],
            };
        }
    }
    async delete(id: string): Promise<CUDResponse> {
        const result = await this.cart.doc().delete();
        console.log(result);
        return {
            message: `Product deleted successfully`,
            data: deleted[0],
        };
    }
}
