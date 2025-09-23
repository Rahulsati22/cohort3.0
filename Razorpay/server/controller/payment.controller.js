import { razorpayInstance } from "../lib/razorpay.js"
import crypto from 'crypto'

export const paymentProcess = async (req, res) => {
    const options = {
        amount: (Number(req.body.amount) * 100),
        currency: "INR"
    }

    const order = await razorpayInstance.orders.create(options)
    return res.status(200).send({ message: "Inside payment process controller", order })
}


export const getKey = async (req, res) => {
    return res.status(200).send({ message: "Inside get key controller", key: process.env.RAZORPAY_KEY_ID })
}


export const paymentVerification = async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body
    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest('hex')
    console.log(razorpay_signature, expectedSignature)

    if (razorpay_signature === expectedSignature) {
        return res.redirect('http://localhost:5173/paymentsuccess?reference=' + razorpay_payment_id)
    }
    return res.status(400).send({ message: 'Payment failed' })
} //payment verification