import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import {body} from 'express-validator'

const router = Router()

router.post("/register",
    body('email').isEmail().withMessage('Email must be a valid email address'),
    body('password').isLength({min:3}).withMessage('Email must be a valid email address')
    ,userController.createUserController)




export default router