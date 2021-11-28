import { NextFunction, Request, Response } from "express";

enum AuthResponses {
    LoggedIn = "Already logged in."
}

export class Controller {

    static login (req: Request, res: Response) {
        if(req.isAuthenticated()){
            const user = req.user;
            res.send({response: AuthResponses.LoggedIn, data: user});
        }else{
            res.send({ response: "Go to login", data: {} })
        }
    }

    static logout (req: Request, res: Response) {
        req.logout();
        res.send({ response: "Go to login", data: {} })
    }

    static signup (req: Request, res: Response) {
        if(req.isAuthenticated()){
            const user = req.user
            res.send({ response: AuthResponses.LoggedIn, data:  user});
        }else{
            res.send({ response: "Need to sign up.", data: {} })
        }
    }

    static profile (req: Request, res: Response) {
        const user = req.user
        res.send({ response: AuthResponses.LoggedIn, data: user })
    }

    static isAuthenticated (req: Request, res: Response, next: NextFunction) {
        if(req.isAuthenticated()){
            next();
        }else{
            res.redirect('/login');
        }
    }
}