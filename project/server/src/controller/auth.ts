import { Request, Response } from "express";

class AuthController {

    login(req: Request, res: Response){
        if(req.isAuthenticated()){
            res.send({
                message: "Already logged in.",  // Future res.redirect('/profile')
                data: req.user
            })
        }else{
            res.send({
                message: "Need to login.",
                data: {}
            })
        }
    }

    signup(req: Request, res: Response){
        if(req.isAuthenticated()){
            res.send({
                message: "Already logged in.",
                data: req.user
            })
        }else{
            res.send({
                message: "Log in or sign up",
                data: {}
            })
        }
    }
}

export const authController = new AuthController();