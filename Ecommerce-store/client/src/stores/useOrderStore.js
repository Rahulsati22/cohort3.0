import { create } from "zustand";
import { instance } from "../lib/axios";
import toast from "react-hot-toast";


export const useOrdersStore = create((set, get) => ({
    orders: [],
    ordersLoading: false,
    userOrderLoading: false,
    myOrders: [],
    getAllOrders: async () => {
        try {
            set({ ordersLoading: true })
            const response = await instance.get('/api/order')
            set({ orders: response.data.allOrders })
            console.log(response, "this is the response of get All orders")
            set({ ordersLoading: false })
        } catch (error) {
            console.log('error in useOrdersStore getAllOrders function', error)
            toast.error(error.response.data.message || 'Something went wrong')
            set({ ordersLoading: false })
        }
    },

    updateOrderStatus: async (orderdId, currentStatus) => {
        try {
            set({ ordersLoading: true })
            const response = await instance.post('/api/order/updatestatus', { orderdId, currentStatus })
            set({ orders: response.data.orderNew })
            toast.success('Status updated successfully')
            set({ ordersLoading: false })
        } catch (error) {
            console.log('error in useOrdersStore updateStatus function', error)
            toast.error(error.response.data.message || 'Something went wrong')
            set({ ordersLoading: false })
        }
    },

    getMyOrders: async () => {
        try {
            set({ userOrderLoading: true })
            const response = await instance.get('/api/order/myorders')
            console.log('RESPONSE', response, 'these are my orders')
            set({ myOrders: response.data.orders })
            set({ userOrderLoading: false })
        } catch (error) {
            console.log('error in useOrdersStore getMyOrders function', error)
            toast.error(error.response.data.message || 'Something went wrong')
            set({ userOrderLoading: false })
        }
    }
}))