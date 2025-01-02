import jwt from "jsonwebtoken" 
import redisClient from "../services/redis.service.js";


export const authUser = async(req,res,next) =>{
    console.log("This runnns");
    // const token =  req.headers.Authorization//.split("Bearer ")[1]
    const token = req.headers.authorization?.split(" ")[1]; // Bearer token
    console.log("token====>",token);
    if(!token){
        return res.status(401).json({error:"Please provide Token"})
    }
    const isBlackListed = await redisClient.get(token)
    if(isBlackListed){
       res.cookie('token','',)
       return res.status(400).json({error:"Unauthorized User"}) 
    }
    const isVarified = await jwt.verify(token,process.env.JWT_SECRET)
    if(!isVarified){
        return res.status(401).json({error:"Token is not varified"})
    }
    console.log("isVarified==========>",isVarified);
    req.user = isVarified
    next()
}