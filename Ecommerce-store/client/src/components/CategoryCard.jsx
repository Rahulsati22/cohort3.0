import React from 'react'
import { motion } from "framer-motion";


const item = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.4, ease: "easeOut" }
    }
};

function CategoryCard({ name, image }) {
    return (
        <motion.div
            variants={item}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.8 }}
            className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10
                 aspect-square cursor-pointer"
        >
            {/* Fallback gradient backdrop */}
            <div className="absolute inset-0 bg-[radial-gradient(400px_200px_at_50%_30%,rgba(245,158,11,0.12),rgba(245,158,11,0)_70%)]" />

            {/* Image */}
            <img
                src={image}
                alt={name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out
                   group-hover:scale-110"
                onError={(e) => {
                    e.target.style.display = 'none';
                }}
            />

            {/* Dark vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Hover shine effect */}
            <div className="absolute -left-1/4 top-0 h-full w-1/3 opacity-0 group-hover:opacity-30 
                      transition duration-1000 ease-out rotate-12
                      bg-gradient-to-r from-transparent via-amber-200/40 to-transparent blur-xl
                      group-hover:left-full group-hover:-translate-x-1/4" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-4">
                <div className="transform transition duration-300 group-hover:-translate-y-1">
                    <h3 className="text-white font-semibold text-lg mb-2 drop-shadow-lg">
                        {name}
                    </h3>

                    <div className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5
                          bg-gray-950/60 backdrop-blur-md border border-white/20
                          text-sm text-white/90 shadow-lg">
                        <span>Explore</span>
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-400 
                           shadow-[0_0_8px_rgba(245,158,11,0.8)] animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Hover glow ring */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 
                      group-hover:ring-amber-400/40 transition duration-300" />

            {/* Ambient shadow on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500
                      shadow-[0_0_50px_-5px_rgba(245,158,11,0.3)]" />
        </motion.div>
    );
}
export default CategoryCard
