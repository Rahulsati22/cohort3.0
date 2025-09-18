import { Router } from "express";
import { signup, login, refreshToken, userProfile, logout } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const authRouter = Router()

//route for signup
authRouter.post('/signup', signup)

//route for login
authRouter.post('/login', login)


//route for refresh token
authRouter.post('/refresh-token', refreshToken)


//route for user profile
authRouter.get('/profile', protectRoute, userProfile)


//route for logout
authRouter.post('/logout', logout)


export default authRouter