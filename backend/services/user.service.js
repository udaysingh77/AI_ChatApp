import userModel from "../models/user.model.js";


const createUser = async({
    email,password
})=>{
    if(!email || !password){
        throw new Error('Email and Password are required')
    }

    const hashedPassword = await userModel.hashedPassword(password)

    const user = await userModel.create({
        email,
        password:hashedPassword
    })

    console.log("user=======>",user);

    return user;
} 


const getAllUsers = async({userId})=>{
    return await userModel.find({_id:{$ne:userId}})
}

export {createUser, getAllUsers}