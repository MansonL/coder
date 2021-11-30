
import { Request } from "express";
import { IStrategyOptionsWithRequest, IVerifyOptions, VerifyFunctionWithRequest } from "passport-local";
import bcrypt from 'bcrypt'
import { INew_User, IUser, usersStore } from "../store/store";
import passport from "passport";
import passportLocal from 'passport-local'

export type doneFunction = (error: any, user?: any, options?: IVerifyOptions) => void

/**
 * 
 * 
 * Login & SignUp Passport Functions
 * 
 *  
 */

export const passportLogin: VerifyFunctionWithRequest = (req: Request, username: string, password: string, done: doneFunction) => {
    console.log('Inside passportLogin')
    console.log('------------------- REQ BODY ---------------------')
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
 
 export const passportSignUp : VerifyFunctionWithRequest = (req: Request, username: string, password: string, done: doneFunction) => {
        console.log('Inside passportSignUp')     
        usersStore.findOne(username, (err, user) => {
             if(err){
                 console.log(`Error at signup ` + err)
                  return done(err)
             }
             if(user){
                 console.log(`There's an existing user with the username ${username}`);
                 return done(null, false, { message: `There's an existing user with the username ${username}` })
             }else{
                 const newUser : INew_User = {
                     timestamp: req.body.timestamp,
                     username: username,
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
                      return done(err)
                 }else{
                      return done(null, user)
                 }
                     
             })
         }
     })
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
 export const validPassword = (user: IUser, password: string): boolean => {
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


passport.serializeUser((user: IUser, done: (err: any, id?: string) => void) => {
    done(null, user._id)
});

passport.deserializeUser((id: string, done: (err: any, user: IUser | undefined | false | null) => void) => {
    usersStore.findByID(id, (err, user) => {
        done(err,user)
    })
})

export default passport