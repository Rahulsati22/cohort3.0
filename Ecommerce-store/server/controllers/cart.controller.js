import User from "../models/User.model.js"

//controller for adding to cart
const addToCart = async (req, res) => {
    try {
        if (!req.body || !req.user || !req.user.cart) {
            return res.status(400).send({ message: "Bad request" })
        }
        const productId = req.body
        const user = req.user
        const existingProduct = user.cart.find(item => item.product === productId)
        if (existingProduct) {
            existingProduct.quantity += 1
            await user.save()
            return res.send({ cartItems: user.cart, message: "Item added to cart successfully" })
        }
        user.cart.push({
            quantity: 1,
            product: productId
        })
        await user.save()
        return res.send({ cartItems: user.cart, message: "Item added to cart successfully" })
    } catch (error) {
        console.log("Error in addToCart controller", error.message)
        return res.status(500).send({ message: error.message })
    }
}



//controller for removing from cart
const removeAllFromCart = async (req, res) => {
    try {
        if (!req.body || !req.user || !req.user.cart) {
            return res.status(400).send({ message: "Bad request" })
        }
        const productId = req.body
        const user = req.user
        if (!user.cart) {
            return res.status(400).send({ message: "User does not have a cart" })
        }
        const newCart = user.cart.filter(item => item.product !== productId)
        user.cart = newCart
        await user.save()
        return res.status(200).send(user.cart)
    } catch (error) {
        console.log("Error in remove all from cart controller", error.message)
        if (error.name === "TypeError" && error.message === "Cannot read property 'cart' of null") {
            return res.status(400).send({ message: "User does not have a cart" })
        }
        return res.status(500).json({ message: error.message })
    }
}


//controller for updating quantity of product
const updateQuantity = async (req, res) => {
    try {
        const { id: productId } = req.params
        const { quantity } = req.body
        const user = req.user
        const existingItem = user.cart.find(item => item.product === productId)
        if (!existingItem) {
            return res.status(404).send({ message: "Item not found in cart" })
        }
        if (quantity == 0)
            user.cart = user.cart.filter((item) => item.id !== productId)
        else
            existingItem.quantity = quantity
        await user.save()
        return res.send(user.cart)
    } catch (error) {
        console.log("Error in update quantity controller", error.message)
        return res.status(500).send({ message: error.message })
    }
}


//controller to get all products (khud se likha hai maine ye)
const getAllProducts = async (req, res) => {
    try {
        const user = await user.findById(req.user._id).populate("cart.product")
        return res.send(user.cart)
    } catch (error) {
        console.log("Error in get all cart products controller", error.message)
        return res.status(500).send({ message: error.message })
    }
}


export { addToCart, removeAllFromCart, updateQuantity, getAllProducts }
