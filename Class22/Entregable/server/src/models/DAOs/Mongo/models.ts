import { Model, model, Schema } from 'mongoose';
import {
    ICartProduct,
    INew_Message,
    INew_Product,
    INew_User,
} from '../../../interfaces/interfaces';
import * as dotenv from 'dotenv';
import moment from 'moment';

dotenv.config();

export const atlasURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@project.lofof.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

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

const messagesSchema = new Schema({
    timestamp: { type: String, required: true },
    user: { type: String, required: true },
    message: { type: String, required: true },
});

const usersSchema = new Schema({
    timestamp: { type: String, required: true },
    user: { type: String, required: true },
});

export const models = {
    products: model<INew_Product, Model<INew_Product>>(
        'products',
        productSchema
    ),
    cart: model<ICartProduct, Model<ICartProduct>>('cart', cartProductSchema),
    messages: model<INew_Message, Model<INew_Message>>(
        'messages',
        messagesSchema
    ),
    users: model<INew_User, Model<INew_User>>('users', usersSchema),
};

export const WelcomeBot = new models.users({
    timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
    user: `Welcome Bot`,
});

export const WelcomeMessage = new models.messages({
    timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
    user: `Welcome Bot`,
    message: `Welcome everyone to my first very simple app.`,
});
