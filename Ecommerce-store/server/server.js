//importing packages
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'



//importing routes in this section
import authRouter from './routes/auth.route.js'
import productRouter from './routes/product.route.js';
import cartRouter from './routes/cart.route.js';
import couponRouter from './routes/coupon.route.js';
import paymentRouter from './routes/payment.route.js';


//mongodb connection function
import { connectDb } from './lib/db.js';


//reddis instance
import client from './lib/redisClient.js';


//function so that we can access dotenv
dotenv.config();

//calling function to connect to db
connectDb()

//using express and middlewares
const app = express()
app.use(cookieParser())
app.use(express.json())


//this is the port where we are running our application
const PORT = process.env.PORT || 3000

//these are routes
app.use("/api/auth", authRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/coupons", couponRouter)
app.use("/api/payment", paymentRouter)

//listening on the port
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})  