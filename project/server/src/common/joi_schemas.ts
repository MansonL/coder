import Joi from 'joi';
import { MemoryType } from '../models/products.factory';
import { storage } from '../apis/index';
import { INew_Product, IQuery, IUpdate } from '../models/products.interface';

class Validations {
    newProduct: Joi.ObjectSchema<INew_Product>;
    update: Joi.ObjectSchema<IUpdate>;
    query: Joi.ObjectSchema<IQuery>;
    id: Joi.StringSchema | Joi.NumberSchema;
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
        this.update = Joi.object<IUpdate>({
            title: Joi.string().alphanum().min(4).max(30),
            description: Joi.string().alphanum().min(10).max(60),
            img: Joi.string().uri(),
            code: Joi.string().alphanum().min(5).max(30),
            price: Joi.number().min(0.01),
            stock: Joi.number().min(0),
        });
        this.query = Joi.object<IQuery>({
            title: Joi.string().alphanum().allow(''),
            code: Joi.string().alphanum().allow(''),
            price: {
                minPrice: Joi.number().min(0.01).max(Infinity),
                maxPrice: Joi.number().min(0).max(Infinity),
            },
            stock: {
                minStock: Joi.number().min(0).max(Infinity),
                maxStock: Joi.number().min(0).max(Infinity),
            },
        });
        /**
         * Simple JOI Schema to validate ids used to update or query products
         */
        //if (storage === 'MySQL' || storage === 'SQLite') {
          //  this.id = Joi.number().min(1).required();
        //} else {
            this.id = Joi.string().min(2).required();
        //}
    }
}
export const validator = new Validations();
