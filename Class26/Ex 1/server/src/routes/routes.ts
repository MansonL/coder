import e, { NextFunction, Request, Response, Router } from 'express';
import passport from '../utils/passport';
import { IVerifyOptions } from 'passport-local';
import { Controller } from '../controllers/controller';

export const router = Router();

//router.get('/login', Controller.login);

router.post('/login', passport.authenticate('login'), (req: Request, res: Response) => {
    const user = req.user;
    res.send({response: "Successful", data: user});
});

//router.get('/signup', Controller.signup);

router.post('/signup', (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('signup', function(err: any, user: any, info: IVerifyOptions){
        console.log(`Inside authenticate callback.`)
        console.log(err, user, info)
        if(err){
            console.log(err);
             return res.send(err);
        }
        if(!user) { 
            return res.status(401).send({data: info})
        };
        return res.json({data: user, msg: "Signed up"});
    })(req,res,next);
});

router.get('/profile', Controller.isAuthenticated, Controller.profile)

router.get('/logout', Controller.logout)
router.get('/logsignFailure', Controller.logsignFailure);