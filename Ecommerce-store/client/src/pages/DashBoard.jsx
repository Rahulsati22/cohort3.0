import { PlusCircle, ShoppingBasket, ChartBar } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Analytics from '../components/Analytics'
import Products from '../components/Products';
import CreateProduct from '../components/CreateProduct';
import useProductStore from '../stores/useProductStore';

const tabs = [
    { id: "create", label: "Create Product", icon: PlusCircle },
    { id: "products", label: "Products", icon: ShoppingBasket },
    { id: "analytics", label: "Analytics", icon: ChartBar },
];

const DashBoard = () => {
    const [activeTab, setActiveTab] = useState("create");
    const { getAllProducts, products } = useProductStore();

    useEffect(() => {
        getAllProducts();
    }, [])

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Enhanced Background Pattern */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(245,158,11,0.3)_1px,transparent_0)] 
                               bg-[length:40px_40px] opacity-20" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.08),transparent_70%)]" />
            </div>

            <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">

                {/* Header Section with Enhanced Styling */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-8 relative"
                >
                    {/* Glowing accent line */}
                    <div className="absolute -top-4 left-0 w-24 h-1 bg-gradient-to-r from-amber-400 to-transparent 
                                   shadow-[0_0_20px_rgba(245,158,11,0.5)] rounded-full" />

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight relative">
                            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 
                                           bg-clip-text text-transparent relative z-10">
                                Admin Dashboard
                            </span>
                            {/* Text glow effect */}
                            <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 
                                           bg-clip-text text-transparent blur-xl opacity-30 -z-10">
                                Admin Dashboard
                            </span>
                        </h1>

                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl
                                       bg-white/5 border border-white/10 backdrop-blur-sm
                                       hover:bg-white/10 transition duration-300
                                       before:absolute before:inset-0 before:rounded-xl 
                                       before:bg-gradient-to-r before:from-emerald-500/10 before:to-transparent
                                       before:opacity-0 hover:before:opacity-100 before:transition-opacity
                                       relative overflow-hidden">
                            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse 
                                           shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
                            <span className="text-sm text-white/70 font-medium relative z-10">Online</span>
                        </div>
                    </div>

                    <p className="text-white/60 text-lg relative">
                        Manage products, track analytics, and grow your business
                        {/* Subtle underline accent */}
                        <span className="absolute -bottom-2 left-0 w-16 h-px bg-gradient-to-r from-amber-400/50 to-transparent" />
                    </p>
                </motion.div>

                {/* Tabs Section with Enhanced Styling */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-6
                               relative overflow-hidden shadow-[0_20px_80px_-20px_rgba(0,0,0,0.5)]
                               before:absolute before:inset-0 before:rounded-2xl
                               before:bg-gradient-to-br before:from-amber-400/5 before:via-transparent before:to-purple-500/5
                               before:opacity-50"
                >
                    {/* Animated border glow */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/20 via-transparent to-amber-400/20 
                                   opacity-0 hover:opacity-100 transition duration-700 pointer-events-none blur-sm" />

                    {/* Tab Navigation with Enhanced Effects - FIXED FOR MOBILE */}
                    <div className="relative mb-6">
                        <div className="overflow-x-auto">
                            <div className="flex flex-nowrap gap-2 p-2 rounded-xl bg-white/5 border border-white/10
                                           relative min-w-max">
                                {/* Background pattern for tab container */}
                                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_25%,rgba(255,255,255,0.02)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.02)_75%)] 
                                               bg-[length:10px_10px] opacity-30" />

                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    const isActive = activeTab === tab.id;

                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`relative flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium
                                                       transition duration-300 z-10 group overflow-hidden whitespace-nowrap flex-shrink-0 ${isActive
                                                    ? 'text-gray-950'
                                                    : 'text-white/70 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            {/* Active tab background with enhanced glow */}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeTab"
                                                    className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 
                                                              rounded-lg shadow-lg shadow-amber-400/30
                                                              before:absolute before:inset-0 before:rounded-lg
                                                              before:bg-gradient-to-r before:from-white/10 before:to-transparent"
                                                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                                />
                                            )}

                                            {/* Hover shimmer effect */}
                                            {!isActive && (
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent
                                                               translate-x-[-200%] group-hover:translate-x-[200%] 
                                                               transition-transform duration-700 ease-out rounded-lg" />
                                            )}

                                            {/* Icon and Label with enhanced styling */}
                                            <Icon size={18} className={`relative z-10 transition duration-200 ${isActive ? 'drop-shadow-sm' : 'group-hover:scale-110'
                                                }`} />

                                            {/* Always show full label - removed responsive hiding */}
                                            <span className={`relative z-10 transition duration-200 ${isActive ? 'font-semibold' : ''
                                                }`}>
                                                {tab.label}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Tab Content Area with Enhanced Transitions */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="min-h-[400px] flex items-center justify-center relative"
                >
                    {/* Content wrapper with subtle enhancement */}
                    <div className="w-full relative">
                        {/* Subtle content glow */}
                        <div className="absolute inset-0 bg-gradient-to-t from-amber-400/5 via-transparent to-transparent 
                                       rounded-2xl opacity-0 animate-pulse pointer-events-none"
                            style={{ animationDuration: '3s' }} />

                        {activeTab === "create" && <CreateProduct />}
                        {activeTab === "products" && <Products />}
                        {activeTab === "analytics" && <Analytics />}
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default DashBoard;
