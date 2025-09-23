import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true,
            min: 0
        }
    }],

    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },

    razorpayOrderId: {
        type: String,
        required: true,
        unique: true
    }, 
    razorpayPaymentId: {
        type: String
    },
    razorpaySignature: {
        type: String
    }

}, { timestamps: true })

const Order = mongoose.model('Order', OrderSchema)
export default Order