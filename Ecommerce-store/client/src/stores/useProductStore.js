import { create } from 'zustand'
import { instance } from '../lib/axios'
import { toast } from 'react-hot-toast'

const useProductStore = create((set) => ({
    products: [],
    loading: false,
    setProducts: (products) => set({ products }),
    createProducts: async ({ name, price, description, category, stock, images }) => {
        try {
            set({ loading: true })
            const response = await instance.post('/api/product', { name, price, description, category, stock, images }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            toast.success('Product created successfully')
            set((prevState) => ({
                ...prevState, // keep other state properties
                products: [...prevState.products, response.data], // spread the array correctly
                loading: false
            }));

            return response;
        } catch (error) {
            console.error('Error creating product:', error);
            toast.error(error.response.data.message || 'Something went wrong')
            set({ loading: false })
            return error;
        }
    },


    getAllProducts: async () => {
        try {
            set({ loading: true })
            const response = await instance.get('/api/product')
            set({ products: response.data.allProducts, loading: false })
        } catch (error) {
            console.log("Error fetching products", error)
            toast.error(error.response.data.message || "Something went wrong")
            set({ loading: false })
        }
    },

    deleteProduct: async (id) => {
        try {
            set({ loading: true })
            await instance.delete(`/api/product/${id}`)
            toast.success('Product deleted successfully')
            set({ loading: false })
        } catch (error) {
            set({ loading: true })
            toast.error(error.response.data.message || 'Something went wrong')
            set({ loading: false })
        }
    },

    toggleFeaturedProduct: async (id) => {
        try {
            set({ loading: true })
            await instance.patch(`/api/product/toggle-features/${id}`)
            toast.success('Product updated successfully')
            set({ loading: false })
        } catch (error) {
            toast.error(error.response.data.message || 'Something went wrong')
            set({ loading: false })
        }
    },

    fetchProductsByCategory: async (category) => {
        try {
            set({ loading: true })
            const response = await instance.get(`/api/product/category/${category}`)
            console.log(response.data.allProduct)
            set({ products: response.data.allProduct })
            set({ loading: false })
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong")
            set({ loading: false })
        }
    }
}))

export default useProductStore