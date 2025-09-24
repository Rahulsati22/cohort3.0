import { razorpayInstance } from "../lib/razorpay.js"
import crypto from 'crypto'
import Order from "../models/Order.model.js"

//creating an order using razorpay
export const paymentProcess = async (req, res) => {
    try {
        const { cart, shippingAddress } = req.body; // Added shippingAddress
        console.log(typeof req.body.amount, "Inside the payment process");

        // Validate shipping address
        if (!shippingAddress) {
            return res.status(400).json({
                success: false,
                message: "Shipping address is required"
            });
        }

        // Validate required address fields
        const { street, city, state, postalCode } = shippingAddress;
        if (!street || !city || !state || !postalCode) {
            return res.status(400).json({
                success: false,
                message: "Complete address details are required"
            });
        }

        // Validate PIN code
        if (!/^\d{6}$/.test(postalCode)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid 6-digit PIN code"
            });
        }

        const options = {
            amount: Math.round(Number(req.body.amount) * 100),
            currency: "INR"
        };

        const order = await razorpayInstance.orders.create(options);

        // Product array
        let arr = [];
        for (let i = 0; i < cart.length; i++) {
            let obj = {
                product: cart[i].product._id,
                quantity: cart[i].quantity,
                price: cart[i].product.price
            };
            arr.push(obj);
        }

        // Total amount
        let totalAmount = 0;
        for (let i = 0; i < arr.length; i++) {
            totalAmount += Number(arr[i].price) * Number(arr[i].quantity);
        }

        // User
        const userId = req.user._id;

        // Razorpay order id
        let razorpayOrderId = order.id;

        // 🏠 CREATE ORDER WITH SHIPPING ADDRESS
        await Order.create({
            user: userId,
            products: arr,
            totalAmount: Number(totalAmount),
            razorpayOrderId,

            // ADDRESS SNAPSHOT - Save complete address
            shippingAddress: {
                street: street.trim(),
                city: city.trim(),
                state: state.trim(),
                postalCode: postalCode.trim(),
                country: shippingAddress.country || 'India',
                landmark: shippingAddress.landmark?.trim() || '',
                addressType: shippingAddress.addressType || 'home'
            },

            status: 'confirmed' // Initial status
        });

        console.log("Order created with shipping address:", {
            orderId: razorpayOrderId,
            address: `${city}, ${state} - ${postalCode}`
        });

        return res.status(200).json({
            success: true,
            order,
            message: "Order created successfully with delivery address"
        });

    } catch (error) {
        console.log("Inside payment error:", error);

        // Handle duplicate razorpayOrderId error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Order already exists"
            });
        }

        // Handle validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', ')
            });
        }
        return res.status(500).json({
            success: false,
            message: error.message || "Payment processing failed"
        });
    }
};


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