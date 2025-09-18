import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import client from '../lib/redisClient.js'
dotenv.config()


//generating tokens using jsonwebtoken
export const generateToken = async (userId) => {
    const access_token = jwt.sign({
        userId
    }, process.env.JWT_SECRET_ACCESS, { expiresIn: "15m" })

    const refresh_token = jwt.sign({
        userId
    }, process.env.JWT_SECRET_REFRESH, { expiresIn: "7d" })



    return { access_token, refresh_token }
}



//storing refresh token to reddis
export const storeRefreshToken = async (refresh_token, user_id) => {
    await client.set(`refresh_token:${user_id}`, refresh_token, "EX", 7 * 24 * 60 * 60)
}