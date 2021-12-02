import { NextFunction, Request, Response, Router } from "express";
import { authController } from "../controller/auth";
import passport from "../passport/passport";


export const authRouter : Router = Router();

authRouter.post('/signup', (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('signup', function(err: any, user: any, info){
        if(err){
            return res.status(500).send(err);
        }
        if(user){
            return res.status(201).send(user)
        }
        return res.send(info)
    })(req,res,next);
});

authRouter.post('/login', (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('login', function(err: any, user: any, info: any){
        if(err){
            return res.status(500).send(err);
        }
        if(user){
            return res.status(201).send(user);
        }
        return res.send(info)
    })(req,res,next);
})

authRouter.get('/login', authController.login);
authRouter.get('/signup', authController.signup)