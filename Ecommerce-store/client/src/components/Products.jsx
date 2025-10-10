import React, { use, useEffect, useState, useNavigate } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trash2,
  Star,
  StarOff,
  Package,
  Search,
  Filter,
  AlertCircle
} from 'lucide-react';
import useProductStore from '../stores/useProductStore';
import { useUserStore } from '../stores/useUserStore';
 

const Products = () => {
  const { getAllProducts, products, toggleFeaturedProduct, deleteProduct } = useProductStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isToggle, setIsToggle] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  useEffect(() => {
    getAllProducts();
  }, [isToggle, isDelete]);


  // Filter products based on search and category
  const filteredProducts = products?.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  const categories = [...new Set(products?.map(p => p.category) || [])];

  // This is toggle feature function
  const handleToggleFeatured = async (productId, currentStatus) => {
    try {
      await toggleFeaturedProduct(productId)
      setIsToggle(!isToggle)
    } catch (error) {
      console.error('Error toggling featured status:', error);
    }
  };

  // This is delete product function
  const handleDeleteProduct = async (productId) => {
    try {
      try {
        setIsDeleteLoading(true)
        await deleteProduct(productId)
        setIsDelete(!isDelete)
        setIsDeleteLoading(false)
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    } catch (error) {
      console.log('Error deleting product:', error);
    }
  };

  if (!products) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-white/70">Loading products...</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full space-y-6 mt-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-400/10">
            <Package className="text-amber-400" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 
                                           bg-clip-text text-transparent">
                All Products
              </span>
            </h2>
            <p className="text-white/60 text-sm">{filteredProducts.length} products found</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={18} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl bg-white/5 text-white placeholder-white/40
                                 border border-white/10 focus:outline-none
                                 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40
                                 pl-10 pr-4 py-2.5"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={18} />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="rounded-xl bg-white/5 text-white border border-white/10
                                 focus:outline-none focus:ring-2 focus:ring-amber-500/40
                                 pl-10 pr-8 py-2.5 appearance-none min-w-[160px]"
          >
            <option value="all" className="bg-gray-900">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat} className="bg-gray-900">{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      {filteredProducts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 rounded-2xl bg-white/5 border border-white/10"
        >
          <AlertCircle className="mx-auto mb-4 text-white/40" size={48} />
          <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
          <p className="text-white/60">Try adjusting your search or filter criteria</p>
        </motion.div>
      ) : (
        <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 font-medium text-white/80">Product</th>
                  <th className="text-left p-4 font-medium text-white/80">Price</th>
                  <th className="text-left p-4 font-medium text-white/80">Category</th>
                  <th className="text-left p-4 font-medium text-white/80">Stock</th>
                  <th className="text-left p-4 font-medium text-white/80">Featured</th>
                  <th className="text-left p-4 font-medium text-white/80">Action</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredProducts.map((product, index) => (
                    <motion.tr
                      key={product._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      {/* Product Info */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {product.image && product.image.length > 0 ? (
                            <img
                              src={product.image[0]}
                              alt={product.name}
                              className="w-12 h-12 rounded-lg border border-white/10 object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                              <Package className="text-white/40" size={20} />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-white">{product.name}</p>
                            <p className="text-sm text-white/60 line-clamp-1">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="p-4">
                        <span className="font-semibold text-amber-400">
                          ₹{product.price?.toLocaleString()}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="p-4">
                        <span className="px-2 py-1 rounded-lg bg-white/10 text-white/80 text-sm">
                          {product.category}
                        </span>
                      </td>

                      {/* Stock */}
                      <td className="p-4">
                        <span className={`font-medium ${product.stock > 10
                          ? 'text-emerald-400'
                          : product.stock > 0
                            ? 'text-amber-400'
                            : 'text-red-400'
                          }`}>
                          {product.stock} units
                        </span>
                      </td>

                      {/* Featured Toggle */}
                      <td className="p-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleToggleFeatured(product._id, product.isFeatured)}
                          className={`p-2 rounded-lg transition-colors ${product.isFeatured
                            ? 'bg-amber-400/20 text-amber-400 hover:bg-amber-400/30'
                            : 'bg-white/10 text-white/60 hover:bg-white/20'
                            }`}
                        >
                          {product.isFeatured ? (
                            <Star size={16} className="fill-current" />
                          ) : (
                            <StarOff size={16} />
                          )}
                        </motion.button>
                      </td>

                      {/* Delete Action */}
                      <td className="p-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDeleteProduct(product._id)}
                          className="p-2 rounded-lg bg-red-500/20 text-red-400 
                                                             hover:bg-red-500/30 transition-colors"
                          title="Delete product"
                          disabled={isDeleteLoading}
                        >
                          <Trash2 size={16} />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4 p-4">
            <AnimatePresence>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-4"
                >
                  {/* Product Header */}
                  <div className="flex items-start gap-3">
                    {product.image && product.image.length > 0 ? (
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className="w-16 h-16 rounded-xl object-cover border border-white/10 flex-shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Package className="text-white/40" size={24} />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white">{product.name}</h3>
                      <p className="text-white/60 text-sm line-clamp-2 mt-1">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-bold text-amber-400">
                          ₹{product.price?.toLocaleString()}
                        </span>
                        <span className="px-2 py-1 rounded-md bg-white/10 text-white/70 text-xs">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Product Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-xs text-white/60">Stock</p>
                        <p className={`font-medium ${product.stock > 10
                          ? 'text-emerald-400'
                          : product.stock > 0
                            ? 'text-amber-400'
                            : 'text-red-400'
                          }`}>
                          {product.stock} units
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-white/60">Featured</p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleToggleFeatured(product._id, product.isFeatured)}
                          className={`mt-1 p-1.5 rounded-lg transition-colors ${product.isFeatured
                            ? 'bg-amber-400/20 text-amber-400'
                            : 'bg-white/10 text-white/60'
                            }`}
                        >
                          {product.isFeatured ? (
                            <Star size={14} className="fill-current" />
                          ) : (
                            <StarOff size={14} />
                          )}
                        </motion.button>
                      </div>
                    </div>

                    {/* Delete Action Only */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDeleteProduct(product._id)}
                      className="p-2 rounded-lg bg-red-500/20 text-red-400 
                                                     hover:bg-red-500/30 transition-colors"
                      title="Delete product"
                      disabled={isDeleteLoading}
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Products;
