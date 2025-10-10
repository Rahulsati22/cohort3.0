import Order from "../models/Order.model.js"
export const getAllOrders = async (req, res) => {
    try {
        const allOrders = await Order.find({}).populate('products.product')
        return res.status(200).send({ allOrders })
    } catch (error) {
        console.log('error in getAllOrders controller', error)
        return res.status(500).send({ message: error.message })
    }
}

export const updateStatus = async (req, res) => {
    try {
        const orderId = req.body.orderdId
        const currentStatus = req.body.currentStatus
        const order = await Order.findById(orderId)
        if (currentStatus === 'confirmed') {
            order.status = 'processing'
            await order.save()
        } else if (currentStatus == 'processing') {
            order.status = 'shipped'
            await order.save()
        } else if (currentStatus == 'shipped') {
            order.status = 'delivered'
            await order.save()
        }
        const orderNew = await Order.find({})
        return res.status(200).send({ orderNew, message: "Status updated successfully" })
    } catch (error) {
        console.log('error in updateStatus controller', error)
        return res.status(500).send({ message: error.message })
    }
}


export const myOrders = async (req, res) => {
    try {
        const userId = req.user._id
        if (!userId) {
            return res.status(401).send({ message: "User doesn't exist" })
        }
        const orders = await Order.find({ user: userId }).populate('products.product')
        return res.status(200).send({ orders })
    } catch (error) {
        console.log('error in myOrders controller', error)
        return res.status(500).send({ message: error.message })
    }
}