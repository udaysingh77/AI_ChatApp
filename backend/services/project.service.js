import mongoose from "mongoose";
import projectModel from "../models/project.model.js";

export const createProject = async({name, userId}) =>{
    if(!name){
        throw new Error("Name is Required")
    }
    if(!userId){
        throw new Error("userId is Required")
    }
    // userId = String(userId)

    const project = await projectModel.create({
        name,
        users:[userId]
    })

    return project;
}

export const getAllProjectsByUserId = async(loggedInUserId) =>{
    if(!loggedInUserId){
        throw new Error("please Provide UserId")
    }
    return await projectModel.find({users:loggedInUserId})
}

export const addUserToProject = async({projectId,users,userId})=>{
if(!userId){
    throw new Error("userId is required")
}

if(!mongoose.Types.ObjectId.isValid(userId)){
    throw new Error("Invalid userId")
}

if(!projectId){
    throw new Error("ProjectId is required")
}

if(!mongoose.Types.ObjectId.isValid(projectId)){
    throw new Error("Invalid projectId")
}

if(!users){
    throw new Error("users are required")
}

if(!Array.isArray(users) || users.some(userId=> !mongoose.Types.ObjectId.isValid(userId))){
    throw new Error('Invalid userId(s) in users array')
}

const project = await projectModel.findOne({
    _id:projectId,
    users:userId
})

if(!project){
    throw new Error("User not belong to this project")
}

const updatedProject = await projectModel.findOneAndUpdate({
    _id:projectId
},
{
    $addToSet:{
        users:{
            $each:users
        }
    }
},
{
    new:true
}
)

return updatedProject

}