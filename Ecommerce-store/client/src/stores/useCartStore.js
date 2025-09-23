import { create } from "zustand";
import { instance } from "../lib/axios";
import toast from "react-hot-toast";


//create ((callbackfunction1)=>({callbackdunction2}))
export const useCartStore = create((set, get) => ({
    cart: [],
    total: 0,
    loading: false,

    //function to get all items from cart
    getCartItems: async () => {
        try {
            set({ loading: true })
            const response = await instance.get('/api/cart')
            set({ cart: response.data.cart })
            console.log(response.data.cart)
            set({ loading: false })
            await get().calculateTotal()
        } catch (error) {
            set({ cart: [] })
            toast.error(error.response.data.message || 'Error while fetching cart items')
            console.log(error)
            set({ loading: false })
        }
    },


    //function to add item to cart
    addToCart: async (id) => {
        try {
            set({ loading: true })
            const response = await instance.post('/api/cart', { productId: id })
            console.log(response.data.cartItems)
            set({ cart: response.data.cartItems })
            set({ loading: false })
            await get().calculateTotal()
        } catch (error) {
            toast.error(error.response.data.message || 'Error while adding item to cart')
            set({ loading: false })
        }
    },


    calculateTotal: async () => {
        let total = 0;
        const carts = await get().cart
        console.log(carts)
        for (let i = 0; i < carts.length; i++) {
            total += (carts[i].product.price * carts[i].quantity)
        }
        set({ total: total })
        console.log(await get().total)
    },

    //function to delete from cart
    deleteFromCart: async (id) => {
        try {
            set({ loading: true })
            await instance.post('/api/cart/deleteproduct', { productId: id })
            await get().getCartItems()
            set({ loading: false })
            toast.success("Item removed from cart successfully")
            await get().calculateTotal()
        } catch (error) {
            console.log(error)
            toast.error('Error while removing item from cart')
            set({ loading: false })
        }
    },


    // function to update quantity of the product
    updateQuantity: async (id, quantity) => {
        try {
            set({ loading: true })
            const response = await instance.put(`/api/cart/${id}`, { quantity: quantity })
            console.log(response.data)
            toast.success('Quantity updated successfully')
            set({ loading: false })

            await get().getCartItems()
            await get().calculateTotal()
        } catch (error) {
            console.log("error in update quantity", error.message)
            toast.error("Not able to update quantity")
            set({ loading: false })
        }
    },

}))