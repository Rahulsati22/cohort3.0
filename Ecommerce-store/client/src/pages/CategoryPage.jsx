import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    Star,
    ShoppingCart,
    Heart,
    Eye,
    Filter,
    Grid3x3,
    Package,
    X,
    ZoomIn,
    Expand,
    Search,
    SlidersHorizontal,
    List,
    Grid,
    TrendingUp,
    ArrowUpDown,
    ChevronDown
} from 'lucide-react';
import useProductStore from '../stores/useProductStore';
import { useUserStore } from '../stores/useUserStore';
import toast from 'react-hot-toast';
import DotsPulse from '../components/Loader';
import { useCartStore } from '../stores/useCartStore';

const CategoryPage = () => {
    const { fetchProductsByCategory, products, loading } = useProductStore();
    const { category } = useParams();

    // Enhanced State Management [web:605]
    const [sortBy, setSortBy] = useState('name');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState('grid'); // grid or list
    const [priceRange, setPriceRange] = useState([0, 50000]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [inStock, setInStock] = useState(false);
    const [imageModal, setImageModal] = useState({ isOpen: false, image: [], currentIndex: 0, productName: '' });

    const availableColors = [

    ];

    const availableSizes = [];

    useEffect(() => {
        if (category) {
            fetchProductsByCategory(category);
        }
    }, [category, fetchProductsByCategory]);

    // Enhanced Filtering Logic [web:605]
    useEffect(() => {
        if (!products) return;

        let filtered = [...products];

        // Search filter
        if (searchQuery.trim()) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Price range filter
        filtered = filtered.filter(product =>
            product.price >= priceRange[0] && product.price <= priceRange[1]
        );

        // Stock filter
        if (inStock) {
            filtered = filtered.filter(product => product.stock > 0);
        }

        // Color filter (if needed in future)
        if (selectedColors.length > 0) {
            // This would need product color data
        }

        // Size filter (if needed in future)
        if (selectedSizes.length > 0) {
            // This would need product size data
        }

        setFilteredProducts(filtered);
    }, [products, searchQuery, priceRange, inStock, selectedColors, selectedSizes]);

    // Enhanced Sorting Logic [web:607]
    const sortedProducts = filteredProducts?.sort((a, b) => {
        switch (sortBy) {
            case 'price-low': return a.price - b.price;
            case 'price-high': return b.price - a.price;
            case 'name-asc': return a.name.localeCompare(b.name);
            case 'name-desc': return b.name.localeCompare(a.name);
            case 'newest': return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
            case 'popular': return (b.rating || 0) - (a.rating || 0);
            default: return 0;
        }
    }) || [];

    const clearFilters = () => {
        setSearchQuery('');
        setPriceRange([0, 50000]);
        setSelectedColors([]);
        setSelectedSizes([]);
        setInStock(false);
    };

    const openImageModal = (image, startIndex, productName) => {
        setImageModal({
            isOpen: true,
            image: image || [],
            currentIndex: startIndex,
            productName
        });
        document.body.style.overflow = 'hidden';
    };

    const closeImageModal = () => {
        setImageModal({ isOpen: false, image: [], currentIndex: 0, productName: '' });
        document.body.style.overflow = 'unset';
    };

    const navigateModalImage = (direction, targetIndex = null) => {
        setImageModal(prev => ({
            ...prev,
            currentIndex: targetIndex !== null
                ? targetIndex
                : direction === 'next'
                    ? (prev.currentIndex + 1) % prev.image.length
                    : prev.currentIndex === 0 ? prev.image.length - 1 : prev.currentIndex - 1
        }));
    };

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (!imageModal.isOpen) return;

            switch (e.key) {
                case 'Escape':
                    closeImageModal();
                    break;
                case 'ArrowLeft':
                    navigateModalImage('prev');
                    break;
                case 'ArrowRight':
                    navigateModalImage('next');
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [imageModal.isOpen]);

    if (!products || products.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Package className="mx-auto mb-4 text-white/40" size={64} />
                    <h2 className="text-2xl font-bold text-white mb-2">No Products Found</h2>
                    <p className="text-white/60">No products available in {category} category</p>
                </div>
            </div>
        );
    }

    return (
        loading ? <DotsPulse /> : <div className="min-h-screen relative">
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(245,158,11,0.3)_1px,transparent_0)] 
                               bg-[length:60px_60px]" />
            </div>

            <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">

                {/* Enhanced Header with Search [web:607] */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <div className="flex flex-col gap-6">
                        {/* Title Section */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
                                    <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 
                                                   bg-clip-text text-transparent">
                                        {category}
                                    </span>
                                </h1>
                                <p className="text-white/60">
                                    {sortedProducts.length} of {products.length} products
                                    {searchQuery && (
                                        <span className="text-amber-400 ml-2">
                                            matching "{searchQuery}"
                                        </span>
                                    )}
                                </p>
                            </div>

                            {/* View Mode Toggle */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid'
                                            ? 'bg-amber-500 text-gray-900'
                                            : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20'
                                        }`}
                                >
                                    <Grid size={20} />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg transition-all ${viewMode === 'list'
                                            ? 'bg-amber-500 text-gray-900'
                                            : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20'
                                        }`}
                                >
                                    <List size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Search Bar [web:605] */}
                        <div className="relative max-w-xl">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-white/60" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="block w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 
                                         rounded-xl text-white placeholder-white/50 backdrop-blur-sm
                                         focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400
                                         transition-all duration-300"
                                placeholder={`Search in ${category}...`}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                >
                                    <X className="h-4 w-4 text-white/60 hover:text-white transition-colors" />
                                </button>
                            )}
                        </div>

                        {/* Controls Bar [web:605] */}
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                            {/* Filter Controls */}
                            <div className="flex items-center gap-3 flex-wrap">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 
                                             text-white rounded-lg transition-colors border border-white/20"
                                >
                                    <SlidersHorizontal size={18} />
                                    Filters
                                    {(priceRange[0] > 0 || priceRange[1] < 50000 || inStock || selectedColors.length > 0) && (
                                        <span className="ml-1 px-2 py-0.5 bg-amber-500 text-gray-900 text-xs rounded-full">
                                            {[
                                                priceRange[0] > 0 || priceRange[1] < 50000 ? 1 : 0,
                                                inStock ? 1 : 0,
                                                selectedColors.length
                                            ].reduce((a, b) => a + b, 0)}
                                        </span>
                                    )}
                                </button>

                                {/* Quick Filters */}
                                <button
                                    onClick={() => setInStock(!inStock)}
                                    className={`px-3 py-2 rounded-lg text-sm transition-all ${inStock
                                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                            : 'bg-white/10 text-white/70 hover:bg-white/20 border border-white/20'
                                        }`}
                                >
                                    In Stock Only
                                </button>

                                {searchQuery && (
                                    <div className="px-3 py-2 bg-amber-500/20 text-amber-400 rounded-lg text-sm border border-amber-500/30">
                                        Search: "{searchQuery}"
                                    </div>
                                )}
                            </div>

                            {/* Sort Controls */}
                            <div className="flex items-center gap-2">
                                <ArrowUpDown className="text-white/60" size={18} />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="rounded-lg bg-white/10 border border-white/20 text-white 
                                             px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400/50 min-w-[140px]"
                                >
                                    <option value="name-asc" className="bg-gray-900">Name A-Z</option>
                                    <option value="name-desc" className="bg-gray-900">Name Z-A</option>
                                    <option value="price-low" className="bg-gray-900">Price: Low to High</option>
                                    <option value="price-high" className="bg-gray-900">Price: High to Low</option>
                                    <option value="newest" className="bg-gray-900">Newest First</option>
                                    <option value="popular" className="bg-gray-900">Most Popular</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Advanced Filters Panel [web:605] */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, y: -20 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="mb-8 overflow-hidden"
                        >
                            <div className="bg-white/5 rounded-2xl border border-white/10 p-6 backdrop-blur-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-white">Advanced Filters</h3>
                                    <button
                                        onClick={clearFilters}
                                        className="text-amber-400 hover:text-amber-300 text-sm font-medium"
                                    >
                                        Clear All
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {/* Price Range */}
                                    <div>
                                        <label className="block text-white/80 text-sm font-medium mb-3">
                                            Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                                        </label>
                                        <div className="space-y-3">
                                            <input
                                                type="range"
                                                min="0"
                                                max="50000"
                                                step="500"
                                                value={priceRange[0]}
                                                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                                                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                                            />
                                            <input
                                                type="range"
                                                min="0"
                                                max="50000"
                                                step="500"
                                                value={priceRange[1]}
                                                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                                            />
                                        </div>
                                    </div>

                                    {/* Colors Filter */}
                                    <div>
                                        {/* <label className="block text-white/80 text-sm font-medium mb-3">Colors</label> */}
                                        <div className="flex flex-wrap gap-2">
                                            {availableColors.map((color) => (
                                                <button
                                                    key={color.name}
                                                    onClick={() => {
                                                        setSelectedColors(prev =>
                                                            prev.includes(color.name)
                                                                ? prev.filter(c => c !== color.name)
                                                                : [...prev, color.name]
                                                        );
                                                    }}
                                                    className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColors.includes(color.name)
                                                            ? 'border-amber-400 scale-110 shadow-lg'
                                                            : 'border-white/30 hover:border-white/60'
                                                        }`}
                                                    style={{ backgroundColor: color.value }}
                                                    title={color.name}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Sizes Filter */}
                                    <div>
                                        {/* <label className="block text-white/80 text-sm font-medium mb-3">Sizes (US)</label> */}
                                        <div className="flex flex-wrap gap-2">
                                            {availableSizes.map((size) => (
                                                <button
                                                    key={size}
                                                    onClick={() => {
                                                        setSelectedSizes(prev =>
                                                            prev.includes(size)
                                                                ? prev.filter(s => s !== size)
                                                                : [...prev, size]
                                                        );
                                                    }}
                                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedSizes.includes(size)
                                                            ? 'bg-amber-400 text-gray-900'
                                                            : 'bg-white/10 text-white/70 hover:bg-white/20'
                                                        }`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Results Summary */}
                {searchQuery && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6"
                    >
                        <div className="flex items-center gap-2 text-white/70">
                            <TrendingUp size={16} />
                            <span>Showing {sortedProducts.length} results for "{searchQuery}"</span>
                        </div>
                    </motion.div>
                )}

                {/* Products Grid/List */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={
                        viewMode === 'grid'
                            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                            : "space-y-6"
                    }
                >
                    <AnimatePresence>
                        {sortedProducts.length > 0 ? (
                            sortedProducts.map((product, index) => (
                                viewMode === 'grid' ? (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                        index={index}
                                        availableColors={availableColors}
                                        availableSizes={availableSizes}
                                        onImageClick={openImageModal}
                                        id={product._id}
                                        searchQuery={searchQuery}
                                    />
                                ) : (
                                    <ProductListItem
                                        key={product._id}
                                        product={product}
                                        index={index}
                                        onImageClick={openImageModal}
                                        id={product._id}
                                        searchQuery={searchQuery}
                                    />
                                )
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full text-center py-12"
                            >
                                <Search className="mx-auto mb-4 text-white/40" size={64} />
                                <h3 className="text-white text-xl font-medium mb-2">No products found</h3>
                                <p className="text-white/60 mb-4">
                                    {searchQuery
                                        ? `No products match "${searchQuery}" in ${category}`
                                        : 'Try adjusting your filters or search terms'
                                    }
                                </p>
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        clearFilters();
                                    }}
                                    className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-gray-900 
                                             rounded-xl font-semibold transition-colors"
                                >
                                    Clear Search & Filters
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </section>

            <ImageModal
                isOpen={imageModal.isOpen}
                image={imageModal.image}
                currentIndex={imageModal.currentIndex}
                productName={imageModal.productName}
                onClose={closeImageModal}
                onNavigate={navigateModalImage}
            />
        </div>
    );
};

// Enhanced Product Card (keeping your existing one but with search highlighting)
const ProductCard = ({ product, index, availableColors, availableSizes, onImageClick, id, searchQuery }) => {
    const navigate = useNavigate()
    const { user } = useUserStore()
    const { addToCart: adToCart } = useCartStore()

    const addToCart = (id) => {
        if (user) {
            toast.success("Added to cart")
            adToCart(id)
        } else {
            toast.error("You are not logged in", { id: "login" })
        }
    }

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedColor, setSelectedColor] = useState(availableColors[0]);
    const [selectedSize, setSelectedSize] = useState(availableSizes[2]);
    const [isLiked, setIsLiked] = useState(false);
    const [processedimage, setProcessedimage] = useState([]);

    const image = product.image || [];

    useEffect(() => {
        if (image.length > 0) {
            const processed = image.map(img => {
                if (img && img.startsWith('data:image')) {
                    try {
                        const byteCharacters = atob(img.split(',')[1]);
                        const byteNumbers = new Array(byteCharacters.length);
                        for (let i = 0; i < byteCharacters.length; i++) {
                            byteNumbers[i] = byteCharacters.charCodeAt(i);
                        }
                        const byteArray = new Uint8Array(byteNumbers);
                        const blob = new Blob([byteArray], { type: 'image/jpeg' });
                        return URL.createObjectURL(blob);
                    } catch (error) {
                        return img;
                    }
                } else {
                    return img;
                }
            });
            setProcessedimage(processed);
        }
    }, [image]);

    const displayimage = processedimage.length > 0 ? processedimage : image;

    const nextImage = () => {
        if (displayimage.length > 1) {
            setCurrentImageIndex((prev) =>
                prev === displayimage.length - 1 ? 0 : prev + 1
            );
        }
    };

    const prevImage = () => {
        if (displayimage.length > 1) {
            setCurrentImageIndex((prev) =>
                prev === 0 ? displayimage.length - 1 : prev - 1
            );
        }
    };

    // Highlight search terms
    const highlightText = (text, query) => {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark class="bg-amber-400/30 text-amber-300">$1</mark>');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm 
                       overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)]
                       hover:shadow-[0_20px_60px_-10px_rgba(245,158,11,0.2)] transition-all duration-500"
        >
            <div className="relative aspect-[4/3] overflow-hidden cursor-pointer group/image">
                <AnimatePresence mode="wait">
                    {displayimage.length > 0 ? (
                        <motion.img
                            key={currentImageIndex}
                            src={displayimage[currentImageIndex]}
                            alt={product.name}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                            style={{
                                imageRendering: 'high-quality',
                                filter: 'contrast(1.05) saturate(1.1)'
                            }}
                            onClick={() => onImageClick(displayimage, currentImageIndex, product.name)}
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    ) : (
                        <div className="w-full h-full bg-white/10 flex items-center justify-center">
                            <Package className="text-white/40" size={64} />
                        </div>
                    )}
                </AnimatePresence>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                               opacity-0 group-hover/image:opacity-100 transition-opacity duration-300
                               pointer-events-none">
                    <div className="p-3 sm:p-4 rounded-full bg-black/70 backdrop-blur-sm border border-white/20">
                        <Expand className="text-white w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                </div>

                {displayimage.length > 1 && (
                    <>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                prevImage();
                            }}
                            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full 
                                     bg-black/60 text-white opacity-0 group-hover:opacity-100 
                                     hover:bg-black/80 transition-all duration-300 backdrop-blur-sm z-10"
                        >
                            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                nextImage();
                            }}
                            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full 
                                     bg-black/60 text-white opacity-0 group-hover:opacity-100 
                                     hover:bg-black/80 transition-all duration-300 backdrop-blur-sm z-10"
                        >
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    </>
                )}

                {displayimage.length > 1 && (
                    <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
                        {displayimage.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentImageIndex(idx);
                                }}
                                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${idx === currentImageIndex
                                    ? 'bg-amber-400 w-4 sm:w-6'
                                    : 'bg-white/60 hover:bg-white/80 w-1.5 sm:w-2'
                                    }`}
                            />
                        ))}
                    </div>
                )}

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsLiked(!isLiked);
                    }}
                    className="absolute top-3 sm:top-4 right-3 sm:right-4 p-2 sm:p-2.5 rounded-full bg-black/50 backdrop-blur-sm
                             opacity-0 group-hover:opacity-100 transition-all duration-300
                             hover:bg-black/70 z-10"
                >
                    <Heart
                        className={`w-4 h-4 sm:w-[18px] sm:h-[18px] transition-colors ${isLiked ? 'text-red-400 fill-red-400' : 'text-white'
                            }`}
                    />
                </button>

                <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                    <span className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium ${product.stock > 10
                        ? 'bg-green-500/20 text-green-400'
                        : product.stock > 0
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                        {product.stock > 0 ? `${product.stock} left` : 'Out of stock'}
                    </span>
                </div>
            </div>

            <div className="p-4 sm:p-5 space-y-4">
                <div>
                    <h3 className="font-semibold text-white text-lg sm:text-xl leading-tight mb-2"
                        dangerouslySetInnerHTML={{
                            __html: highlightText(product.name, searchQuery)
                        }}
                    />
                    <p className="text-white/60 text-sm line-clamp-2 mb-3"
                        dangerouslySetInnerHTML={{
                            __html: highlightText(product.description, searchQuery)
                        }}
                    />
                    <div className="flex items-center justify-between">
                        <span className="text-xl sm:text-2xl font-bold text-amber-400">
                            ₹{product.price?.toLocaleString()}
                        </span>
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${i < 4 ? 'text-amber-400 fill-amber-400' : 'text-gray-600'
                                        }`}
                                />
                            ))}
                            <span className="text-xs sm:text-sm text-white/60 ml-1">(4.5)</span>
                        </div>
                    </div>
                </div>

                <div>
                    <p className="text-sm text-white/80 mb-2">Color</p>
                    <div className="flex gap-2">
                        {availableColors.slice(0, 4).map((color) => (
                            <button
                                key={color.name}
                                onClick={() => setSelectedColor(color)}
                                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 transition-all ${selectedColor.name === color.name
                                    ? 'border-amber-400 scale-110'
                                    : 'border-white/30 hover:border-white/60'
                                    }`}
                                style={{ backgroundColor: color.value }}
                                title={color.name}
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <p className="text-sm text-white/80 mb-2">Size (US)</p>
                    <div className="flex gap-2 flex-wrap">
                        {availableSizes.slice(0, 4).map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-sm font-medium transition-all ${selectedSize === size
                                    ? 'bg-amber-400 text-gray-900'
                                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex gap-2 sm:gap-3 pt-2">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 px-3 sm:px-4
                                 bg-amber-500 hover:bg-amber-400 text-gray-900 rounded-xl
                                 font-semibold transition-colors text-sm sm:text-base"
                        onClick={() => addToCart(id)}
                    >
                        <ShoppingCart className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                        <span className="hidden sm:inline">Add to Cart</span>
                        <span className="sm:hidden">Add</span>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onImageClick(displayimage, 0, product.name)}
                        className="p-2.5 sm:p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl
                                 transition-colors"
                        title="View image"
                    >
                        <ZoomIn className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

// New List View Component [web:607]
const ProductListItem = ({ product, index, onImageClick, id, searchQuery }) => {
    const { user } = useUserStore()
    const { addToCart: adToCart } = useCartStore()

    const addToCart = (id) => {
        if (user) {
            toast.success("Added to cart")
            adToCart(id)
        } else {
            toast.error("You are not logged in", { id: "login" })
        }
    }

    const [processedimage, setProcessedimage] = useState([]);
    const image = product.image || [];

    useEffect(() => {
        if (image.length > 0) {
            const processed = image.map(img => {
                if (img && img.startsWith('data:image')) {
                    try {
                        const byteCharacters = atob(img.split(',')[1]);
                        const byteNumbers = new Array(byteCharacters.length);
                        for (let i = 0; i < byteCharacters.length; i++) {
                            byteNumbers[i] = byteCharacters.charCodeAt(i);
                        }
                        const byteArray = new Uint8Array(byteNumbers);
                        const blob = new Blob([byteArray], { type: 'image/jpeg' });
                        return URL.createObjectURL(blob);
                    } catch (error) {
                        return img;
                    }
                } else {
                    return img;
                }
            });
            setProcessedimage(processed);
        }
    }, [image]);

    const displayimage = processedimage.length > 0 ? processedimage : image;

    const highlightText = (text, query) => {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark class="bg-amber-400/30 text-amber-300">$1</mark>');
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm overflow-hidden
                       hover:bg-white/10 transition-all duration-300 group"
        >
            <div className="flex flex-col sm:flex-row">
                {/* Image Section */}
                <div className="relative w-full sm:w-48 h-48 sm:h-40 flex-shrink-0 overflow-hidden cursor-pointer"
                    onClick={() => onImageClick(displayimage, 0, product.name)}>
                    {displayimage.length > 0 ? (
                        <img
                            src={displayimage[0]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full bg-white/10 flex items-center justify-center">
                            <Package className="text-white/40" size={32} />
                        </div>
                    )}

                    <div className="absolute top-3 left-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.stock > 10
                                ? 'bg-green-500/20 text-green-400'
                                : product.stock > 0
                                    ? 'bg-amber-500/20 text-amber-400'
                                    : 'bg-red-500/20 text-red-400'
                            }`}>
                            {product.stock > 0 ? `${product.stock} left` : 'Out of stock'}
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                        <h3 className="font-semibold text-white text-xl leading-tight mb-2"
                            dangerouslySetInnerHTML={{
                                __html: highlightText(product.name, searchQuery)
                            }}
                        />
                        <p className="text-white/60 text-sm line-clamp-2 mb-4"
                            dangerouslySetInnerHTML={{
                                __html: highlightText(product.description, searchQuery)
                            }}
                        />

                        <div className="flex items-center justify-between mb-4">
                            <span className="text-2xl font-bold text-amber-400">
                                ₹{product.price?.toLocaleString()}
                            </span>
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < 4 ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`}
                                    />
                                ))}
                                <span className="text-sm text-white/60 ml-1">(4.5)</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 flex items-center justify-center gap-2 py-3 px-4
                                     bg-amber-500 hover:bg-amber-400 text-gray-900 rounded-xl
                                     font-semibold transition-colors"
                            onClick={() => addToCart(id)}
                        >
                            <ShoppingCart size={18} />
                            Add to Cart
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onImageClick(displayimage, 0, product.name)}
                            className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl
                                     transition-colors"
                            title="View images"
                        >
                            <ZoomIn size={18} />
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Keep your existing ImageModal component unchanged
const ImageModal = ({ isOpen, image, currentIndex, productName, onClose, onNavigate }) => {
    if (!isOpen || !image.length) return null;

    const currentImage = image[currentIndex];

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                onClick={onClose}
            >
                <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />

                <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.85, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative w-[90vw] h-[90vh] min-w-[60vw] min-h-[60vh] max-w-[95vw] max-h-[95vh] 
                               flex flex-col bg-gray-900/50 backdrop-blur-xl rounded-3xl 
                               border border-white/20 shadow-2xl overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
                        <div>
                            <h3 className="text-white font-semibold text-lg sm:text-xl">{productName}</h3>
                            <p className="text-white/60 text-sm">{currentIndex + 1} of {image.length}</p>
                        </div>

                        <button
                            onClick={onClose}
                            className="p-2 sm:p-3 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-400 
                                     transition-colors backdrop-blur-sm border border-red-500/30
                                     hover:scale-105 active:scale-95"
                        >
                            <X className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>

                    <div className="relative flex-1 flex items-center justify-center p-4 sm:p-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 0.95, x: 50 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95, x: -50 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="relative w-full h-full flex items-center justify-center"
                            >
                                <img
                                    src={currentImage}
                                    alt={`${productName} - Image ${currentIndex + 1}`}
                                    className="max-w-full max-h-full object-contain rounded-2xl 
                                             shadow-2xl border border-white/20"
                                    style={{
                                        imageRendering: 'high-quality',
                                        filter: 'contrast(1.1) saturate(1.1) brightness(1.05)'
                                    }}
                                />
                            </motion.div>
                        </AnimatePresence>

                        {image.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onNavigate('prev');
                                    }}
                                    className="absolute left-2 sm:left-6 p-2 sm:p-4 rounded-full bg-black/70 hover:bg-black/90 
                                             text-white transition-all backdrop-blur-lg border border-white/20
                                             hover:scale-110 active:scale-95 shadow-xl"
                                >
                                    <ChevronLeft className="w-5 h-5 sm:w-8 sm:h-8" />
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onNavigate('next');
                                    }}
                                    className="absolute right-2 sm:right-6 p-2 sm:p-4 rounded-full bg-black/70 hover:bg-black/90 
                                             text-white transition-all backdrop-blur-lg border border-white/20
                                             hover:scale-110 active:scale-95 shadow-xl"
                                >
                                    <ChevronRight className="w-5 h-5 sm:w-8 sm:h-8" />
                                </button>
                            </>
                        )}

                        <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                            <div className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/50 backdrop-blur-sm 
                                          text-white/80 text-xs border border-white/20">
                                High Quality
                            </div>
                        </div>
                    </div>

                    {image.length > 1 && (
                        <div className="p-3 sm:p-6 border-t border-white/10">
                            <div className="flex justify-center">
                                <div className="flex gap-2 sm:gap-3 overflow-x-auto max-w-full pb-2">
                                    {image.map((image, index) => (
                                        <motion.button
                                            key={index}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onNavigate('set', index);
                                            }}
                                            className={`flex-shrink-0 w-14 h-14 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden 
                                                       border-2 transition-all ${index === currentIndex
                                                    ? 'border-amber-400 ring-2 sm:ring-4 ring-amber-400/30 shadow-lg'
                                                    : 'border-white/30 hover:border-white/60'
                                                }`}
                                        >
                                            <img
                                                src={image}
                                                alt={`Thumbnail ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="p-3 sm:p-4 text-center bg-black/20 backdrop-blur-sm">
                        <p className="text-white/70 text-xs sm:text-sm flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                            <span className="flex items-center gap-1">
                                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded border border-white/30 flex items-center justify-center text-xs">←</span>
                                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded border border-white/30 flex items-center justify-center text-xs">→</span>
                                <span className="hidden sm:inline">Navigate</span>
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 rounded border border-white/30 text-xs">ESC</span>
                                Close
                            </span>
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CategoryPage;
