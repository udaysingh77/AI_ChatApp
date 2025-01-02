import {Router} from "express"
import * as projectControllers from "../controllers/project.controller.js"
import {authUser} from "../middleware/auth.middleware.js"
import { body } from "express-validator" 

const router = Router()

router.post("/newProject",authUser,body('name').isString().withMessage("Name is required"),projectControllers.createProject)



export default router;