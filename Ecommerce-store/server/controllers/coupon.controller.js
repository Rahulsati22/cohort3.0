import { protectRoute } from "../middleware/auth.middleware.js"
import Coupon from "../models/Coupon.model.js"
import User from "../models/User.model.js"

export const getCoupon = async (req, res) => {
    try {
        const coupon = User.findOne({ userId: req.user._id, isActive: true }).populate("coupon")
        return res.status(200).json(coupon || null)
    } catch (error) {
        console.log("Error in get coupon controller", error.message)
        return res.status(500).send({ message: error.message })
    }
}



export const validateCoupon = async (req, res) => {
    try {
        const { couponCode } = req.body
        const coupon = await Coupon.findOne({ couponCode, userId: req.user._id, isActive: true })
        if (!coupon) {
            return res.status(400).json({ message: "Coupon is invalid" })
        }

        if (coupon.expirationDate < new Date()) {
            coupon.isActive = false
            await coupon.save()
            return res.status(400).json({ message: "Coupon is expired" })
        }

        return res.status(200).json({ message: "Coupon is valid", code: couponCode, discount: coupon.discountPercentage })
    } catch (error) {
        console.log("Error in validate coupon controller", error.message)
        return res.status(500).send({ message: error.message })
    }
}

export const createNewCoupon = async (userId)=>{
    const newCoupon = "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase()
    const coupon = new Coupon({code : newCoupon, discountPercentage : 10, expirationDate : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), isActive : true, userId})
    await coupon.save()
    return newCoupon
}