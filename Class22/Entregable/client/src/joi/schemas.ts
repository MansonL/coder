import Joi from "joi";

class Validations {
    public email: Joi.StringSchema
    public message: Joi.StringSchema

    constructor(){
        this.email = Joi.string().email({tlds: {allow: true}});
        this.message = Joi.string().min(1)
    }
}

export const validation = new Validations()