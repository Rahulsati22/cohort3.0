import { create } from 'zustand'
import { instance } from '../lib/axios'
import { toast } from 'react-hot-toast'
// import { logout } from '../../../server/controllers/auth.controller'


const useUserStore = create((set, get) => ({
    user: null,
    loading: false,
    checkingAuth: true,


    signup: async ({ name, email, password, confirmPassword }) => {
        set({ loading: true })
        if (password !== confirmPassword) {
            set({ loading: false })
            toast.error('Passwords do not match')
            return
        }
        try {
            const { data } = await instance.post('/api/auth/signup', { name, email, password })
            set({ user: data, loading: false })
            console.log(data)
        } catch (error) {
            set({ loading: false })
            toast.error(error.response.data.message || 'Something went wrong')
        }
    },

    login: async ({ email, password }) => {
        set({ loading: true })
        try {
            const { data } = await instance.post('/api/auth/login', { email, password })
            set({ user: data, loading: false })
            console.log(data)
        } catch (error) {
            set({ loading: false })
            toast.error(error.response.data.message || 'Something went wrong')
        }
    },

    checkAuth: async () => {
        set({ checkingAuth: true })
        try {
            const { data } = await instance.get('/api/auth/profile')
            set({ user: data, checkingAuth: false })
        } catch (error) {
            set({ checkingAuth: false })
            toast.error(error.response.data.message || 'Something went wrong')
        }
    },


    logout: async () => {
        try {
            await instance.post('/api/auth/logout')
            set({ user: null})
        } catch (error) {
            toast.error(error.response.data.message || 'Something went wrong')
        }
    }
}))


export { useUserStore }