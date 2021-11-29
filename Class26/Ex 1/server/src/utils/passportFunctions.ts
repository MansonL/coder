
import e, { Request } from "express";
import { IVerifyOptions, VerifyFunctionWithRequest } from "passport-local";
import bcrypt from 'bcrypt'
import { IUser, usersStore } from "../store/store";
import { INew_User } from "../store/store";

export type doneFunction = (error: any, user?: any, options?: IVerifyOptions) => void

export const passportLogin: VerifyFunctionWithRequest = (req: Request, username: string, password: string, done: doneFunction) => {
   console.log(req.body)
    usersStore.findOne(username, (err, user) => {
        if(err) done(err, null);
        if(!user){
            console.log(`Wrong credentials.`);
            return done(null, false, { message: `Wrong credentials.` });
        }else{
            if(!validPassword(user, password)){
                console.log(`Wrong credentials`);
                return done(null, false, { message: "Wrong credentials." });
        }
            return done(null, user)
        }   
    })
}

export const createHash = (password: string): string => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}
export const validPassword = (user: IUser, password: string): boolean => {
    return bcrypt.compareSync(password, user.password)
}