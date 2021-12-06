import { Router } from 'express';
import passport from '../passport/passport';
import { Controller } from '../controllers/controller';

export const router = Router();

router.get('/login', Controller.login);

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/index', passport.authenticate('facebook', {
    successRedirect: 'http://localhost:8080/api/login',
    failureRedirect: 'http://localhost:8080/api/login'
}))

router.get('/signup', Controller.signup);

router.get('/profile', Controller.isAuthenticated, Controller.profile)

router.get('/logout', Controller.logout)