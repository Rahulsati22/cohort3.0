import React from "react";
import { motion } from "framer-motion";
import CategoryCard from "../components/CategoryCard";
import { Link, useNavigate } from "react-router-dom";

// If routing per-category is needed later, import Link from 'react-router-dom' and wrap each card.

const categories = [
  {
    id: 1,
    name: "Sneakers",
    image: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c25lYWtlcnN8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 2,
    name: "Running Shoes",
    image: "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8UnVubmluZyUyMHNob2VzfGVufDB8fDB8fHww"
  },
  {
    id: 3,
    name: "Boots",
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9vdHN8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 4,
    name: "Sandals",
    image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 5,
    name: "Formal Shoes",
    image: "https://images.unsplash.com/photo-1668069226492-508742b03147?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9ybWFsJTIwc2hvZXN8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 6,
    name: "Loafers",
    image: "https://images.unsplash.com/photo-1662541089338-c7d53b88be70?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bG9hZmVyc3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 7,
    name: "Heels",
    image: "https://plus.unsplash.com/premium_photo-1676234844384-82e1830af724?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGVlbHN8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 8,
    name: "Slippers",
    image: "https://images.unsplash.com/photo-1622920799137-86c891159e44?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2xpcHBlcnN8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 9,
    name: "Sports Shoes",
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3BvcnRzJTIwc2hvZXN8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 10,
    name: "Casual Shoes",
    image: "https://plus.unsplash.com/premium_photo-1665664652418-91f260a84842?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FzdWFsJTIwc2hvZXN8ZW58MHx8MHx8fDA%3D"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};




const HomePage = () => {
 
 
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 
                           bg-clip-text text-transparent">
              Step into Style
            </span>
          </h1>
          <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto">
            Discover premium footwear that combines comfort, quality, and cutting-edge design
          </p>
        </motion.div>

        {/* Categories Section */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-between mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 
                             bg-clip-text text-transparent">
                Shop by Category
              </span>
            </h2>
            <p className="text-white/60 text-sm hidden sm:block">
              Explore the latest styles and classics
            </p>
          </motion.div>

          {/* Responsive Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                       gap-4 sm:gap-5 lg:gap-6"
          >
            {categories.map((category) => (
              <Link key={category.id} to={`/category/${category.name}`}>
                <CategoryCard
                  key={category.id}
                  name={category.name}
                  image={category.image}
                />
              </Link>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
