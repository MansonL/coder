import e, { Request, Response, Router } from 'express';
import passport from 'passport';
import { Controller } from '../controllers/controller';

export const router = Router();

router.get('/login', Controller.login);
router.post('/login', passport.authenticate('login', { failureRedirect: '/logsignFailure' }), (req: Request, res: Response) => {
    const user = req.user;
    res.send({process: "Successful", data: user});
});

router.get('/signup', Controller.signup);
router.post('/signup', passport.authenticate('signup', { failureRedirect: '/logsignFailure' }), (req: Request, res: Response) => {
    const user = req.user;
    res.send({process: "Successful", data: user});
});

router.get('/profile', Controller.isAuthenticated, Controller.profile)

router.get('/logout', Controller.logout)