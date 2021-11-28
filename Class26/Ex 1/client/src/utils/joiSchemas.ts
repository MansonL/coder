import Joi from "joi";


/**
 *
 * Type of User Object to be stored and query from Mongo.
 *
 */
 export interface IMongoUser extends INew_User {
    _id: string;
}

/**
 *
 * Type of User Object receiving from the frontend.
 *
 */
export interface INew_User {
    [key: string]: string | number;
    timestamp: string;
    user: string;
    name: string;
    surname: string;
    age: number;
    alias: string;
    avatar: string;
}


class Validations {
    public email: Joi.StringSchema
    public message: Joi.StringSchema
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