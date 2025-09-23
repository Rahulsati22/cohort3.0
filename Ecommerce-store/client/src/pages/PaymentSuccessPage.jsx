import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        // Countdown timer
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate('/'); // Redirect to home
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                {/* Success Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 
                             rounded-full mb-6 border-4 border-green-400"
                >
                    <CheckCircle className="w-10 h-10 text-green-400" />
                </motion.div>

                {/* Success Message */}
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-3xl font-bold text-white mb-2"
                >
                    Payment Successful! ✅
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="text-xl text-amber-400 mb-8"
                >
                    Thanks for choosing Sneakerzy! 🔥
                </motion.p>

                {/* Countdown */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="text-white/60"
                >
                    <p>Redirecting to home page in...</p>
                    <div className="text-4xl font-bold text-amber-400 mt-2">
                        {countdown}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default PaymentSuccess;
