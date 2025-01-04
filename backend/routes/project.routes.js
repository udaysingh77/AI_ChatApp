import {Router} from "express"
import * as projectControllers from "../controllers/project.controller.js"
import * as authMiddleWare from "../middleware/auth.middleware.js"
import { body } from "express-validator" 

const router = Router()

router.post("/newProject",authMiddleWare.authUser,body('name').isString().withMessage("Name is required"),projectControllers.createProject)

router.get("/all",authMiddleWare.authUser,projectControllers.getAllProjects)

router.put("/add-user",
    authMiddleWare.authUser,
    body('projectId').isString().withMessage('Project ID is required'),
    body('user').isArray({min:1}).withMessage('User must be an array of strings').bail().custom((users)=>users.every(user => typeof user === 'string').withMessage('Each User must be a string'),
    projectControllers.addUserToProject))



export default router;