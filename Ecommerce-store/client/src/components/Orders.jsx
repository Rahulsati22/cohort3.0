import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  Package,
  DollarSign,
  User,
  MapPin,
  Eye,
  ChevronDown,
  Filter,
  Search,
  Calendar,
  Truck,
  CheckCircle,
  AlertCircle,
  XCircle,
  MoreVertical,
  X
} from 'lucide-react';
import { useOrdersStore } from '../stores/useOrderStore';

const Orders = () => {
  const { orders, ordersLoading, getAllOrders, updateOrderStatus } = useOrdersStore();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isInitialized, setIsInitialized] = useState(false); // NEW: Track initialization

  useEffect(() => {
    const initializeOrders = async () => {
      // Check if orders already exist in the store
      if (orders && orders.length > 0) {
        console.log('Orders already exist, skipping fetch');
        setIsInitialized(true);
        return;
      }

      try {
        console.log('No orders found, fetching from API...');
        await getAllOrders();
        setIsInitialized(true);
      } catch (error) {
        console.error('Error loading orders:', error);
        setIsInitialized(true); // Still mark as initialized even if error
      }
    };

    initializeOrders();
  }, [orders.length]); // Depend on orders length

  // Filter orders based on search and status - only if initialized
  const filteredOrders = isInitialized ? orders.filter(order => {
    const matchesSearch = order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.totalAmount.toString().includes(searchQuery);
    const matchesStatus = statusFilter === '' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) : [];

   

  const handleStatusClick = (orderId, currentStatus) => {
    if (!isInitialized || ordersLoading) return; // Prevent if not ready
    console.log('Status clicked:', orderId, currentStatus);
    // You can define your logic here later
  };

  const openProductModal = (order) => {
    if (!isInitialized || ordersLoading) return; // Prevent if not ready
    setSelectedOrder(order);
    setShowProductModal(true);
  };

  // Show loading until both ordersLoading is false AND isInitialized is true
  if (ordersLoading || !isInitialized) {
    return <OrdersLoader />;
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Orders Management
              </h1>
              <p className="text-white/60">
                {filteredOrders.length} of {orders.length} orders
              </p>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search orders by ID or amount..."
                disabled={!isInitialized} // Disable until ready
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl 
                         text-white placeholder-white/50 focus:outline-none focus:ring-2 
                         focus:ring-amber-400/50 focus:border-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                disabled={!isInitialized} // Disable until ready
                className="appearance-none bg-white/10 border border-white/20 text-white 
                         px-4 py-3 pr-10 rounded-xl focus:outline-none focus:ring-2 
                         focus:ring-amber-400/50 min-w-[140px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="" className="bg-gray-900">All Status</option>
                <option value="confirmed" className="bg-gray-900">Confirmed</option>
                <option value="processing" className="bg-gray-900">Processing</option>
                <option value="shipped" className="bg-gray-900">Shipped</option>
                <option value="delivered" className="bg-gray-900">Delivered</option>
                <option value="cancelled" className="bg-gray-900">Cancelled</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
            </div>
          </div>
        </motion.div>

        {/* Orders List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <AnimatePresence>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <OrderCard
                  key={order._id}
                  order={order}
                  index={index}
                  onStatusClick={handleStatusClick}
                  onViewProducts={() => openProductModal(order)}
                  isInitialized={isInitialized} // Pass initialization state
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <Package className="mx-auto mb-4 text-white/40" size={64} />
                <h3 className="text-white text-xl font-medium mb-2">No Orders Found</h3>
                <p className="text-white/60">
                  {searchQuery || statusFilter ? 'Try adjusting your filters' : 'No orders have been placed yet'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Products Modal */}
      <ProductModal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        order={selectedOrder}
      />
    </div>
  );
};

// Updated OrderCard Component
export const OrderCard = ({ order, index, onStatusClick, onViewProducts, isInitialized }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false); // Track updating state
  const { updateOrderStatus } = useOrdersStore();

  const updateStatus = async (orderId, currentStatus) => {
    if (!isInitialized || isUpdating) return; // Prevent if not ready or already updating
    setIsUpdating(true);
    try {
      await updateOrderStatus(orderId, currentStatus);
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      confirmed: { color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', icon: AlertCircle },
      processing: { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', icon: Clock },
      shipped: { color: 'bg-purple-500/20 text-purple-400 border-purple-500/30', icon: Truck },
      delivered: { color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: CheckCircle },
      cancelled: { color: 'bg-red-500/20 text-red-400 border-red-500/30', icon: XCircle }
    };
    return configs[status] || configs.confirmed;
  };

  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm p-6 
                 hover:bg-white/10 transition-all duration-300 group"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

        {/* Left Section - Order Info */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            {/* Order ID & Date */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-white font-semibold text-lg">
                  #{order._id.slice(-8).toUpperCase()}
                </h3>
                {/* Clickable Status Badge */}
                <button
                  onClick={() => onStatusClick(order._id, order.status)}
                  disabled={!isInitialized || isUpdating}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border ${statusConfig.color} 
                           hover:opacity-80 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <StatusIcon size={12} />
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </button>
              </div>
              <p className="text-white/60 text-sm flex items-center gap-2">
                <Calendar size={14} />
                {new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>

            {/* Total Amount */}
            <div className="text-right">
              <p className="text-2xl font-bold text-amber-400">
                ₹{order.totalAmount.toLocaleString()}
              </p>
              <p className="text-white/60 text-sm">Total Amount</p>
            </div>
          </div>

          {/* Shipping Address */}
          {order.shippingAddress && (
            <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
              <MapPin className="text-amber-400 mt-0.5" size={16} />
              <div>
                <p className="text-white text-sm font-medium mb-1">Shipping Address</p>
                <p className="text-white/70 text-sm leading-relaxed">
                  {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}
                </p>
              </div>
            </div>
          )}

          {/* Products Summary */}
          <div className="flex items-center gap-4 text-sm text-white/70">
            <span className="flex items-center gap-1">
              <Package size={14} />
              {order.products?.length || 0} items
            </span>
            {order.user && (
              <span className="flex items-center gap-1">
                <User size={14} />
                Customer
              </span>
            )}
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex flex-col sm:flex-row gap-3">

          {/* View Products Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onViewProducts}
            disabled={!isInitialized}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 
                     text-white rounded-lg transition-colors border border-white/20
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Eye size={16} />
            <span className="hidden sm:inline">View Products</span>
          </motion.button>

          {/* Status Update Button */}
          <div className="relative">
            <motion.button
              disabled={order.status === 'delivered' || order.status === 'cancelled' || !isInitialized || isUpdating}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => updateStatus(order._id, order.status)}
              className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 
                       text-gray-900 rounded-lg font-medium transition-colors min-w-[120px] justify-center
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-amber-500"
            >
              {isUpdating ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-gray-900/30 border-t-gray-900 rounded-full"
                  />
                  Updating...
                </>
              ) : (
                <>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  {(order.status === 'delivered' || order.status === 'cancelled') && (
                    <span className="text-xs">(Final)</span>
                  )}
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Products Modal Component - Same as before but with initialization check
const ProductModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/10 
                     max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 flex-shrink-0">
            <div>
              <h3 className="text-xl font-semibold text-white">Order Products</h3>
              <p className="text-white/60 text-sm">
                Order #{order._id.slice(-8).toUpperCase()} • {order.products?.length || 0} items
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="text-white/60 hover:text-white" size={20} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-6" style={{ maxHeight: 'calc(85vh - 200px)' }}>
            <div className="space-y-4">
              {order.products?.length > 0 ? (
                order.products.map((item, index) => (
                  item.product && (
                    <motion.div
                      key={item._id || index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10"
                    >
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-white/10 rounded-lg overflow-hidden flex-shrink-0">
                        {item.product.image?.[0] ? (
                          <img
                            src={item.product.image[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="text-white/40" size={24} />
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h4 className="text-white font-medium mb-1">{item.product.name}</h4>
                        <p className="text-white/60 text-sm mb-2 line-clamp-2">{item.product.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-white/70">Category: {item.product.category}</span>
                          <span className="text-white/70">Qty: {item.quantity}</span>
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="text-right">
                        <p className="text-amber-400 font-semibold">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                        <p className="text-white/60 text-sm">
                          ₹{item.price.toLocaleString()} × {item.quantity}
                        </p>
                      </div>
                    </motion.div>
                  )
                ))
              ) : (
                <div className="text-center py-8">
                  <Package className="mx-auto mb-4 text-white/40" size={48} />
                  <p className="text-white/60">No products found in this order</p>
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-6 border-t border-white/10 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="text-white/60 text-sm">
                Total: {order.products?.length || 0} items
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-amber-400">
                  ₹{order.totalAmount.toLocaleString()}
                </p>
                <p className="text-white/60 text-sm">Total Amount</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Loading Component
const OrdersLoader = () => (
  <div className="min-h-screen bg-gray-950 flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-4 border-amber-400/30 border-t-amber-400 rounded-full mx-auto mb-4"
      />
      <p className="text-white/60">Loading orders...</p>
      <p className="text-white/40 text-sm mt-2">Please wait while we fetch your orders...</p>
    </motion.div>
  </div>
);

export default Orders;
