import { Document, Model, model, Schema } from 'mongoose';
import {
    INew_Product,
    ICartProduct,
    IProduct,
} from '../../../models/products.interface';

interface INewMongo_Product extends Document, INew_Product {}
interface IMongoCartProduct extends Document, INew_Product {
    product_id: string;
}

const productSchema = new Schema({
    timestamp: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    img: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
});
const cartProductSchema = new Schema({
    product_id: { type: String, required: true },
    timestamp: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    img: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
});
productSchema.set('toJSON', { virtuals: true });
cartProductSchema.set('toJSON', { virtuals: true });
//export interface IMongoProduct extends Omit<IProduct, 'id'> {
//    _id: string;
//}

export const models = {
    products: model<INew_Product, Model<INew_Product>>(
        'products',
        productSchema
    ),
    cart: model<ICartProduct, Model<ICartProduct>>('cart', cartProductSchema),
};
