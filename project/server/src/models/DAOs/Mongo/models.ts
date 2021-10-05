import { Document, Model, model, Schema } from 'mongoose';
import {
    INew_Product,
    ICartProduct,
    IProduct,
} from '../../../models/products.interface';
import * as dotenv from 'dotenv';

dotenv.config()
export const atlasURI = `mongodb+srv://${process.env.DB_ATLAS_USER}:${process.env.DB_ATLAS_PASS}@project.lofof.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

export const mongoURI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:27018/${process.env.DB_NAME}`;

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
