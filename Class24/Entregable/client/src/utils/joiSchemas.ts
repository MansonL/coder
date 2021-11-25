import Joi from "joi";
import { INew_Product, INew_User } from "../../../server/src/interfaces/interfaces";

class Validations {
    public email: Joi.StringSchema
    public message: Joi.StringSchema
    public newProduct: Joi.ObjectSchema<INew_Product>
    public user: Joi.ObjectSchema<INew_User>
    public login: Joi.ObjectSchema
    constructor(){
        /**
         * JOI Schema to validate user email.
         */
        this.email = Joi.string().email({tlds: {allow: false}});
        
        /**
         * JOI Schema to validate a no whitespace message to be sent.
         */
        this.message = Joi.string().min(1);
        
        /**
        * JOI Schema to validate the objects to send with the save product request.
        */
       this.newProduct = Joi.object<INew_Product>({
           timestamp: Joi.string().required(),
           title: Joi.string()
               .min(4)
               .max(100)
               .required()
               .pattern(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/),
           description: Joi.string()
               .min(10)
               .max(1000)
               .pattern(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/),
           code: Joi.string().min(5).required(),
           img: Joi.string().uri().required(),
           price: Joi.number().min(0.01).required(),
           stock: Joi.number().min(0).required(),
       });
       /**
         * JOI Schema to validate users.
         */
        this.user = Joi.object<INew_User>({
            timestamp: Joi.string().required(),
            user: Joi.string().email({ tlds: { allow: false } }),
            name: Joi.string().min(4).max(20).required(),
            surname: Joi.string().min(4).max(20).required(),
            age: Joi.number().min(10).max(100).required(),
            alias: Joi.string().min(5).max(35),
            avatar: Joi.string().uri(),
        });
        /**
         * 
         * Joi Schema to validate login. // To be modified and merge with user in future
         * 
         */
        this.login = Joi.object({
            user: Joi.alternatives().try(Joi.string().min(5), Joi.string().email({ tlds: { allow: false } })).required(),
            password: Joi.string().min(6).required()
        })
    }
}

export const validation = new Validations()