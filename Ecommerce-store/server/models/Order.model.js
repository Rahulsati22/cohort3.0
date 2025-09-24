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

    // 🏠 SHIPPING ADDRESS SNAPSHOT (Main Field)
    shippingAddress: {
        street: {
            type: String,
            required: [true, "Street address is required"]
        },
        city: {
            type: String,
            required: [true, "City is required"]
        },
        state: {
            type: String,
            required: [true, "State is required"]
        },
        postalCode: {
            type: String,
            required: [true, "Postal code is required"],
            validate: {
                validator: function (v) {
                    return /^\d{6}$/.test(v);
                },
                message: 'Please enter a valid 6-digit PIN code'
            }
        },
        country: {
            type: String,
            default: 'India'
        },
        landmark: {
            type: String
        },
        addressType: {
            type: String,
            enum: ['home', 'office', 'other'],
            default: 'home'
        }
    },

    // 📦 ORDER STATUS TRACKING
    status: {
        type: String,
        enum: ['confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'confirmed'
    },

    // 💳 RAZORPAY FIELDS
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
    },

    // 🚚 DELIVERY DETAILS (Optional - for future use)
    deliveryDetails: {
        estimatedDelivery: {
            type: Date
        },
        trackingNumber: {
            type: String
        },
        deliveredAt: {
            type: Date
        }
    }

}, { timestamps: true })

const Order = mongoose.model('Order', OrderSchema)
export default Order
