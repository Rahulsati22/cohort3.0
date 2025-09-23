import { razorpayInstance } from "../lib/razorpay.js"
import crypto from 'crypto'
import Order from "../models/Order.model.js"

//creating an order using razorpay
export const paymentProcess = async (req, res) => {
    try {
        const { cart } = req.body
        const options = {
            amount: (Number(req.body.amount) * 100),
            currency: "INR"
        }

        const order = await razorpayInstance.orders.create(options)

        //product array
        let arr = []
        for (let i = 0; i < cart.length; i++) {
            let obj = {
                product: cart[i].product._id,
                quantity: cart[i].quantity,
                price: cart[i].product.price
            }
            arr.push(obj)
        }


        //total amount
        let totalAmount = 0
        for (let i = 0; i < arr.length; i++) {
            totalAmount += Number(arr[i].price) * Number(arr[i].quantity)
        }


        //user
        const userId = req.user._id



        //razorpay order id
        let razorpayOrderId = order.id
        await Order.create({ user: userId, products: arr, totalAmount, razorpayOrderId })


        return res.status(200).send({ order })
    } catch (error) {
        console.log("Inside payment")
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
}


//key will be needed to show payment page
export const getKey = async (req, res) => {
    console.log(process.env.RAZORPAY_KEY_ID)
    return res.status(200).send({ key: process.env.RAZORPAY_KEY_ID })
}


//doing payment verification
export const paymentVerification = async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body
    const order = await Order.findOne({ razorpayOrderId: razorpay_order_id })
    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest('hex')
    console.log(razorpay_signature, expectedSignature)

    if (razorpay_signature === expectedSignature) {
        order.razorpayPaymentId = razorpay_payment_id
        order.razorpaySignature = razorpay_signature
        await order.save()
        return res.redirect('http://localhost:5173/paymentsuccess?reference=' + razorpay_payment_id)
    }
    return res.status(400).send({ message: 'Payment failed' })
} //payment verification