import { Request } from "express";
import passportFacebook, { Profile, VerifyFunctionWithRequest } from 'passport-facebook'
import passport from "passport";
import { IFacebookUser, IMongoFBUser, IMongoUser, } from "../interfaces/interfaces";
import { usersApi } from "../api/users";
import { ApiError } from "../utils/errorApi";
import { isCUDResponse, isFBUser, isUser } from "../interfaces/checkType";
import * as dotenv from 'dotenv'
import moment from "moment";

declare global {
    namespace Express {
        interface User extends IMongoFBUser {}
    }
}


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
    const firstResult = await usersApi.getFacebookUser(profile.id);
    if(isFBUser(firstResult)){
         return done(null, firstResult);
    }else if(firstResult instanceof ApiError){
        const newUser : IFacebookUser = {
            timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
            email: profile.emails ? profile.emails[0].value : 'no email',
            facebookPhotos: profile.photos ? profile.photos.map(photo => photo.value) : [''],
            name: profile.displayName.split(" ")[0],
            surname: profile.displayName.split(" ")[1],
            age: profile.birthday ? profile.birthday : 'none',
            facebookID: profile.id
        }
        const result = await usersApi.saveFacebookUser(newUser);
        if(isCUDResponse(result)){
            return done(null, result.data)
        }else{
         return done(result)
        }
    }else{
        return done(firstResult);
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
    profileFields: ['id', 'displayName', 'emails', 'photos']
}

passport.use(new FacebookStrategy(passportConfig, facebookVerify))



passport.serializeUser((user, done: (err: any, id?: string) => void) => {
    console.log("Serializing")
    console.log(user)
    done(null, user.facebookID)
});

passport.deserializeUser(async (id: string, done: (err: any, user: IMongoFBUser | undefined | false | null) => void) => {
    console.log("Deserializing")
    const result = await usersApi.getFacebookUser(id);
    if(isFBUser(result)){
        done(null, result)
    }else{
        done(result, null)
    }
})

export default passport