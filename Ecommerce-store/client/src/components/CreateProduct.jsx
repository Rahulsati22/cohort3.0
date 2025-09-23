import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Package, DollarSign, FileText, Grid3x3, Hash, Image, Save, X, Plus, Eye } from 'lucide-react';
import { instance } from '../lib/axios';
import useProductStore from '../stores/useProductStore';
import { create } from 'zustand';
const CreateProduct = () => {
    const { createProducts } = useProductStore()
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
        images: [], // Array of base64 strings
        stock: ""
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previews, setPreviews] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    const categories = [
        "Sneakers", "Running Shoes", "Boots", "Sandals",
        "Formal Shoes", "Loafers", "Heels", "Slippers",
        "Sports Shoes", "Casual Shoes"
    ];

    // API call function with base64 images
    function onChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    }

    // Fixed file handling with proper base64 conversion
    function handleFileChange(e) {
        const newFiles = Array.from(e.target.files || []);
        addFilesToState(newFiles);
        // Clear input to allow same files again
        e.target.value = '';
    }

    // Convert files to base64 and add to state
    async function addFilesToState(newFiles) {
        if (!newFiles.length) return;

        // Validate files
        const validFiles = newFiles.filter(file => {
            if (!file.type.startsWith('image/')) {
                alert(`${file.name} is not an image file`);
                return false;
            }
            if (file.size > 10 * 1024 * 1024) {
                alert(`${file.name} is too large. Max size is 10MB`);
                return false;
            }
            return true;
        });

        if (!validFiles.length) return;

        // Check total image limit
        if (formData.images.length + validFiles.length > 10) {
            alert(`Cannot add ${validFiles.length} more images. Maximum 10 images allowed.`);
            return;
        }

        try {
            // Convert all files to base64 simultaneously
            const base64Promises = validFiles.map(file => convertFileToBase64(file));
            const base64Results = await Promise.all(base64Promises);

            // Update formData with new base64 strings
            setFormData(prev => ({
                ...prev,
                images: [...prev.images, ...base64Results]
            }));

            // Create preview objects for UI
            const newPreviews = validFiles.map((file, index) => ({
                file,
                url: URL.createObjectURL(file),
                name: file.name,
                size: (file.size / 1024 / 1024).toFixed(2),
                base64: base64Results[index]
            }));

            setPreviews(prev => [...prev, ...newPreviews]);

            if (errors.images) {
                setErrors(prev => ({ ...prev, images: undefined }));
            }

        } catch (error) {
            console.error('Error converting files to base64:', error);
            alert('Error processing images. Please try again.');
        }
    }

    // Helper function to convert file to base64
    function convertFileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                // reader.result includes data:image/jpeg;base64, prefix
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }




    // Drag and drop handlers
    function handleDragOver(e) {
        e.preventDefault();
        setIsDragging(true);
    }

    function handleDragLeave(e) {
        e.preventDefault();
        setIsDragging(false);
    }

    function handleDrop(e) {
        e.preventDefault();
        setIsDragging(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        addFilesToState(droppedFiles);
    }

    function removeImage(index) {
        const newImages = formData.images.filter((_, i) => i !== index);
        const newPreviews = previews.filter((_, i) => i !== index);

        // Revoke URL to prevent memory leaks
        if (previews[index]) {
            URL.revokeObjectURL(previews[index].url);
        }

        setFormData(prev => ({ ...prev, images: newImages }));
        setPreviews(newPreviews);
    }

    function validateForm() {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Product name is required";
        if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = "Valid price is required";
        if (!formData.description.trim()) newErrors.description = "Description is required";
        if (!formData.category) newErrors.category = "Category is required";
        if (!formData.stock || parseInt(formData.stock) < 0) newErrors.stock = "Valid stock quantity is required";
        if (formData.images.length === 0) newErrors.images = "At least one image is required";
        if (formData.images.length > 10) newErrors.images = "Maximum 10 images allowed";

        return newErrors;
    }

    async function handleSubmit(e) {
        setIsSubmitting(true)
        e.preventDefault();
        const { data } = await createProducts({ name: formData.name, price: formData.price, description: formData.description, category: formData.category, stock: formData.stock, images: formData.images })
        setFormData({ name: '', price: '', description: '', category: '', stock: '', images: [] });
        setPreviews([]);
        setIsSubmitting(false)
    }

    // Calculate total size for display
    const totalSize = previews.reduce((sum, preview) => sum + parseFloat(preview.size), 0).toFixed(2);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-6 sm:p-8
                       shadow-[0_20px_80px_-20px_rgba(0,0,0,0.5)] mt-6"
        >
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-amber-400/10">
                        <Package className="text-amber-400" size={24} />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                        <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 
                                       bg-clip-text text-transparent">
                            Create New Product
                        </span>
                    </h1>
                </div>
                <p className="text-white/60">Add a new product with multiple images (converted to base64)</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Product Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                            Product Name
                        </label>
                        <div className="relative">
                            <Package className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={18} />
                            <input
                                onChange={onChange}
                                value={formData.name}
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Nike Air Max 270"
                                className="w-full rounded-xl bg-white/5 text-white placeholder-white/40
                                         border border-white/10 focus:outline-none
                                         focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500/40
                                         pl-10 pr-3 py-3"
                            />
                        </div>
                        {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                    </div>

                    {/* Price */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-white/80 mb-2">
                            Price (₹)
                        </label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={18} />
                            <input
                                onChange={onChange}
                                value={formData.price}
                                type="number"
                                name="price"
                                id="price"
                                min="0"
                                step="0.01"
                                placeholder="2999.00"
                                className="w-full rounded-xl bg-white/5 text-white placeholder-white/40
                                         border border-white/10 focus:outline-none
                                         focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500/40
                                         pl-10 pr-3 py-3"
                            />
                        </div>
                        {errors.price && <p className="mt-1 text-sm text-red-400">{errors.price}</p>}
                    </div>

                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-white/80 mb-2">
                            Category
                        </label>
                        <div className="relative">
                            <Grid3x3 className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={18} />
                            <select
                                onChange={onChange}
                                value={formData.category}
                                name="category"
                                id="category"
                                className="w-full rounded-xl bg-white/5 text-white
                                         border border-white/10 focus:outline-none
                                         focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500/40
                                         pl-10 pr-3 py-3 appearance-none"
                            >
                                <option value="" className="bg-gray-900">Select a category</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat} className="bg-gray-900">{cat}</option>
                                ))}
                            </select>
                        </div>
                        {errors.category && <p className="mt-1 text-sm text-red-400">{errors.category}</p>}
                    </div>

                    {/* Stock */}
                    <div>
                        <label htmlFor="stock" className="block text-sm font-medium text-white/80 mb-2">
                            Stock Quantity
                        </label>
                        <div className="relative">
                            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={18} />
                            <input
                                onChange={onChange}
                                value={formData.stock}
                                type="number"
                                name="stock"
                                id="stock"
                                min="0"
                                placeholder="50"
                                className="w-full rounded-xl bg-white/5 text-white placeholder-white/40
                                         border border-white/10 focus:outline-none
                                         focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500/40
                                         pl-10 pr-3 py-3"
                            />
                        </div>
                        {errors.stock && <p className="mt-1 text-sm text-red-400">{errors.stock}</p>}
                    </div>
                </div>

                {/* Description - Full Width */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-white/80 mb-2">
                        Description
                    </label>
                    <div className="relative">
                        <FileText className="absolute left-3 top-3 text-white/60" size={18} />
                        <textarea
                            onChange={onChange}
                            value={formData.description}
                            name="description"
                            id="description"
                            rows={4}
                            placeholder="Describe the product features, comfort, and style..."
                            className="w-full rounded-xl bg-white/5 text-white placeholder-white/40
                                     border border-white/10 focus:outline-none
                                     focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500/40
                                     pl-10 pr-3 py-3 resize-none"
                        />
                    </div>
                    {errors.description && <p className="mt-1 text-sm text-red-400">{errors.description}</p>}
                </div>

                {/* Enhanced Multiple Image Upload with Base64 */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-white/80">
                            Product Images ({formData.images.length}/10)
                        </label>
                        {formData.images.length > 0 && (
                            <span className="text-xs text-amber-400">
                                Total: {totalSize} MB (Base64)
                            </span>
                        )}
                    </div>

                    <div className="space-y-4">
                        {/* Enhanced Upload Area with Drag & Drop */}
                        <div className="relative">
                            <input
                                type="file"
                                name="images"
                                id="images"
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div
                                className={`border-2 border-dashed rounded-xl p-8 transition duration-300 cursor-pointer group
                                           ${isDragging
                                        ? 'border-amber-400 bg-amber-400/10'
                                        : 'border-white/20 hover:border-amber-400/40 hover:bg-white/5'
                                    }`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <div className="text-center">
                                    <div className="flex justify-center mb-4">
                                        {formData.images.length > 0 ? (
                                            <Plus className={`h-10 w-10 transition duration-300 ${isDragging ? 'text-amber-400' : 'text-white/40 group-hover:text-amber-400'
                                                }`} />
                                        ) : (
                                            <Upload className={`h-12 w-12 transition duration-300 ${isDragging ? 'text-amber-400' : 'text-white/40 group-hover:text-amber-400'
                                                }`} />
                                        )}
                                    </div>
                                    <p className="text-white/60 mb-1">
                                        {formData.images.length > 0
                                            ? "Add more images (converted to base64)"
                                            : "Click to upload images or drag and drop"
                                        }
                                    </p>
                                    <p className="text-white/40 text-sm">
                                        PNG, JPG, GIF up to 10MB each • Max 10 images
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Image Previews with Animation */}
                        <AnimatePresence>
                            {previews.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                                >
                                    {previews.map((preview, index) => (
                                        <motion.div
                                            key={`${preview.name}-${index}`}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            className="relative group"
                                        >
                                            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5">
                                                <img
                                                    src={preview.url}
                                                    alt={preview.name}
                                                    className="w-full h-24 object-cover transition duration-300 group-hover:scale-105"
                                                />

                                                {/* Image overlay with info */}
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 
                                                               transition duration-300 flex items-center justify-center">
                                                    <div className="text-center text-white">
                                                        <Eye size={16} className="mx-auto mb-1" />
                                                        <p className="text-xs">{preview.size} MB</p>
                                                        <p className="text-xs opacity-70">Base64</p>
                                                    </div>
                                                </div>

                                                {/* Remove button */}
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white 
                                                             rounded-full opacity-0 group-hover:opacity-100 transition
                                                             hover:bg-red-600 z-10 shadow-lg"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>

                                            {/* Image name */}
                                            <p className="mt-1 text-xs text-white/60 truncate">{preview.name}</p>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    {errors.images && <p className="mt-1 text-sm text-red-400">{errors.images}</p>}
                </div>

                {/* Submit Button */}
                <motion.button
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 
                             rounded-xl px-6 py-3 bg-amber-500 text-gray-950 
                             hover:bg-amber-400 disabled:opacity-70 disabled:cursor-not-allowed
                             font-medium shadow-lg shadow-amber-500/20 transition"
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-4 h-4 border-2 border-gray-950/30 border-t-gray-950 rounded-full animate-spin" />
                            <span>Creating Product...</span>
                        </>
                    ) : (
                        <>
                            <Save size={18} />
                            <span>Save Product ({formData.images.length} images)</span>
                        </>
                    )}
                </motion.button>
            </form>
        </motion.div>
    );
};

export default CreateProduct;
