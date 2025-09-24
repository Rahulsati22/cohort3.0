import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    MapPin,
    Home,
    Building,
    User,
    Plus,
    Edit,
    Trash2,
    Check,
    Star
} from 'lucide-react';
import { useAddressStore } from '../stores/useAddressStore';
import { useUserStore } from '../stores/useUserStore';

const AddressModal = ({ isOpen, onClose, onAddressSelect }) => {
    const { addresses, loading, fetchAddresses, addAddress, deleteAddress, setDefaultAddress } = useAddressStore();
    const { user } = useUserStore();
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchAddresses();
        }
    }, [isOpen, fetchAddresses]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-gray-900 rounded-2xl max-w-lg w-full max-h-[80vh] overflow-hidden border border-white/10"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
                        <div>
                            <h3 className="text-base sm:text-lg font-semibold text-white">
                                {showAddForm ? 'Add New Address' : 'Select Delivery Address'}
                            </h3>
                            <p className="text-white/60 text-xs sm:text-sm mt-1">
                                {showAddForm ? 'Enter your delivery details' : 'Choose where to deliver your order'}
                            </p>
                        </div>
                        <button 
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <X className="text-white/60 hover:text-white" size={20} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="overflow-y-auto max-h-[60vh]">
                        {showAddForm ? (
                            <AddressForm 
                                onSave={async (addressData) => {
                                    const result = await addAddress(addressData);
                                    if (result.success) {
                                        setShowAddForm(false);
                                        // Auto-select the new address if it's the first one
                                        if (addresses.length === 0) {
                                            const newAddress = { ...addressData, _id: Date.now(), isDefault: true };
                                            onAddressSelect(newAddress);
                                        }
                                    } else {
                                        alert(result.message);
                                    }
                                }}
                                onCancel={() => setShowAddForm(false)}
                            />
                        ) : (
                            <AddressList 
                                addresses={addresses}
                                loading={loading}
                                onAddNew={() => setShowAddForm(true)}
                                onSelect={onAddressSelect}
                                onDelete={deleteAddress}
                                onSetDefault={setDefaultAddress}
                            />
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

// Address List Component
const AddressList = ({ addresses, loading, onAddNew, onSelect, onDelete, onSetDefault }) => {
    if (loading) {
        return (
            <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-amber-400 border-t-transparent mx-auto"></div>
                <p className="text-white/60 mt-2 text-sm">Loading addresses...</p>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 space-y-4">
            {/* Add New Address Button */}
            <button
                onClick={onAddNew}
                className="w-full flex items-center justify-center gap-3 p-3 sm:p-4 border-2 border-dashed 
                         border-amber-400/30 rounded-xl hover:border-amber-400/50 hover:bg-amber-400/5 
                         transition-colors group"
            >
                <Plus className="text-amber-400 group-hover:scale-110 transition-transform" size={18} />
                <span className="text-amber-400 font-medium text-sm sm:text-base">Add New Address</span>
            </button>

            {/* Existing Addresses */}
            {addresses && addresses.length > 0 ? (
                <div className="space-y-3">
                    {addresses.map((address) => (
                        <AddressCard
                            key={address._id}
                            address={address}
                            onSelect={() => onSelect(address)}
                            onDelete={() => onDelete(address._id)}
                            onSetDefault={() => onSetDefault(address._id)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <MapPin className="mx-auto mb-4 text-white/40" size={40} />
                    <p className="text-white/60 text-sm">No addresses saved yet</p>
                    <p className="text-white/40 text-xs">Add your first delivery address above</p>
                </div>
            )}
        </div>
    );
};

// Individual Address Card - MOBILE OPTIMIZED
const AddressCard = ({ address, onSelect, onDelete, onSetDefault }) => {
    const getAddressIcon = (type) => {
        switch (type) {
            case 'office': return Building;
            case 'other': return User;
            default: return Home;
        }
    };

    const Icon = getAddressIcon(address.addressType);

    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`p-3 sm:p-4 rounded-xl border cursor-pointer transition-all group relative ${
                address.isDefault 
                    ? 'border-amber-400/50 bg-amber-400/10' 
                    : 'border-white/10 bg-white/5 hover:border-white/20'
            }`}
            onClick={onSelect}
        >
            {/* MAIN CONTENT */}
            <div className="flex items-start gap-3 pr-16 sm:pr-20">
                <Icon 
                    className={`mt-0.5 flex-shrink-0 ${
                        address.isDefault ? 'text-amber-400' : 'text-white/60'
                    }`} 
                    size={16} 
                />
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-medium capitalize text-sm sm:text-base">
                            {address.addressType}
                        </span>
                        {/* MOBILE-FRIENDLY DEFAULT BADGE */}
                        {address.isDefault && (
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-400/20 
                                           rounded-full text-amber-400 text-xs font-medium">
                                <Star className="w-3 h-3 fill-amber-400" />
                                <span className="hidden xs:inline">Default</span>
                            </div>
                        )}
                    </div>
                    <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                        {address.street}
                    </p>
                    <p className="text-white/80 text-xs sm:text-sm">
                        {address.city}, {address.state} - {address.postalCode}
                    </p>
                    {address.landmark && (
                        <p className="text-white/40 text-xs mt-1">
                            Near: {address.landmark}
                        </p>
                    )}
                </div>
            </div>

            {/* MOBILE-OPTIMIZED ACTION BUTTONS */}
            <div className="absolute top-3 right-3 flex flex-col gap-1 sm:flex-row sm:gap-1 
                           sm:opacity-0 sm:group-hover:opacity-100 sm:transition-opacity opacity-100">
                {!address.isDefault && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onSetDefault();
                        }}
                        className="p-2 hover:bg-amber-400/20 text-amber-400 rounded-lg transition-colors
                                 bg-amber-400/10 sm:bg-transparent"
                        title="Set as default"
                    >
                        <Star className="w-4 h-4" />
                    </button>
                )}
                
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Delete this address?')) {
                            onDelete();
                        }
                    }}
                    className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors
                             bg-red-500/10 sm:bg-transparent"
                    title="Delete address"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    );
};

// Address Form Component - MOBILE OPTIMIZED
const AddressForm = ({ onSave, onCancel, initialData = {} }) => {
    const [formData, setFormData] = useState({
        street: '',
        city: '',
        state: '',
        postalCode: '',
        landmark: '',
        addressType: 'home',
        isDefault: false,
        ...initialData
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.street || !formData.city || !formData.state || !formData.postalCode) {
            alert('Please fill all required fields');
            return;
        }

        if (!/^\d{6}$/.test(formData.postalCode)) {
            alert('Please enter a valid 6-digit PIN code');
            return;
        }

        setLoading(true);
        await onSave(formData);
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
            {/* Street Address */}
            <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                    Street Address *
                </label>
                <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/20 rounded-xl 
                             text-white placeholder-white/40 focus:outline-none focus:ring-2 
                             focus:ring-amber-400/50 focus:border-amber-400 text-sm"
                    placeholder="Enter your complete address"
                    required
                />
            </div>

            {/* City & State */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                        City *
                    </label>
                    <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/20 rounded-xl 
                                 text-white placeholder-white/40 focus:outline-none focus:ring-2 
                                 focus:ring-amber-400/50 focus:border-amber-400 text-sm"
                        placeholder="City"
                        required
                    />
                </div>
                <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                        State *
                    </label>
                    <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/20 rounded-xl 
                                 text-white placeholder-white/40 focus:outline-none focus:ring-2 
                                 focus:ring-amber-400/50 focus:border-amber-400 text-sm"
                        placeholder="State"
                        required
                    />
                </div>
            </div>

            {/* PIN Code & Landmark */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                        PIN Code *
                    </label>
                    <input
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/20 rounded-xl 
                                 text-white placeholder-white/40 focus:outline-none focus:ring-2 
                                 focus:ring-amber-400/50 focus:border-amber-400 text-sm"
                        placeholder="123456"
                        maxLength={6}
                        pattern="\d{6}"
                        required
                    />
                </div>
                <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                        Landmark
                    </label>
                    <input
                        type="text"
                        value={formData.landmark}
                        onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/20 rounded-xl 
                                 text-white placeholder-white/40 focus:outline-none focus:ring-2 
                                 focus:ring-amber-400/50 focus:border-amber-400 text-sm"
                        placeholder="Near landmark"
                    />
                </div>
            </div>

            {/* Address Type - MOBILE OPTIMIZED */}
            <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                    Address Type
                </label>
                <div className="flex gap-2 sm:gap-3">
                    {[
                        { value: 'home', label: 'Home', icon: Home },
                        { value: 'office', label: 'Office', icon: Building },
                        { value: 'other', label: 'Other', icon: User }
                    ].map((type) => {
                        const Icon = type.icon;
                        return (
                            <button
                                key={type.value}
                                type="button"
                                onClick={() => setFormData({ ...formData, addressType: type.value })}
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border transition-all text-xs sm:text-sm ${
                                    formData.addressType === type.value
                                        ? 'border-amber-400 bg-amber-400/10 text-amber-400'
                                        : 'border-white/20 bg-white/5 text-white/70 hover:border-white/30'
                                }`}
                            >
                                <Icon size={14} />
                                <span>{type.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Set as Default - MOBILE OPTIMIZED */}
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    id="isDefault"
                    checked={formData.isDefault}
                    onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                    className="w-4 h-4 text-amber-400 bg-transparent border-white/30 rounded 
                             focus:ring-amber-400 focus:ring-2"
                />
                <label htmlFor="isDefault" className="text-white/80 text-sm">
                    Set as default address
                </label>
            </div>

            {/* Action Buttons - MOBILE OPTIMIZED */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="w-full py-2.5 sm:py-3 px-4 border border-white/20 text-white/70 rounded-xl 
                             hover:bg-white/5 transition-colors text-sm sm:text-base"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 sm:py-3 px-4 bg-amber-500 hover:bg-amber-400 text-gray-900 
                             font-semibold rounded-xl transition-colors disabled:opacity-50 
                             disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-900 border-t-transparent"></div>
                            Saving...
                        </>
                    ) : (
                        <>
                            <Check size={16} />
                            Save Address
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default AddressModal;
