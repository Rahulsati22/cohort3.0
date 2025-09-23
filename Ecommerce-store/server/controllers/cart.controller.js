import User from "../models/User.model.js"
//controller for adding to cart
//this controller is working fine we will not touch it
const addToCart = async (req, res) => {
    try {
        if (!req.body || !req.user) {
            return res.status(400).send({ message: "Bad request" })
        }
        const { productId } = req.body

        const UserModel = await User.findById(req.user._id)
        let existingItem = null

        for (let i = 0; i < UserModel.cart.length; i++) {
            if (UserModel.cart[i].product._id.toString() === productId) {
                existingItem = UserModel.cart[i]
                break;
            }
        }


        if (existingItem) {
            existingItem.quantity += 1
            await UserModel.save()
            const user = await User.findById(req.user._id).populate("cart.product")
            return res.send({ cartItems: user.cart, message: "Item added to cart successfully" })
        }
        UserModel.cart.push({
            quantity: 1,
            product: productId
        })
        await UserModel.save()
        //calling the user
        const UserData = await User.findById(req.user._id).populate("cart.product")
        console.log(UserData.cart)
        return res.send({ cartItems: UserData.cart, message: "Item added to cart successfully" })
    } catch (error) {
        console.log("Error in addToCart controller", error.message)
        return res.status(500).send({ message: error.message })
    }
}



//controller for removing from cart
const removeAllFromCart = async (req, res) => {
    try {
        //checking some conditions before removing item from cart
        if (!req.body || !req.user) {
            return res.status(400).send({ message: "Bad request" })
        }
        //taking product id from request.body
        const { productId } = req.body
        //extracting user from req.user
        const user = req.user
        //checking if user has a cart
        if (!user.cart) {
            return res.status(400).send({ message: "User does not have a cart" })
        }
        //creating new cart for the user
        const newCart = user.cart.filter(item => item.product.toString() !== productId)
        //updating cart of the user
        user.cart = newCart
        //saving the cart for the user
        await user.save()
        //sending back the cart
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
        let existingItem = user.cart.find(item => item.product.toString() === productId)
        if (!existingItem) {
            return res.status(404).send({ message: "Item not found in cart" })
        }
        if (quantity == 0)
            user.cart = user.cart.filter((item) => item.id !== productId)
        else
            existingItem.quantity = quantity
        await user.save()
        return res.status(200).send({ cart: user.cart })
    } catch (error) {
        console.log("Error in update quantity controller", error.message)
        return res.status(500).send({ message: error.message })
    }
}


//controller to get all products (khud se likha hai maine ye)
// this controller is working fine we will not touch it
const getAllProducts = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("cart.product")
        return res.send({ cart: user.cart })
    } catch (error) {
        console.log(error)
        console.log("Error in get all cart products controller", error.message)
        return res.status(500).send({ message: error.message })
    }
}


export { addToCart, removeAllFromCart, updateQuantity, getAllProducts }
