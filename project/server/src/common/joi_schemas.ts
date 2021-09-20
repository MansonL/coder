import Joi from 'joi';
import { INew_Product, IQueryOrUpdate } from '../models/products.interface';

class Validations {
    newProduct: Joi.ObjectSchema<INew_Product>;
    update: Joi.ObjectSchema<IQueryOrUpdate>;
    id: Joi.StringSchema;
    constructor() {
        /**
         * JOI Schema to validate the objects to be saved from the frontend
         */
        this.newProduct = Joi.object<INew_Product>({
            title: Joi.string().alphanum().min(4).max(30).required(),
            description: Joi.string().alphanum().min(10).max(60),
            img: Joi.string().uri().required(),
            price: Joi.number().min(0.01).required(),
            stock: Joi.number().min(0).required(),
        });
        /**
         * JOI Schema to validate the objects from the frontend for updates
         */
        this.update = Joi.object<IQueryOrUpdate>({
            title: Joi.string().alphanum().min(4).max(30),
            description: Joi.string().alphanum().min(10).max(60),
            img: Joi.string().uri(),
            price: Joi.number().min(0.01),
            stock: Joi.number().min(0),
        });
        /**
         * Simple JOI Schema to validate ids used to update or query products
         */
        this.id = Joi.string().min(2).required();
    }
}
export const validator = new Validations();
