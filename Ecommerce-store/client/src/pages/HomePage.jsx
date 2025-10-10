import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CategoryCard from "../components/CategoryCard";
import { Link, useNavigate } from "react-router-dom";
import { Search, X, TrendingUp, Clock, Filter } from 'lucide-react';

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

// Popular searches for suggestions [web:591]
const popularSearches = [
  "Nike Air Max", "Adidas Ultraboost", "Converse", "Vans", "Puma", "Jordan", "Reebok", "New Balance"
];

const trendingSearches = [
  "Running Shoes", "Basketball Shoes", "Casual Sneakers", "Formal Shoes", "Boots"
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
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [recentSearches, setRecentSearches] = useState([]);

  // Load recent searches from localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Filter categories based on search query [web:587]
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  }, [searchQuery]);

  // Handle search functionality [web:584]
  const handleSearch = (query = searchQuery) => {
    if (query.trim()) {
      // Save to recent searches
      const updatedRecentSearches = [query, ...recentSearches.filter(search => search !== query)].slice(0, 5);
      setRecentSearches(updatedRecentSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedRecentSearches));
      
      // Navigate to search results or category
      const matchedCategory = categories.find(cat => 
        cat.name.toLowerCase().includes(query.toLowerCase())
      );
      
      if (matchedCategory) {
        navigate(`/category/${matchedCategory.name}`);
      } else {
        // Navigate to general search results page (you can create this later)
        navigate(`/search?q=${encodeURIComponent(query)}`);
      }
      
      setSearchQuery('');
      setShowSearchSuggestions(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredCategories(categories);
    setShowSearchSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

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
          <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
            Discover premium footwear that combines comfort, quality, and cutting-edge design
          </p>

          {/* MODERN SEARCH BAR [web:585] */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative max-w-2xl mx-auto"
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-white/60" />
              </div>
              
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchSuggestions(true);
                }}
                onFocus={() => setShowSearchSuggestions(true)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="block w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 
                         rounded-2xl text-white placeholder-white/50 backdrop-blur-sm
                         focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400
                         transition-all duration-300 text-lg"
                placeholder="Search for shoes, brands, or styles..."
              />
              
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  <X className="h-5 w-5 text-white/60 hover:text-white transition-colors" />
                </button>
              )}
            </div>

            {/* SEARCH SUGGESTIONS DROPDOWN [web:589] */}
            {showSearchSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full mt-2 w-full bg-gray-900/95 backdrop-blur-xl 
                         rounded-2xl border border-white/10 shadow-2xl z-50 overflow-hidden"
                onMouseLeave={() => setShowSearchSuggestions(false)}
              >
                {/* Quick Category Matches */}
                {searchQuery && filteredCategories.length > 0 && (
                  <div className="p-4">
                    <h4 className="text-white/80 text-sm font-medium mb-2 flex items-center gap-2">
                      <Filter size={16} />
                      Categories
                    </h4>
                    <div className="space-y-1">
                      {filteredCategories.slice(0, 3).map((category) => (
                        <button
                          key={category.id}
                          onClick={() => navigate(`/category/${category.name}`)}
                          className="w-full text-left px-3 py-2 text-white/70 hover:text-white 
                                   hover:bg-white/5 rounded-lg transition-colors text-sm
                                   flex items-center gap-3"
                        >
                          <img 
                            src={category.image} 
                            alt={category.name}
                            className="w-8 h-8 rounded object-cover"
                          />
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent Searches */}
                {!searchQuery && recentSearches.length > 0 && (
                  <div className="p-4 border-b border-white/10">
                    <h4 className="text-white/80 text-sm font-medium mb-2 flex items-center gap-2">
                      <Clock size={16} />
                      Recent Searches
                    </h4>
                    <div className="space-y-1">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(search)}
                          className="w-full text-left px-3 py-2 text-white/70 hover:text-white 
                                   hover:bg-white/5 rounded-lg transition-colors text-sm"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trending Searches [web:591] */}
                {!searchQuery && (
                  <div className="p-4">
                    <h4 className="text-white/80 text-sm font-medium mb-2 flex items-center gap-2">
                      <TrendingUp size={16} />
                      Trending
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {trendingSearches.map((trend, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(trend)}
                          className="px-3 py-1.5 bg-amber-400/10 text-amber-400 rounded-full 
                                   hover:bg-amber-400/20 transition-colors text-xs font-medium"
                        >
                          {trend}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Searches */}
                {searchQuery && (
                  <div className="p-4 border-t border-white/10">
                    <h4 className="text-white/80 text-sm font-medium mb-2">Popular Searches</h4>
                    <div className="space-y-1">
                      {popularSearches
                        .filter(search => search.toLowerCase().includes(searchQuery.toLowerCase()))
                        .slice(0, 4)
                        .map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(search)}
                          className="w-full text-left px-3 py-2 text-white/70 hover:text-white 
                                   hover:bg-white/5 rounded-lg transition-colors text-sm"
                        >
                          <span className="font-medium text-amber-400">{searchQuery}</span>
                          {search.toLowerCase().replace(searchQuery.toLowerCase(), '')}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
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
                {searchQuery ? `Search Results for "${searchQuery}"` : 'Shop by Category'}
              </span>
            </h2>
            <p className="text-white/60 text-sm hidden sm:block">
              {filteredCategories.length} {filteredCategories.length === 1 ? 'category' : 'categories'} found
            </p>
          </motion.div>

          {/* Responsive Grid with Filtered Results */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                       gap-4 sm:gap-5 lg:gap-6"
          >
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <Link key={category.id} to={`/category/${category.name}`}>
                  <CategoryCard
                    name={category.name}
                    image={category.image}
                  />
                </Link>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <div className="text-white/40 mb-4">
                  <Search size={48} className="mx-auto mb-4" />
                </div>
                <h3 className="text-white text-xl font-medium mb-2">No categories found</h3>
                <p className="text-white/60 mb-4">
                  Try searching for "{searchQuery}" in our products instead
                </p>
                <button
                  onClick={() => handleSearch()}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-gray-900 
                           rounded-xl font-semibold transition-colors"
                >
                  Search Products
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
