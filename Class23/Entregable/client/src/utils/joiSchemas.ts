import Joi from "joi";
import { INew_Product } from "../../../server/src/interfaces/interfaces";

class Validations {
    public email: Joi.StringSchema
    public message: Joi.StringSchema
    public newProduct: Joi.ObjectSchema<INew_Product>
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
    }
}

export const validation = new Validations()