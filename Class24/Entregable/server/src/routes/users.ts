import e, { Router } from 'express';
import { usersController } from '../controller/users';


export const usersRouter: e.Router = Router();

usersRouter.get('/list', usersController.getAll);
usersRouter.get('/list/?:id', usersController.getOne);
usersRouter.post('/save', usersController.save);

declare module 'express-session' {
    export interface SessionData {
        user: string | undefined;
        password: string | undefined;
    }
}

usersRouter.get('/login', (req: e.Request, res: e.Response) => {
    const { user, password } = req.query;
    if((!user || !password) && !req.session.user){
        res.send({ process: "Error 400.", message: `You have to set credentials first...` })
    }else{
        if(!req.session.user && !req.session.password){
            req.session.user = user as string;
            req.session.password = password as string;
            res.send({ process: "Successful", message: "Now you're logged in!"});
        }else{
            res.send({ process: "Successful", message: "You're already logged in!" });
        }
    }
});
usersRouter.get('/logout', (req: e.Request, res: e.Response) => {
    req.session.destroy(err => {
        !err ? res.send({ process: "Successful", message: "You're logged out." }) : res.send({ process: "Error: 500.", message: err })
    })
})
