import User from '../models/User.model.js'
import jwt from 'jsonwebtoken'
export async function protectRoute(req, res, next) {
    try {
        if (req.cookies.refreshToken) {
            const userId = await jwt.verify(req.cookies.refreshToken, process.env.JWT_SECRET_REFRESH).userId
            const user = await User.findById(userId)
            if (!user)
                return res.status(200).send({ message: "User doesn't found" })

            req.user = user
            return next()
        }else{
            return res.status(401).send({message : "Access token doesn't exist"})
        }
    } catch (error) {
        console.log("Error in protect route middleware", error.message)
        return res.status(500).send({ message: error.message })
    }
} 