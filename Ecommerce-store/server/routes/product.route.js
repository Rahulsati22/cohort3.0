import { Router } from "express";
import { getAllProducts, getFeaturedProducts, createProduct, deleteProduct, recommendedProducts, getProductsByCategory, toggleFeatures } from '../controllers/product.controller.js'
import { protectRoute } from "../middleware/auth.middleware.js";
import { adminRoute } from "../middleware/admin.middleware.js";

const productRouter = Router()

productRouter.get('/', protectRoute, adminRoute, getAllProducts)
productRouter.get('/featured', getFeaturedProducts)
productRouter.post('/', protectRoute, adminRoute, createProduct)
productRouter.delete('/:id', protectRoute, adminRoute, deleteProduct)
productRouter.get('/recommendation', recommendedProducts)
productRouter.get('/category/:category', getProductsByCategory)
productRouter.patch('/toggle-features/:id', protectRoute, adminRoute, toggleFeatures)

 


export default productRouter