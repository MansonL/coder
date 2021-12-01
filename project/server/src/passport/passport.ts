import { Request } from "express";
import { IStrategyOptionsWithRequest, IVerifyOptions, VerifyFunctionWithRequest } from "passport-local";
import bcrypt from 'bcrypt'
import passport from "passport";
import passportLocal from 'passport-local'
import { IMongoUser, INew_User } from "../interfaces/interfaces";

export type doneFunction = (error: any, user?: any, options?: IVerifyOptions) => void

/**
 * 
 * 
 * Login & SignUp Passport Functions
 * 
 *  
 */

export const passportLogin: VerifyFunctionWithRequest = async (req: Request, username: string, password: string, done: doneFunction) => {
    console.log('Inside passportLogin')
    console.log('------------------- REQ BODY ---------------------')
    console.log(req.body)
    
 }
 
 export const passportSignUp : VerifyFunctionWithRequest = (req: Request, username: string, password: string, done: doneFunction) => {
        console.log('Inside passportSignUp')     
        
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
    console.log(user)
    done(null, user._id)
});

passport.deserializeUser((id: string, done: (err: any, user: IMongoUser | undefined | false | null) => void) => {
    console.log("Deserializing")
    .findByID(id, (err, user) => {
        console.log(user)
        done(err,user)
    })
})

export default passport