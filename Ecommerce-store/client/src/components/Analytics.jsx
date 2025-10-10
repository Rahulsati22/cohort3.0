import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    TrendingUp, 
    Users, 
    Package, 
    DollarSign, 
    ShoppingCart
} from 'lucide-react';
import { useAnalyticsStore } from '../stores/useAnalyticsStore';

const Analytics = () => {
    const { products, sales, revenue, users, loadingAnalytics, fetchAnalytics } = useAnalyticsStore();

    useEffect(() => {
        fetchAnalytics?.();
    }, []);

    if (loadingAnalytics) {
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

    const statsCards = [
        {
            title: 'Total Revenue',
            value: `₹${revenue?.toLocaleString() || '0'}`,
            icon: DollarSign,
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-500/20',
            data: [40, 65, 45, 80, 60, 90, 75] // Sample chart data
        },
        {
            title: 'Total Sales',
            value: sales?.toLocaleString() || '0',
            icon: ShoppingCart,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-500/20',
            data: [30, 45, 35, 70, 55, 80, 65]
        },
        {
            title: 'Products',
            value: products?.toLocaleString() || '0',
            icon: Package,
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-500/20',
            data: [20, 25, 30, 35, 40, 45, 50]
        },
        {
            title: 'Users',
            value: users?.toLocaleString() || '0',
            icon: Users,
            color: 'from-amber-500 to-amber-600',
            bgColor: 'bg-amber-500/20',
            data: [10, 30, 20, 60, 45, 75, 55]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-950">
            <div className="mx-auto max-w-7xl px-4 py-8">
                
                {/* Simple Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 text-center"
                >
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Analytics Dashboard
                    </h1>
                    <p className="text-white/60">Business overview at a glance</p>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statsCards.map((card, index) => (
                        <StatsCard 
                            key={card.title}
                            {...card}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

// Simple Stats Card with Mini Chart
const StatsCard = ({ title, value, icon: Icon, color, bgColor, data, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm p-6
                   hover:bg-white/10 transition-all duration-300"
    >
        {/* Top Section - Icon & Value */}
        <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${bgColor}`}>
                <Icon className="text-white" size={24} />
            </div>
            <TrendingUp className="text-green-400" size={16} />
        </div>
        
        {/* Value */}
        <div className="mb-4">
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-white/60 text-sm">{title}</p>
        </div>

        {/* Mini Chart */}
        <div className="h-16 flex items-end justify-between gap-1">
            {data.map((height, idx) => (
                <motion.div
                    key={idx}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.8, delay: (index * 0.1) + (idx * 0.05) }}
                    className={`flex-1 bg-gradient-to-t ${color} rounded-t-sm opacity-70`}
                />
            ))}
        </div>
    </motion.div>
);

export default Analytics;
