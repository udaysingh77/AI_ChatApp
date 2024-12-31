import userModel from "../models/user.model.js";
import * as userService from "../services/user.service.js"
import { validationResult } from "express-validator";

export const createUserController = async(req,res)=>{

    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }
    try {
        const user = await userService.createUser(req.body);
        const token = await user.generateJWT();
        res.status(201).json({user,token})
    } catch (error) {
        console.log(error);       
    }
}