
import { Request } from "express";
import { IVerifyOptions, VerifyFunctionWithRequest } from "passport-local";
import bcrypt from 'bcrypt'
import { IUser, usersStore } from "../store/store";
import uuid from 'uuid'

export type doneFunction = (error: any, user?: any, options?: IVerifyOptions) => void

export const passportSignup : VerifyFunctionWithRequest = (req: Request, username: string, password: string, done: doneFunction) => {
    usersStore.findOne(username, (err, user) => {
        if(err){
            console.log(`Error at signup ` + err)
            return done(err)
        }
        if(user){
            console.log(`There's an existing user with the username ${username}`);
            return done(null, false, { message: `There's an existing user with the username ${username}` })
        }else{
            const newUser : IUser = {
                timestamp: req.body.timestamp,
                _id: uuid.v4(),
                user: username,
                password: createHash(password),
                name: req.body.name,
                surname: req.body.surname,
                avatar: req.body.avatar,
                age: req.body.age,
                alias: req.body.alias,
            };
            usersStore.saveOne(newUser, (err, user) => {
                if(err){
                    console.log(`Error at saving user ` + err);
                    done(err)
                }else{
                    done(null, user)
                }
                    
            })
        }
    })
};

export const passportLogin: VerifyFunctionWithRequest = (req: Request, username: string, password: string, done: doneFunction) => {
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

const createHash = (password: string): string => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}
const validPassword = (user: IUser, password: string): boolean => {
    return bcrypt.compareSync(password, user.password)
}