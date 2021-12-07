
import { Request } from "express";
import { usersStore } from "../store/store";
import { IUser } from "../interfaces/interfaces";
import passport from "passport";
import passportFacebook, { Profile, VerifyFunctionWithRequest } from 'passport-facebook';
import * as dotenv from 'dotenv'
import { isUser } from "../interfaces/checkType";
import { ApiError } from "../api/errorApi";
import moment from 'moment';

dotenv.config();

export type doneFunction = (error: any, user?: any, options?: any) => void

/**
 * 
 * 
 * Login & SignUp Passport Functions
 * 
 *  
 */

export const facebookVerify: VerifyFunctionWithRequest = async (req: Request, accessToken: string, refreshToken: string,profile: Profile, done: doneFunction) => {
    console.log("---------------------- PROFILE -----------------------------\n");
    console.log(profile);
    console.log("\n---------------------- ACCESS TOKEN -----------------------------\n");
    console.log(accessToken);
    console.log("---------------------- REFRESH TOKEN -----------------------------\n");
    console.log(refreshToken);
    const firstResult = await usersStore.findByID(profile.id);
    if(isUser(firstResult)){
         return done(null, firstResult);
    }else if(firstResult instanceof ApiError){
        const newUser : IUser = {
            timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
            _id: profile.id,
            username: '',
            password: '',
            alias: '',
            age: profile.birthday,
            name: profile.displayName.split(' ')[0],
            surname: profile.displayName.split(' ')[1],
            avatar: '',
        }
        const result = await usersStore.saveOne(newUser);
        if(isUser(result)){
            return done(null, result)
        }else{
         return done(result, null)
        }
    }else{
        return done(firstResult, null);
    }
}

/**
 * 
 * PASSPORT CONFIGS
 * 
 */

const FacebookStrategy = passportFacebook.Strategy
const passportConfig : passportFacebook.StrategyOptionWithRequest = {
    clientID: process.env.FACEBOOK_APP_ID as string,
    clientSecret: process.env.FACEBOOK_APP_SECRET as string,
    callbackURL: "http://localhost:8080/api/auth/index",
    passReqToCallback: true,
}

passport.use(new FacebookStrategy(passportConfig, facebookVerify))



passport.serializeUser((user, done: (err: any, id?: string) => void) => {
    console.log("Serializing")
    console.log(user)
    done(null, user._id)
});

passport.deserializeUser(async (id: string, done: (err: any, user: IUser | undefined | false | null) => void) => {
    console.log("Deserializing")
    const result = await usersStore.findByID(id);
    if(isUser(result)){
        done(null, result)
    }else{
        done(result, null)
    }
})

export default passport