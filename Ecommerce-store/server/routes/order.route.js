import Router from 'express'
import { protectRoute } from "../middleware/auth.middleware.js";
import { adminRoute } from "../middleware/admin.middleware.js";
import { getAllOrders, updateStatus, myOrders } from '../controllers/order.controller.js';


const orderRouter = Router()

orderRouter.get('/', protectRoute, adminRoute, getAllOrders)
orderRouter.post('/updatestatus', protectRoute, adminRoute, updateStatus)
orderRouter.get('/myorders', protectRoute, adminRoute, myOrders)


export default orderRouter