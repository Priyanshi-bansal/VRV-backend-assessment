// 1. Import express.
import express from 'express';
import AuthController from './auth.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';

// 2. Initialize Express router.
const authRouter = express.Router();

const authController = new AuthController();

// All the paths to controller methods.

authRouter.post('/signup', (req, res, next)=>{
    authController.signUp(req, res, next)
});
authRouter.post('/signin', (req, res)=>{
    authController.signIn(req, res)
});
authRouter.put('/resetPassword', jwtAuth, (req, res,next)=>{
    authController.resetPassword(req,res, next)
})

export default authRouter;
