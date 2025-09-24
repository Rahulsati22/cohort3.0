import { create } from 'zustand';
import { instance } from '../lib/axios';

export const useAddressStore = create((set, get) => ({
    addresses: [],
    loading: false,
    selectedAddress: null,

    // Fetch user addresses
    fetchAddresses: async () => {
        try {
            set({ loading: true });
            const response = await instance.get('/api/address');
            
            if (response.data.success) {
                set({ 
                    addresses: response.data.addresses,
                    loading: false 
                });
                
                // Set default address if exists
                const defaultAddr = response.data.addresses.find(addr => addr.isDefault);
                if (defaultAddr) {
                    set({ selectedAddress: defaultAddr });
                }
            }
        } catch (error) {
            console.error('Error fetching addresses:', error);
            set({ loading: false });
        }
    },

    // Add new address
    addAddress: async (addressData) => {
        try {
            set({ loading: true });
            const response = await instance.post('/api/address', addressData);
            
            if (response.data.success) {
                // Refresh addresses
                get().fetchAddresses();
                return { success: true };
            }
        } catch (error) {
            console.error('Error adding address:', error);
            set({ loading: false });
            return { 
                success: false, 
                message: error.response?.data?.message || 'Failed to add address' 
            };
        }
    },

    // Update address
    updateAddress: async (addressId, addressData) => {
        try {
            set({ loading: true });
            const response = await instance.put(`/api/address/${addressId}`, addressData);
            
            if (response.data.success) {
                get().fetchAddresses();
                return { success: true };
            }
        } catch (error) {
            console.error('Error updating address:', error);
            set({ loading: false });
            return { 
                success: false, 
                message: error.response?.data?.message || 'Failed to update address' 
            };
        }
    },

    // Delete address
    deleteAddress: async (addressId) => {
        try {
            set({ loading: true });
            const response = await instance.delete(`/api/address/${addressId}`);
            
            if (response.data.success) {
                get().fetchAddresses();
                return { success: true };
            }
        } catch (error) {
            console.error('Error deleting address:', error);
            set({ loading: false });
            return { 
                success: false, 
                message: error.response?.data?.message || 'Failed to delete address' 
            };
        }
    },

    // Set default address
    setDefaultAddress: async (addressId) => {
        try {
            const response = await instance.put(`/api/address/set-default/${addressId}`);
            
            if (response.data.success) {
                get().fetchAddresses();
                return { success: true };
            }
        } catch (error) {
            console.error('Error setting default address:', error);
            return { 
                success: false, 
                message: error.response?.data?.message || 'Failed to set default address' 
            };
        }
    },

    // Set selected address
    setSelectedAddress: (address) => {
        set({ selectedAddress: address });
    },

    // Clear selected address
    clearSelectedAddress: () => {
        set({ selectedAddress: null });
    }
}));
