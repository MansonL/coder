import { Router } from 'express';
import passport from '../passport/passport';
import { Controller } from '../controllers/controller';

export const router = Router();

router.get('/login', Controller.login);

router.get('/facebook', passport.authenticate('facebook'));

router.get('/index', passport.authenticate('facebook', {
    successRedirect: '/login',
    failureRedirect: '/login'
}))

router.get('/signup', Controller.signup);

router.get('/profile', Controller.isAuthenticated, Controller.profile)

router.get('/logout', Controller.logout)