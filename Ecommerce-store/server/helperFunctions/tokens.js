import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


//generating tokens using jsonwebtoken
export const generateToken = async (userId) => {
    const refresh_token = jwt.sign({
        userId
    }, process.env.JWT_SECRET_REFRESH, { expiresIn: "7d" })
    return {refresh_token}
}



//storing refresh token to reddis
 