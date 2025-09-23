import React from "react";
import { motion } from "framer-motion";

export default function DotsPulse({ size = 15, gap = 10, className = "" }) {
    const dot = {
        initial: { scale: 0.6, opacity: 0.5 },
        animate: { scale: 1, opacity: 1 }
    };
    const transition = { repeat: Infinity, repeatType: "mirror", duration: 0.6, ease: "easeInOut" };

    return (
        <section className="min-h-[60vh] grid place-items-center">
            <div className={`inline-flex items-center ${className}`} role="status" aria-label="Loading">
                {[0, 1, 2].map((i) => (
                    <motion.span
                        key={i}
                        className="rounded-full bg-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                        style={{ width: size, height: size, marginRight: i < 2 ? gap : 0 }}
                        variants={dot}
                        initial="initial"
                        animate="animate"
                        transition={{ ...transition, delay: i * 0.12 }}
                    />
                ))}
            </div>
        </section>
    );
}
