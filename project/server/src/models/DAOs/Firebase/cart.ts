import * as admin from 'firebase-admin';
import {
    DBCartClass,
    ICartProduct,
    INew_Product,
    CUDResponse,
    IProduct,
} from '../../../models/products.interface';


export class FireCart implements DBCartClass {
    private cart;
    constructor() {
        const db = admin.firestore();
        this.cart = db.collection('cart');
        this.get().then((products) => {
            if (products.length > 0) {
                const batch = db.batch();
                this.cart.get().then((data) => {
                    const productsData = data.docs;
                    productsData.map((product) => {
                        batch.delete(product.ref);
                    });
                    batch.commit().then(() => console.log(`Cart cleaned.`));
                });
                
            }
        });
    }

    async get(id?: string | undefined): Promise<ICartProduct[] | []> {
        if(id != null){
            const data = await this.cart.where('product_id', '==', id).get();
            if(!data.empty){
                const product = data.docs.map(product => {
                 return {
                  ...product.data()  
                 } as ICartProduct
                })
                return product
            }else{
                return []
            }
        }else{
            const data = await this.cart.get();
            if(!data.empty){
                const products = data.docs.map(product => {
                    const fields = product.data();
                    return {
                        ...fields
                    } as ICartProduct
                })
                return products
            }else{
                return []
            }
        }
    }
    async add(id: string, product: INew_Product): Promise<CUDResponse> {
        const resultSnapShot = await (await this.cart.add({
            product_id: id,
            ...product,
        })).get();
        if (resultSnapShot.exists) {
            return {
                message: `Product added successfully.`,
                data: {
                    id: id,
                    ...product,
                },
            };
        } else {
            return {
                message: `Couldn't add the product. Try again...`,
                data: [],
            };
        }
    }
    async delete(id: string): Promise<CUDResponse> {
        const cartQuery = (await this.cart.where('product_id', '==', id).get()).docs
        const productID = cartQuery[0].id
        await this.cart.doc(productID).delete();
        const result = cartQuery.map(cartProduct => {
            const data = cartProduct.data();
            const {id, product_id, ...product} = data;
            return product as IProduct
        })[0];
        return {
            message: `Product deleted successfully`,
            data: result,
        };
    }
}
