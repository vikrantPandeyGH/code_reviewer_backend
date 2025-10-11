import { Router } from "express";
const router = Router()
import { createProjectController } from "../controllers/project.controller.js";
import { getallprojectshandler } from "../controllers/project.controller.js";

router.post('/create',createProjectController)
router.get('/get-all',getallprojectshandler)

export default router