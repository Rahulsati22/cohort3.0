import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    User, Mail, Lock, Eye, EyeOff, Loader2, ArrowRight
} from 'lucide-react';
import { useUserStore } from '../stores/useUserStore';
const SignUpPage = () => {
    const [showPwd, setShowPwd] = useState(false);
    const [showConfirmPwd, setShowConfirmPwd] = useState(false);
     
    const {signup, user, loading, checkingAuth} = useUserStore()


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(formData);
    };

    return (
        <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="w-full max-w-md"
            >
                <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_20px_80px_-20px_rgba(0,0,0,0.6)] p-6 sm:p-8">
                    <div className="mb-6 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-2xl sm:text-3xl font-semibold tracking-tight"
                        >
                            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 bg-clip-text text-transparent">
                                Create your account
                            </span>
                        </motion.h1>
                        <p className="mt-2 text-white/70">Start your journey with a polished, modern experience.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                        {/* Full name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                                Full name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={18} />
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={onChange}
                                    placeholder="John Carter"
                                    className="w-full rounded-xl bg-white/5 text-white placeholder-white/40
                             border border-white/10 focus:outline-none
                             focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500/40
                             pl-10 pr-3 py-2.5"
                                />
                            </div>

                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={18} />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={onChange}
                                    placeholder="name@example.com"
                                    className="w-full rounded-xl bg-white/5 text-white placeholder-white/40
                             border border-white/10 focus:outline-none
                             focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500/40
                             pl-10 pr-3 py-2.5"
                                />
                            </div>

                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={18} />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPwd ? "text" : "password"}
                                    value={formData.password}
                                    onChange={onChange}
                                    placeholder="••••••••"
                                    className="w-full rounded-xl bg-white/5 text-white placeholder-white/40
                             border border-white/10 focus:outline-none
                             focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500/40
                             pl-10 pr-11 py-2.5"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPwd((s) => !s)}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-md
                             text-white/70 hover:text-white hover:bg-white/10
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40"
                                    aria-label={showPwd ? "Hide password" : "Show password"}
                                >
                                    {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80 mb-2">
                                Confirm password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={18} />
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPwd ? "text" : "password"}
                                    value={formData.confirmPassword}
                                    onChange={onChange}
                                    placeholder="••••••••"
                                    className="w-full rounded-xl bg-white/5 text-white placeholder-white/40
                             border border-white/10 focus:outline-none
                             focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500/40
                             pl-10 pr-11 py-2.5"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPwd((s) => !s)}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-md
                             text-white/70 hover:text-white hover:bg-white/10
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40"
                                    aria-label={showConfirmPwd ? "Hide confirm password" : "Show confirm password"}
                                >
                                    {showConfirmPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                             
                        </div>

                        {/* Submit */}
                        <motion.button
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5
                         bg-amber-500 text-gray-950 hover:bg-amber-400 disabled:opacity-70
                         ring-1 ring-inset ring-white/10 hover:ring-amber-400/30
                         shadow-lg shadow-amber-500/20 font-medium transition"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={18} />
                                    <span>Creating account...</span>
                                </>
                            ) : (
                                <>
                                    <span>Sign up</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </motion.button>
                    </form>

                    <p className="mt-6 text-center text-sm text-white/70">
                        Already have an account?{" "}
                        <Link to="/login" className="text-amber-300 hover:text-amber-200 underline underline-offset-4">
                            Login here
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default SignUpPage;
