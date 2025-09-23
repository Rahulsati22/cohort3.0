import { Router } from 'express';
import { addToCart, removeAllFromCart, updateQuantity, getAllProducts } from '../controllers/cart.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
const cartRouter = Router()

cartRouter.post('/', protectRoute, addToCart)
cartRouter.post('/deleteproduct', protectRoute, removeAllFromCart)
cartRouter.put('/:id', protectRoute, updateQuantity)
cartRouter.get('/', protectRoute, getAllProducts)
export default cartRouter

