import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from '../components/Loader';
import {
    Minus,
    Plus,
    Trash2,
    ShoppingBag,
    ArrowLeft,
    Tag,
    Truck,
    Shield,
    CreditCard,
    X
} from 'lucide-react';
import { useCartStore } from '../stores/useCartStore';

const CartPage = () => {
    const { cart, total, loading, deleteFromCart, updateQuantity } = useCartStore();

    async function increment(id, quantity) {
        console.log("Item increased", id);
        await updateQuantity(id, quantity + 1);
    }

    async function decrement(id, quantity) {
        console.log("Item decreased", id);
        await updateQuantity(id, quantity - 1);
    }

    async function itemDeleted(id) {
        console.log("Item deleted from cart", id);
        await deleteFromCart(id);
    }

    const deliveryFee = 150;
    const totalPrice = Number(total) + deliveryFee;

    if (!cart || cart.length === 0) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <ShoppingBag className="mx-auto mb-6 text-white/40" size={64} />
                    <h2 className="text-2xl font-bold text-white mb-4">Your Cart is Empty</h2>
                    <p className="text-white/60 mb-8">Add some amazing products to get started!</p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 
                                 text-gray-900 rounded-xl font-semibold transition-colors"
                    >
                        <ArrowLeft size={18} />
                        Start Shopping
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950">
            <div className="mx-auto max-w-md lg:max-w-7xl px-4 py-6">

                {/* Mobile Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                >
                    <div className="flex items-center justify-between mb-4">
                        <Link
                            to="/"
                            className="flex items-center gap-2 text-amber-400 text-sm"
                        >
                            <ArrowLeft size={18} />
                            Continue Shopping
                        </Link>
                    </div>

                    <h1 className="text-2xl font-bold text-white">Shopping Cart</h1>
                    <p className="text-white/60 text-sm">{cart.length} items</p>
                </motion.div>

                {/* Mobile Layout */}
                <div className="lg:grid lg:grid-cols-3 lg:gap-8 space-y-6 lg:space-y-0">

                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="space-y-4">
                            <AnimatePresence>
                                {cart.map((item, index) => (
                                    <MobileCartItem
                                        key={item.product._id}
                                        item={item}
                                        index={index}
                                        onIncrement={() => increment(item.product._id, item.quantity)}
                                        onDecrement={() => decrement(item.product._id, item.quantity)}
                                        onDelete={() => itemDeleted(item.product._id)}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <MobileOrderSummary
                            total={total}
                            deliveryFee={deliveryFee}
                            totalPrice={totalPrice}
                            itemCount={cart.length}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Mobile Optimized Cart Item
const MobileCartItem = ({ item, index, onIncrement, onDecrement, onDelete }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/5 rounded-2xl p-4 border border-white/10"
        >
            <div className="flex gap-4">

                {/* Product Image - Smaller on Mobile */}
                <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/10">
                        {item.product.image && item.product.image.length > 0 ? (
                            <img
                                src={item.product.image[0]}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <ShoppingBag className="text-white/40" size={24} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex-1 pr-2">
                            <h3 className="font-semibold text-white text-base leading-tight line-clamp-2">
                                {item.product.name}
                            </h3>
                            <p className="text-white/60 text-sm mt-1 line-clamp-1">
                                {item.product.description}
                            </p>
                        </div>

                        {/* Delete Button - Always Visible on Mobile */}
                        <button
                            onClick={onDelete}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 
                                     rounded-lg transition-all ml-2"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>

                    {/* Price and Quantity Row */}
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-lg font-bold text-amber-400">
                                ₹{(item.product.price * item.quantity).toLocaleString()}
                            </span>
                            <p className="text-xs text-white/60">
                                ₹{item.product.price.toLocaleString()} each
                            </p>
                        </div>

                        {/* Compact Quantity Controls */}
                        <div className="flex items-center bg-white/10 rounded-lg">
                            <button
                                onClick={onDecrement}
                                disabled={item.quantity <= 1}
                                className="p-2 text-white disabled:opacity-50 disabled:cursor-not-allowed
                                         hover:bg-white/10 rounded-l-lg transition-colors"
                            >
                                <Minus size={14} />
                            </button>

                            <span className="px-3 py-2 text-white font-semibold min-w-[3rem] text-center">
                                {item.quantity}
                            </span>

                            <button
                                onClick={onIncrement}
                                className="p-2 text-white hover:bg-white/10 rounded-r-lg transition-colors"
                            >
                                <Plus size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Mobile Order Summary
const MobileOrderSummary = ({ total, deliveryFee, totalPrice, itemCount }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 rounded-2xl border border-white/10 p-5 sticky top-4"
        >
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Tag size={18} className="text-amber-400" />
                Order Summary
            </h2>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                    <span className="text-white/70 text-sm">Subtotal ({itemCount} items)</span>
                    <span className="text-white font-medium">₹{Number(total).toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-white/70 text-sm flex items-center gap-2">
                        <Truck size={14} />
                        Delivery Fee
                    </span>
                    <span className="text-white font-medium">₹{deliveryFee}</span>
                </div>

                <div className="border-t border-white/20 pt-3">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-white">Total</span>
                        <span className="text-xl font-bold text-amber-400">₹{totalPrice.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Trust Indicators - Compact */}
            <div className="grid grid-cols-3 gap-2 mb-6 text-xs">
                <div className="flex flex-col items-center gap-1 text-green-400">
                    <Shield size={16} />
                    <span>Secure</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-blue-400">
                    <Truck size={16} />
                    <span>Fast</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-purple-400">
                    <CreditCard size={16} />
                    <span>Easy Returns</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 
                             text-gray-900 font-bold py-4 rounded-xl transition-all
                             flex items-center justify-center gap-2 shadow-lg"
                >
                    <CreditCard size={18} />
                    Proceed to Checkout
                </motion.button>

                <Link
                    to="/"
                    className="block w-full text-center py-3 text-amber-400 hover:text-amber-300 
                             font-medium transition-colors border border-amber-500/30 
                             rounded-xl hover:bg-amber-500/10"
                >
                    Continue Shopping
                </Link>
            </div>
        </motion.div>
    );
};

export default CartPage;
