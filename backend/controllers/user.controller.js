import userModel from "../models/user.model.js";
import * as userService from "../services/user.service.js"
import { validationResult } from "express-validator";
import redisClient from "../services/redis.service.js";

export const createUserController = async(req,res)=>{

    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }
    try {
        const user = await userService.createUser(req.body);
        const token = await user.generateJWT();
        delete user._doc.password // i need to uderstand this
        res.status(201).json({user,token})
    } catch (error) {
        console.log(error);       
    }
}

export const loginUserController = async(req,res)=>{

    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({
            errors:error.array()
        })
    }

    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email}).select('+password');
        if(!user){
            return res.status(400).json({status:false,message:"User is not found"})
        }

        console.log("user=====>",user);

        const isMatched = await user.isValidPassword(password) 
        console.log("isMatched=========>",isMatched);

        if(!isMatched){
            return res.status(401).json({
                error:"Invalid Credentials"
            })
        }
        const token = await user.generateJWT();
        delete user._doc.password
        res.json({user,token})
    } catch (error) {
        console.log(error);
    }


}

export const profileController = async(req,res) =>{
    res.status(200).json({user:req.user})
} 


export const logoutController = async(req,res)=>{
try {
        const token = req?.cookie?.token || req.headers.authorization.split(" ")[1]
        redisClient.set(token,'logout', 'EX', 60 * 60 * 24)
        res.status( 200).json({
            message:"Logout Successfully"
        })
} catch (error) {
    console.log(error);
    res.status(400).send(error.message)
}
}