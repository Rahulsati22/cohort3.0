import { create } from "zustand"
import { instance } from "../lib/axios"
import toast from 'react-hot-toast'


export const useAnalyticsStore = create((set, get) => ({
    users: null,
    products: null,
    sales: null,
    revenue: null,
    loadingAnalytics: false,

    getStats: async () => {
        try {
            set({ loadingAnalytics: true })
            const response = await instance.get('/api/analytics')
            const users = response.data.users
            const products = response.data.products
            const sales = response.data.sales
            const revenue = response.data.revenue
            set({ users, products, sales, revenue })
            set({ loadingAnalytics: false })
        } catch (error) {
            console.log('error in getstats', error)
            toast.error(error.response.data.message || 'Error in fetching stats')
            set({ loadingAnalytics: false })
        }
    }
}))