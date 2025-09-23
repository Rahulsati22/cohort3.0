import Router from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { paymentProcess, getKey, paymentVerification } from "../controllers/payment.controller.js";

const paymentRouter = Router()


paymentRouter.post('/process-payment', protectRoute, paymentProcess)
paymentRouter.get('/get-key', protectRoute, getKey)
paymentRouter.post('/payment-verification', protectRoute, paymentVerification)
export default paymentRouter