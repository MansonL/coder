import { NextFunction, Request, Response } from "express";

enum AuthResponses {
    LoggedIn = "Already logged in."
}

export class Controller {

    static login (req: Request, res: Response) {
        console.log(req.session)
        if(req.isAuthenticated()){
            const user = req.user;
            res.send({ msg: AuthResponses.LoggedIn, data: user });
        }else{
            res.send({ msg: "Go to login", data: {} })
        }
    }

    static logout (req: Request, res: Response) {
        req.logout();
        res.send({ msg: "Go to login", data: {} })
    }

    static signup (req: Request, res: Response) {
        if(req.isAuthenticated()){
            const user = req.user
            res.send({ msg: AuthResponses.LoggedIn, data:  user});
        }else{
            res.send({ msg: "Need to sign up.", data: {} })
        }
    }

    static profile (req: Request, res: Response) {
        const user = req.user
        res.send({ msg: AuthResponses.LoggedIn, data: user })
    }

    static isAuthenticated (req: Request, res: Response, next: NextFunction) {
        
        if(req.isAuthenticated()){
            next();
        }else{
            res.redirect('/login');
        }
    }
}