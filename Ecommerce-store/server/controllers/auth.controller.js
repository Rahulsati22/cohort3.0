import User from '../models/User.model.js'
import { generateToken, storeRefreshToken } from '../helperFunctions/tokens.js'
import client from '../lib/redisClient.js'
import jwt from 'jsonwebtoken'



//function for signup
const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        const userExists = await User.findOne({ email })
        if (userExists)
            return res.status(400).send({ message: "User already exists" })

        const user = await User.create({ name, email, password })



        //calling function that will generate access token and refresh token
        const { access_token, refresh_token } = await generateToken(user._id)

        //sending refresh token to reddis

        await storeRefreshToken(refresh_token, user._id)


        //saving tokens in cookies
        await res.cookie('accessToken', access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        })

        await res.cookie('refreshToken', refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        })

    } catch (error) {
        console.log("error in signup controller", error.message)
        return res.status(500).send({ message: error.message })
    }
}


//function for login
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user)
            return res.status(401).send({ message: "Invalid credentials" })
        const confirmPassword = await user.comparePassword(password)
        if (!confirmPassword)
            return res.status(401).send({ message: "Invalid credentials" })


        const { access_token, refresh_token } = await generateToken(user._id)
        console.log(user._id)

        await storeRefreshToken(refresh_token, user._id)


        //saving tokens in cookies
        await res.cookie('accessToken', access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        })


        await res.cookie('refreshToken', refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        })
    } catch (error) {
        console.log("Error in login controller", error.message)
        return res.status(500).send({ message: error.message })
    }
}



//function to refresh token that will expire after 15minutes
const refreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken)
            return res.status(401).send({ message: "No  refresh token provided" })

        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH)
        const storedToken = await client.get(`refresh_token:${decoded.userId}`)
        if (refreshToken !== storedToken)
            return res.status(401).send({ message: "Invalid refresh token" })

        const newAccessToken = await jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET_ACCESS, { expiresIn: '15m' })
        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).send({ message: "Successfully refreshed the token" })

    } catch (error) {
        console.log('error in refresh-token controller', error.message)
        return res.status(500).json({ message: error.message })
    }
}


//function for user profile
const userProfile = async (req, res) => {
    try {
        const userId = await jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET_ACCESS).userId
        const user = await User.findById(userId).select("-password")
        if (!user)
            return res.status(401).send({ message: "User doesn't exist" })
        return res.status(200).send(user)
    } catch (error) {
        console.log("error in userProfile controller", error.message)
        return res.status(500).send({ message: error.message })
    }
}


//function for logout
const logout = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (refreshToken) {
            const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH)
            await client.del(`refresh_token:${decoded.userId}`)
        }
        res.clearCookie("accessToken")
        res.clearCookie("refreshToken")
        return res.status(200).send({ message: "Logout successfully" })
    } catch (error) {
        console.log("Error in logout controller", error.message)
        res.status(500).send({ message: error.message })
    }
}



//exporting the functions
export { signup, login, refreshToken, userProfile, logout }


