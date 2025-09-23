import React from 'react';
import { Link } from 'react-router-dom';
import {
    Home,
    ShoppingCart,
    Lock,
    LogIn,
    LogOut,
    UserPlus,
    Zap
} from 'lucide-react';
import { useUserStore } from '../stores/useUserStore';
import { useCartStore } from '../stores/useCartStore';
import { useState, useEffect } from 'react';



const Navbar = () => {
    const { user, logout } = useUserStore()
    const isAdmin = user?.role === 'Admin'
    const { cart, getCartItems, calculateTotal } = useCartStore()
    return (
        <header className="sticky top-0 z-50 bg-gray-950/60 backdrop-blur-md border-b border-white/10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="h-16 flex items-center justify-between">

                    {/* Brand */}
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 rounded-lg px-2 py-1
                       text-white hover:text-amber-300 transition"
                    >
                        <Zap size={18} className="text-amber-400" />
                        <span className="font-semibold tracking-wide bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 bg-clip-text text-transparent">
                            Sneakerzy
                        </span>
                    </Link>

                    {/* Nav */}
                    <nav className="flex items-center gap-1 sm:gap-2">
                        {/* Home */}
                        <Link
                            to="/"
                            className="group inline-flex items-center gap-2 rounded-lg px-3 py-2
                         text-white/80 hover:text-white hover:bg-white/5
                         ring-1 ring-transparent hover:ring-white/10
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40 transition"
                        >
                            <Home size={18} className="opacity-90 group-hover:opacity-100" />
                            <span className="hidden sm:inline">Home</span>
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
                                <span className="hidden sm:inline">Cart</span>

                                {cart.length > 0 && (
                                    <span
                                        className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1
                               grid place-items-center rounded-full
                               bg-amber-500 text-gray-950 text-xs font-bold"
                                        aria-label={`${cart.length} items in cart`}
                                    >
                                        {cart.length}
                                    </span>
                                )}
                            </Link>
                        )}

                        {/* Admin */}
                        {isAdmin && (
                            <Link
                                to="/dashboard"
                                className="group inline-flex items-center gap-2 rounded-lg px-3 py-2
                           text-white/80 hover:text-white hover:bg-white/5
                           ring-1 ring-transparent hover:ring-white/10
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40 transition"
                            >
                                <Lock size={18} className="opacity-90 group-hover:opacity-100" />
                                <span className="hidden sm:inline">Dashboard</span>
                            </Link>
                        )}

                        {/* Auth */}
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
                                    <span className="hidden sm:inline">Signup</span>
                                </Link>

                                <Link
                                    to="/login"
                                    className="group inline-flex items-center gap-2 rounded-lg px-3 py-2
                             text-white/80 hover:text-white hover:bg-white/5
                             ring-1 ring-transparent hover:ring-white/10
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40 transition"
                                >
                                    <LogIn size={18} className="opacity-90 group-hover:opacity-100" />
                                    <span className="hidden sm:inline">Login</span>
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
