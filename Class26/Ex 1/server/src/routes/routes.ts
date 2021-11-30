import e, { NextFunction, Request, Response, Router } from 'express';
import passport from '../utils/passport';
import { IVerifyOptions } from 'passport-local';
import { Controller } from '../controllers/controller';

export const router = Router();

router.get('/login', Controller.login);

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('login', function(err: any, user: any, info: IVerifyOptions){
        console.log(`Inside authenticate callback`);
        if(err){
            return res.status(500).send(err);
        }
        if(!user){
            return res.status(403).json({ data: {}, msg: info.message });
        }
        return res.status(201).json({ data: user, msg: info.message })
    })(req,res,next)

});


router.get('/signup', Controller.signup);

router.post('/signup', (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('signup', function(err: any, user: any, info: IVerifyOptions){
        console.log(`Inside authenticate callback.`)
        if(err){
            console.log(err);
             return res.status(500).send(err);
        }
        if(!user) { 
            return res.status(401).json({ data: {}, msg: info.message })
        };
        return res.status(201).json({ data: user, msg: info.message });
    })(req,res,next);
});

router.get('/profile', Controller.isAuthenticated, Controller.profile)

router.get('/logout', Controller.logout)