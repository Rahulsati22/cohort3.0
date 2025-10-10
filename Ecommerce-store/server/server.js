//importing packages
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'



//importing routes in this section
import authRouter from './routes/auth.route.js'
import productRouter from './routes/product.route.js';
import cartRouter from './routes/cart.route.js';
import paymentRouter from './routes/payment.route.js';
import analyticsRouter from './routes/analytics.route.js';
import router from './routes/address.route.js';
import orderRouter from './routes/order.route.js'

//mongodb connection function
import { connectDb } from './lib/db.js';




//function so that we can access dotenv
dotenv.config();

//calling function to connect to db
connectDb()

//using express and middlewares
const app = express()
app.use(cookieParser())
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cors({
    origin: 'http://localhost:5173', // allow your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}))



//this is the port where we are running our application
const PORT = process.env.PORT || 3000

//these are routes
app.use("/api/auth", authRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/payment", paymentRouter)
app.use("/api/analytics", analyticsRouter)
app.use("/api/address", router)
app.use("/api/order", orderRouter)

//listening on the port
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})  