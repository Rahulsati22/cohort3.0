import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Package, 
    Clock, 
    MapPin, 
    Calendar, 
    DollarSign,
    RefreshCw,
    AlertCircle,
    CheckCircle,
    Truck,
    XCircle,
    ShoppingBag
} from 'lucide-react';
import { useOrdersStore } from '../stores/useOrderStore';

const MyOrders = () => {
    const { myOrders, userOrderLoading, getMyOrders } = useOrdersStore();

    useEffect(() => {
        getMyOrders();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'processing': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'shipped': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
            case 'delivered': return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
            default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'confirmed': return AlertCircle;
            case 'processing': return Clock;
            case 'shipped': return Truck;
            case 'delivered': return CheckCircle;
            case 'cancelled': return XCircle;
            default: return AlertCircle;
        }
    };

    if (userOrderLoading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-amber-400/30 border-t-amber-400 rounded-full"
                />
            </div>
        );
    }

    return (
        myOrders && <div className="min-h-screen bg-gray-950">
            <div className="mx-auto max-w-6xl px-4 py-8">
                
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">My Orders</h1>
                            <p className="text-white/60">
                                {myOrders.length > 0 ? `${myOrders.length} orders found` : 'Your order history'}
                            </p>
                        </div>
                        
                        <button
                            onClick={() => getMyOrders()}
                            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 
                                     text-gray-900 rounded-lg font-medium transition-colors"
                        >
                            <RefreshCw size={16} />
                            Refresh
                        </button>
                    </div>
                </motion.div>

                {/* Orders List */}
                {myOrders.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <ShoppingBag className="mx-auto mb-4 text-white/40" size={64} />
                        <h3 className="text-white text-xl font-medium mb-2">No Orders Yet</h3>
                        <p className="text-white/60">You haven't placed any orders yet</p>
                    </motion.div>
                ) : (
                    <div className="space-y-6">
                        {myOrders.map((order, index) => {
                            const StatusIcon = getStatusIcon(order.status);
                            const statusColor = getStatusColor(order.status);

                            return (
                                <motion.div
                                    key={order._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white/5 rounded-2xl border border-white/10 p-6 
                                             hover:bg-white/10 transition-all duration-300"
                                >
                                    {/* Order Header */}
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                        <div>
                                            <h3 className="text-white font-semibold text-lg mb-2">
                                                Order #{order._id.slice(-8).toUpperCase()}
                                            </h3>
                                            <p className="text-white/60 text-sm flex items-center gap-2">
                                                <Calendar size={14} />
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        
                                        <div className="flex items-center gap-4">
                                            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border ${statusColor}`}>
                                                <StatusIcon size={16} />
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                            
                                            <div className="text-right">
                                                <p className="text-xl font-bold text-amber-400">
                                                    ₹{order.totalAmount.toLocaleString()}
                                                </p>
                                                <p className="text-white/60 text-xs">Total</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        
                                        {/* Shipping Address */}
                                        {order.shippingAddress && (
                                            <div>
                                                <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                                                    <MapPin className="text-amber-400" size={16} />
                                                    Delivery Address
                                                </h4>
                                                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                                    <div className="text-white/80 text-sm space-y-1">
                                                        <p>{order.shippingAddress.street}</p>
                                                        <p>
                                                            {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}
                                                        </p>
                                                        <p>{order.shippingAddress.country}</p>
                                                        {order.shippingAddress.landmark && (
                                                            <p className="text-white/60">Near: {order.shippingAddress.landmark}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Order Items */}
                                        <div>
                                            <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                                                <Package className="text-amber-400" size={16} />
                                                Items ({order.products?.length || 0})
                                            </h4>
                                            
                                            <div className="space-y-2 max-h-48 overflow-y-auto">
                                                {order.products?.length > 0 ? (
                                                    order.products.map((item, idx) => (
                                                        item.product && (
                                                            <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                                                {/* Product Image */}
                                                                <div className="w-10 h-10 bg-white/10 rounded-lg overflow-hidden flex-shrink-0">
                                                                    {item.product.image?.[0] ? (
                                                                        <img 
                                                                            src={item.product.image[0]} 
                                                                            alt={item.product.name}
                                                                            className="w-full h-full object-cover"
                                                                        />
                                                                    ) : (
                                                                        <div className="w-full h-full flex items-center justify-center">
                                                                            <Package className="text-white/40" size={14} />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                
                                                                {/* Product Info */}
                                                                <div className="flex-1">
                                                                    <p className="text-white text-sm font-medium line-clamp-1">
                                                                        {item.product.name}
                                                                    </p>
                                                                    <p className="text-white/60 text-xs">
                                                                        Qty: {item.quantity}
                                                                    </p>
                                                                </div>
                                                                
                                                                <div className="text-right">
                                                                    <p className="text-amber-400 text-sm font-medium">
                                                                        ₹{(item.price * item.quantity).toLocaleString()}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )
                                                    ))
                                                ) : (
                                                    <p className="text-white/40 text-sm text-center py-4">
                                                        No products found
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Footer - SIMPLIFIED (No buttons) */}
                                    <div className="mt-6 pt-4 border-t border-white/10">
                                        <p className="text-white/60 text-sm text-center">
                                            Order placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
