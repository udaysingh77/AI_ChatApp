import * as projectService from "../services/project.service.js";
import { validationResult } from "express-validator";
import UserModel from "../models/user.model.js";

export const createProject = async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({
            error: error.array()
        });
    }

    try {
        const { name } = req.body;

        // Fetch logged-in user
        const loggedInUser = await UserModel.findOne({ email: req.user.email });
        if (!loggedInUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const userId = loggedInUser._id

        // Create new project
        const newProject = await projectService.createProject({ name, userId });

        return res.status(201).json(newProject);
    } catch (error) {
        console.error("Error creating project:", error);
        return res.status(500).json({ message: error.message });
    }
};

export const getAllProjects = async(req,res)=>{
    try {
        const loggedInUser = await UserModel.findOne({email:req.user.email})
        const allProjectsByUserId = await projectService.getAllProjectsByUserId(loggedInUser._id)
        res.json(allProjectsByUserId)
    } catch (error) {
        console.log(error);
    }
}

export const addUserToProject = async(req,res)=>{
    try {
        
        const {projectId, users} = req.body

        const loggedInUser = await UserModel.findOne({
            email:req.user.email
        })

        const project = await projectService.addUserToProject({
            projectId,
            users,
            userId:loggedInUser._id
        })

        return res.json({
            project
        })
    } catch (error) {
        console.log(error);
    }
}


export const getProjectById = async(req,res) =>{
    const {projectId} = req.params;
    try {
        
        const project = await projectService.getProjectById({projectId})

        return res.status(200).json({
            project
        })

    } catch (error) {
        console.log(error);
        res.json({error:error.message})
    }
}
