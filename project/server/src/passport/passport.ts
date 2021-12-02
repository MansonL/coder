import { Request } from "express";
import { IStrategyOptionsWithRequest, IVerifyOptions, VerifyFunctionWithRequest } from "passport-local";
import bcrypt from 'bcrypt'
import passport from "passport";
import passportLocal from 'passport-local'
import { CUDResponse, IMongoUser, INew_User, InternalError } from "../interfaces/interfaces";
import { usersApi } from "../api/users";
import { ApiError } from "../utils/errorApi";
import { isCUDResponse, isUser } from "../interfaces/checkType";


declare global {
    namespace Express {
        interface User extends IMongoUser {}
    }
}

export type doneFunction = (error: any, user?: any, options?: IVerifyOptions) => void

/**
 * 
 * 
 * Login & SignUp Passport Functions
 * 
 *  
 */

export const passportLogin: VerifyFunctionWithRequest = async (req: Request, username: string, password: string, done: doneFunction) => {
    console.log('Inside passportLogin');
    const result : IMongoUser | ApiError | InternalError = await usersApi.getUserByUsername(username);
    if(isUser(result)){
        if(validPassword(result, password)){
            return done(null, {
                data: result,
                message: "Successfully logged in!"
            })
        }else{
            return done(null, null, `Wrong credentials`);
        }
    }else if(result instanceof ApiError){
        return done(null, null, result.message);
    }else{
        return done(result)
    }
 }
 
 export const passportSignUp : VerifyFunctionWithRequest = async (req: Request, username: string, password: string, done: doneFunction) => {
        console.log('Inside passportSignUp')     
        console.log('\n----------------- REQ BODY -------------------------\n');
        console.log(req.body);
        const firstResult : IMongoUser | ApiError | InternalError = await usersApi.getUserByUsername(username);
        if(isUser(firstResult)){
            return done(null, null, `The email submitted is already in use.`);
        }else if(firstResult instanceof ApiError){
            const newUser : INew_User = {
                timestamp: req.body.timestamp,
                username: username,
                password: createHash(password),
                name: req.body.name,
                surname: req.body.surname,
                age: req.body.age,
                alias: req.body.alias,
                avatar: req.body.avatar,
            };
            const result : CUDResponse | InternalError = await usersApi.addUser(newUser);
            if(isCUDResponse(result)){
                return done(null, result)
            }else{
                return done(result)  // Internal Error sent, generated at the attempt to register a new user.
            }
        }else{
            return done(firstResult) // Internal Error sent, generated at the search of an existing user with the submitted username.
        }
 }
 
/**
 * Function for encrypting user password
 * @param password to encrypt
 * @returns password encrypted
 */

 export const createHash = (password: string): string => {
     return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
 }

 /**
  * 
  * @param user IUser object which contains encripted password
  * @param password password submitted from frontend
  * @returns true if matches, false if it doesn't matches
  */
 export const validPassword = (user: IMongoUser, password: string): boolean => {
     return bcrypt.compareSync(password, user.password)
 }

/**
 * 
 * PASSPORT CONFIGS
 * 
 */

const LocalStrategy = passportLocal.Strategy
const strategyOptions : IStrategyOptionsWithRequest = {
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
    
}

passport.use('login', new LocalStrategy(strategyOptions, passportLogin))
passport.use('signup', new LocalStrategy(strategyOptions, passportSignUp));


passport.serializeUser((user, done: (err: any, id?: string) => void) => {
    console.log("Serializing")
    done(null, user._id)
});

passport.deserializeUser(async (id: string, done: (err: any, user: IMongoUser | undefined | false | null) => void) => {
    console.log("Deserializing")
    const result : IMongoUser[] | ApiError | InternalError = await usersApi.getUser(id);
    if(isUser(result)){
        done(null, result)
    }else{
        done(result, null)
    }
})

export default passport