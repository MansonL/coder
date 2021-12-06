import Joi from "joi";
import moment from "moment";
import { INew_User } from "../../../server/src/interfaces/interfaces";

const maxDate = moment().subtract(10, 'y').format('MM/DD/YYYY');
const minDate = moment().subtract(99, 'y').format('MM/DD/YYYY');

class Validations {
    public email: Joi.StringSchema
    public user: Joi.ObjectSchema<INew_User>
    public login: Joi.ObjectSchema
    constructor(){
        /**
         * JOI Schema to validate user email.
         */
        this.email = Joi.string().email({tlds: {allow: false}});
        /*
         * JOI Schema to validate users.
         */
        this.user = Joi.object<INew_User>({
            timestamp: Joi.string().required(),
            username: Joi.string().email({ tlds: { allow: false } }).required(),
            name: Joi.string().min(4).max(20).required(),
            surname: Joi.string().min(4).max(20).required(),
            password: Joi.string().alphanum().min(6).max(20).required(),
            age: Joi.date().min(minDate).max(maxDate).required(),
            alias: Joi.string().min(5).max(35).optional(),
            avatar: Joi.string().uri().required(),
        });
        /**
         * 
         * Joi Schema to validate login. // To be modified and merge with user in future
         * 
         */
        this.login = Joi.object({
            username: Joi.string().email({ tlds: { allow: false } }).required(),
            password: Joi.string().min(6).required()
        })
    }
}

export const validation = new Validations()