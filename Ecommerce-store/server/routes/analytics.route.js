import {Router} from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {adminRoute} from '../middleware/admin.middleware.js'
import { getAnalytics } from "../controllers/analytics.controller.js";

const analyticsRouter = Router()

analyticsRouter.get('/', protectRoute, adminRoute, getAnalytics)

export default analyticsRouter