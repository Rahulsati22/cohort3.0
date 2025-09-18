import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getCoupon, validateCoupon } from "../controllers/coupon.controller.js";

const couponRouter = Router()

couponRouter.get('/', protectRoute, getCoupon)
couponRouter.get('/validate', protectRoute, validateCoupon)

export default couponRouter