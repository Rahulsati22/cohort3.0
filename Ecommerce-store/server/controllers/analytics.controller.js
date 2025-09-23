import User from "../models/User.model.js"
import Product from "../models/Product.model.js"
import Order from "../models/Order.model.js"

export const getAnalytics = async (req, res) => {
    try {
        const users = (await User.find({})).length
        const products = (await Product.find({})).length
        const sales = (await Order.find({})).length
        const revenue = (await Order.find({})).reduce((total, order) => total + order.totalAmount, 0)
        return res.status(200).json({ users, products, sales, revenue })
    } catch (error) {
        console.log("Error in get analytics controller", error.message)
        return res.status(500).json({ message: error.message })
    }
}
