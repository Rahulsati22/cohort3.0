import User from '../models/User.model.js'
export async function adminRoute(req, res, next) {
    try {
        if (req.user && req.user.role == 'Admin')
            return next()
        return res.status(403).send({ message: "Unauthorized access - Admin only" })
    } catch (error) {
        console.log("Error in admin route middleware", error.message)
        return res.status(500).send({ message: error.message })
    }
}