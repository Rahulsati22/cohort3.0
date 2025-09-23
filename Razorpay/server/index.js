//importing express
import express from 'express'
import dotenv from 'dotenv'
import { razorpayInstance } from './lib/razorpay.js'
import { getKey, paymentProcess, paymentVerification } from './controller/payment.controller.js'
import cors from 'cors'

dotenv.config()


//calling express and assigning to a variable
const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.use(express.json())
//routes
app.get('/', (req, res) => {
    return res.send('<h1>Hello World</h1>')
})

app.post('/api/v1/process/payment', paymentProcess)
app.get('/api/v1/process/getkey', getKey)
app.post('/api/v1/paymentverification', paymentVerification)

//listening on port 3000
app.listen(process.env.PORT, () => {
    console.log('running on port ', process.env.PORT)
})

