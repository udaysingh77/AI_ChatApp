import {Router} from 'express';
import aiController from '../controllers/ai.controller.js';

const router = Router();

router.get("/ai-respone",aiController)


export default router;