import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Home,
    ShoppingCart,
    Lock,
    LogIn,
    LogOut,
    UserPlus,
    Zap,
    Menu,
    X,
    Package
} from 'lucide-react';
import { useUserStore } from '../stores/useUserStore';
import { useCartStore } from '../stores/useCartStore';

const Navbar = () => {
    const { user, logout } = useUserStore();
    const isAdmin = user?.role === 'Admin';
    const { cart, getCartItems, calculateTotal } = useCartStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Close menu when route changes or screen size changes
    useEffect(() => {
        const closeMenu = () => setIsMenuOpen(false);
        window.addEventListener('resize', closeMenu);
        return () => window.removeEventListener('resize', closeMenu);
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    // Close menu when clicking on a link
    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <header className="sticky top-0 z-[9998] bg-gray-950/60 backdrop-blur-md border-b border-white/10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="h-16 flex items-center justify-between">

                        {/* Brand */}
                        <Link
                            to="/"
                            onClick={handleLinkClick}
                            className="inline-flex items-center gap-2 rounded-lg px-2 py-1
                               text-white hover:text-amber-300 transition relative z-[9999]"
                        >
                            <Zap size={18} className="text-amber-400" />
                            <span className="font-semibold tracking-wide bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 bg-clip-text text-transparent">
                                Sneakerzy
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
                            {/* Home */}
                            <Link
                                to="/"
                                className="group inline-flex items-center gap-2 rounded-lg px-3 py-2
                                 text-white/80 hover:text-white hover:bg-white/5
                                 ring-1 ring-transparent hover:ring-white/10
                                 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40 transition"
                            >
                                <Home size={18} className="opacity-90 group-hover:opacity-100" />
                                <span>Home</span>
                            </Link>

                            {/* Cart (only if user) */}
                            {user && (
                                <Link
                                    to="/cart"
                                    className="relative group inline-flex items-center gap-2 rounded-lg px-3 py-2
                                   text-white/80 hover:text-white hover:bg-white/5
                                   ring-1 ring-transparent hover:ring-white/10
                                   focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40 transition"
                                >
                                    <ShoppingCart size={18} className="opacity-90 group-hover:opacity-100" />
                                    <span>Cart</span>

                                    {cart.length > 0 && (
                                        <span
                                            className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1
                                       grid place-items-center rounded-full
                                       bg-amber-500 text-gray-950 text-xs font-bold z-10"
                                            aria-label={`${cart.length} items in cart`}
                                        >
                                            {cart.length}
                                        </span>
                                    )}
                                </Link>
                            )}

                            {/* My Orders */}
                            {user && (
                                <Link
                                    to="/myorders"
                                    className="group inline-flex items-center gap-2 rounded-lg px-3 py-2
                                   text-white/80 hover:text-white hover:bg-white/5
                                   ring-1 ring-transparent hover:ring-white/10
                                   focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40 transition"
                                >
                                    <Package size={18} className="opacity-90 group-hover:opacity-100" />
                                    <span>My Orders</span>
                                </Link>
                            )}

                            {/* Admin Dashboard */}
                            {isAdmin && (
                                <Link
                                    to="/dashboard"
                                    className="group inline-flex items-center gap-2 rounded-lg px-3 py-2
                                   text-white/80 hover:text-white hover:bg-white/5
                                   ring-1 ring-transparent hover:ring-white/10
                                   focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40 transition"
                                >
                                    <Lock size={18} className="opacity-90 group-hover:opacity-100" />
                                    <span>Dashboard</span>
                                </Link>
                            )}

                            {/* Auth Buttons */}
                            {user ? (
                                <button
                                    type="button"
                                    onClick={logout}
                                    className="inline-flex items-center gap-2 ml-4 rounded-lg px-3 py-2
                                   bg-amber-500 text-gray-950 hover:bg-amber-400
                                   ring-1 ring-inset ring-white/10 hover:ring-amber-400/30
                                   shadow-lg shadow-amber-500/20
                                   focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40
                                   font-medium transition"
                                >
                                    <LogOut size={18} />
                                    <span>Logout</span>
                                </button>
                            ) : (
                                <>
                                    <Link
                                        to="/signup"
                                        className="group inline-flex items-center gap-2 rounded-lg px-3 py-2
                                         text-white/80 hover:text-white hover:bg-white/5
                                         ring-1 ring-transparent hover:ring-white/10
                                         focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40 transition"
                                    >
                                        <UserPlus size={18} className="opacity-90 group-hover:opacity-100" />
                                        <span>Signup</span>
                                    </Link>

                                    <Link
                                        to="/login"
                                        className="group inline-flex items-center gap-2 rounded-lg px-3 py-2
                                         text-white/80 hover:text-white hover:bg-white/5
                                         ring-1 ring-transparent hover:ring-white/10
                                         focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40 transition"
                                    >
                                        <LogIn size={18} className="opacity-90 group-hover:opacity-100" />
                                        <span>Login</span>
                                    </Link>
                                </>
                            )}
                        </nav>

                        {/* Mobile Hamburger Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 rounded-lg text-white hover:bg-white/5 transition-colors 
                                     focus:outline-none focus:ring-2 focus:ring-amber-400/40 relative z-[9999]"
                            aria-label="Toggle mobile menu"
                        >
                            <motion.div
                                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </motion.div>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Portal - Outside header */}
            <AnimatePresence>
                {isMenuOpen && (
                    <div className="md:hidden">
                        {/* Background Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
                            style={{ zIndex: 99998 }}
                            onClick={() => setIsMenuOpen(false)}
                        />

                        {/* Mobile Menu */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] 
                                     bg-gray-900 shadow-2xl overflow-y-auto"
                            style={{ zIndex: 99999 }}
                        >
                            {/* Close Button Header */}
                            <div className="flex items-center justify-between p-4 border-b border-white/10">
                                <div className="flex items-center gap-2">
                                    <Zap size={18} className="text-amber-400" />
                                    <span className="font-semibold text-white">Sneakerzy</span>
                                </div>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                                    aria-label="Close menu"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <nav className="flex flex-col p-4 space-y-2">
                                
                                {/* User Info (if logged in) */}
                                {user && (
                                    <div className="mb-4 pb-4 border-b border-white/10">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                                                <span className="text-amber-400 font-semibold">
                                                    {user.name?.charAt(0).toUpperCase() || 'U'}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">{user.name}</p>
                                                <p className="text-white/60 text-sm">{user.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Navigation Links */}
                                <Link
                                    to="/"
                                    onClick={handleLinkClick}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors"
                                >
                                    <Home size={20} />
                                    <span>Home</span>
                                </Link>

                                {user && (
                                    <Link
                                        to="/cart"
                                        onClick={handleLinkClick}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors relative"
                                    >
                                        <ShoppingCart size={20} />
                                        <span>Cart</span>
                                        {cart.length > 0 && (
                                            <span className="ml-auto bg-amber-500 text-gray-950 text-xs font-bold px-2 py-1 rounded-full">
                                                {cart.length}
                                            </span>
                                        )}
                                    </Link>
                                )}

                                {user && (
                                    <Link
                                        to="/myorders"
                                        onClick={handleLinkClick}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors"
                                    >
                                        <Package size={20} />
                                        <span>My Orders</span>
                                    </Link>
                                )}

                                {isAdmin && (
                                    <Link
                                        to="/dashboard"
                                        onClick={handleLinkClick}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors"
                                    >
                                        <Lock size={20} />
                                        <span>Admin Dashboard</span>
                                    </Link>
                                )}

                                {/* Divider */}
                                <div className="my-4 border-t border-white/10" />

                                {/* Auth Section */}
                                {user ? (
                                    <button
                                        onClick={() => {
                                            logout();
                                            handleLinkClick();
                                        }}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors w-full text-left"
                                    >
                                        <LogOut size={20} />
                                        <span>Logout</span>
                                    </button>
                                ) : (
                                    <>
                                        <Link
                                            to="/signup"
                                            onClick={handleLinkClick}
                                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors"
                                        >
                                            <UserPlus size={20} />
                                            <span>Sign Up</span>
                                        </Link>

                                        <Link
                                            to="/login"
                                            onClick={handleLinkClick}
                                            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-amber-500 text-gray-900 hover:bg-amber-400 transition-colors font-medium"
                                        >
                                            <LogIn size={20} />
                                            <span>Login</span>
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
