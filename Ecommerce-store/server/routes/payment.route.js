import Router from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createCheckOutSession, checkOutSuccess } from "../controllers/payment.controller.js";

const paymentRouter = Router()


paymentRouter.post('/create-checkout-session', protectRoute, createCheckOutSession)
paymentRouter.post('/checkout-success', protectRoute, checkOutSuccess)



export default paymentRouter