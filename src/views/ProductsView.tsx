import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Filter, 
  RotateCcw, 
  ChevronRight, 
  Star, 
  Tag, 
  X,
  SlidersHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ProductCard from '../components/ProductCard';

const BRANDS = ['Aero', 'Vortex', 'Chronos', 'Nebula', 'Apex', 'Monarch', 'Horizon', 'Siren', 'Vanguard'];

export default function ProductsView() {
  const {
    categories,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    sortBy,
    setSortBy,
    getFilteredProducts
  } = useApp();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filteredProducts = getFilteredProducts();

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setSelectedBrand(null);
    setPriceRange([0, 3000]);
    setMinRating(0);
    setSortBy('featured');
    setSearchQuery('');
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setPriceRange([0, val]);
  };

  return (
    <div className="w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Title header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-semibold mb-2">
              <span className="hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer">ApexMarket</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-zinc-900 dark:text-white font-black">Catalog Directory</span>
            </div>
            <h1 className="text-3xl font-black text-zinc-950 dark:text-white tracking-tight">
              {selectedCategory 
                ? categories.find(c => c.slug === selectedCategory)?.name 
                : "All Curated Products"}
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Showing {filteredProducts.length} high-fidelity products based on active criteria.
            </p>
          </div>

          {/* Sorting controls */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-bold text-zinc-800 dark:text-zinc-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-zinc-950/20"
            >
              <option value="featured">Featured Picks</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated Stars</option>
              <option value="discount">Highest Markdown</option>
            </select>
          </div>
        </div>

        {/* Dynamic active badges row */}
        {(selectedCategory || selectedBrand || minRating > 0 || priceRange[1] < 3000 || searchQuery) && (
          <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-zinc-100 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200/20">
            <span className="text-xs font-mono font-bold text-zinc-400 mr-2 uppercase">Active:</span>
            
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
                Query: "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"><X className="w-3 h-3" /></button>
              </span>
            )}
            {selectedCategory && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 capitalize">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory(null)} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"><X className="w-3 h-3" /></button>
              </span>
            )}
            {selectedBrand && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
                Brand: {selectedBrand}
                <button onClick={() => setSelectedBrand(null)} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"><X className="w-3 h-3" /></button>
              </span>
            )}
            {minRating > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
                Rating: {minRating}+ Stars
                <button onClick={() => setMinRating(0)} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"><X className="w-3 h-3" /></button>
              </span>
            )}
            {priceRange[1] < 3000 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
                Max Price: ${priceRange[1]}
                <button onClick={() => setPriceRange([0, 3000])} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"><X className="w-3 h-3" /></button>
              </span>
            )}

            <button
              onClick={clearAllFilters}
              className="ml-auto inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset All Filters
            </button>
          </div>
        )}

        {/* Catalog layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filters - Desktop only */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl p-6 shadow-sm sticky top-28">
              
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-850 mb-6">
                <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filter Options</span>
                </div>
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors font-semibold"
                >
                  Clear
                </button>
              </div>

              {/* Category selector */}
              <div className="space-y-3 mb-6">
                <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">Departments</h4>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-3 py-2 text-sm font-bold rounded-xl transition-colors cursor-pointer ${!selectedCategory ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white' : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/20'}`}
                  >
                    All Departments
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left px-3 py-2 text-sm font-bold rounded-xl transition-colors cursor-pointer ${selectedCategory === cat.slug ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white' : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/20'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price filter */}
              <div className="space-y-3 mb-6 pb-6 border-b border-zinc-100 dark:border-zinc-850">
                <div className="flex justify-between items-center text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
                  <span>Price Range</span>
                  <span className="text-zinc-900 dark:text-white font-bold font-sans">${priceRange[0]} - ${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3000"
                  step="50"
                  value={priceRange[1]}
                  onChange={handlePriceChange}
                  className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-950 dark:accent-white"
                />
                <div className="flex justify-between text-[10px] text-zinc-400 font-bold font-mono">
                  <span>$0</span>
                  <span>$3,000</span>
                </div>
              </div>

              {/* Brand filter */}
              <div className="space-y-3 mb-6 pb-6 border-b border-zinc-100 dark:border-zinc-850">
                <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">Brands</h4>
                <div className="flex flex-wrap gap-1.5">
                  {BRANDS.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${selectedBrand === brand ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 border-zinc-950 dark:border-white' : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 hover:text-zinc-900 dark:hover:text-white'}`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating selection */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">Minimum Rating</h4>
                <div className="flex flex-col gap-1">
                  {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${minRating === rating ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white' : 'text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/30'}`}
                    >
                      <div className="flex gap-0.5 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'fill-current' : 'text-zinc-200 dark:text-zinc-700'}`} />
                        ))}
                      </div>
                      <span>{rating}+ Stars</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </aside>

          {/* Results Grid */}
          <main className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 px-4 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl text-center">
                <div className="w-16 h-16 rounded-full bg-zinc-150 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-600 mb-6">
                  <Filter className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">No Matching Products Found</h3>
                <p className="text-sm text-zinc-400 max-w-sm leading-relaxed mb-6">
                  We couldn't locate any products matching your current filtering selections. Try loosening your price threshold or clearing specific query criteria.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 bg-zinc-950 hover:bg-zinc-900 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Clear All Selection Criteria
                </button>
              </div>
            )}
          </main>

        </div>
      </div>

      {/* Mobile floating filter trigger pill */}
      <div className="lg:hidden fixed bottom-24 left-1/2 -translate-x-1/2 z-40">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center gap-2 px-5 py-3.5 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:scale-105 active:scale-95 font-bold text-xs tracking-wider uppercase rounded-full shadow-xl shadow-zinc-950/20 dark:shadow-black/40 transition-all cursor-pointer border border-zinc-800/20"
        >
          <SlidersHorizontal className="w-4 h-4 text-blue-600 dark:text-blue-500" />
          <span>Filter & Sort ({filteredProducts.length})</span>
        </button>
      </div>

      {/* Mobile Filter slide-up sheet */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="lg:hidden fixed inset-0 bg-black z-50"
            />
            
            {/* Drawer Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="lg:hidden fixed bottom-0 left-0 right-0 max-h-[85vh] bg-white dark:bg-zinc-900 rounded-t-[2.5rem] border-t border-zinc-200 dark:border-zinc-800 shadow-2xl z-55 overflow-y-auto p-6"
            >
              {/* Pull handle bar */}
              <div className="w-12 h-1 bg-zinc-200 dark:bg-zinc-700 rounded-full mx-auto mb-6" />
              
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800 mb-6">
                <div className="flex items-center gap-2 font-black text-zinc-950 dark:text-white text-base">
                  <SlidersHorizontal className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                  <span>Filter Catalog</span>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-rose-500 font-bold hover:underline cursor-pointer"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Drawer Filters Body */}
              <div className="space-y-6 pb-24">
                
                {/* Sorting options */}
                <div className="space-y-3 pb-6 border-b border-zinc-100 dark:border-zinc-800">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">Sort Inventory</h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-sm font-bold text-zinc-800 dark:text-zinc-200 rounded-xl px-4 py-3 focus:outline-none"
                  >
                    <option value="featured">Featured Picks</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Rated Stars</option>
                    <option value="discount">Highest Markdown</option>
                  </select>
                </div>

                {/* Category selector */}
                <div className="space-y-3 pb-6 border-b border-zinc-100 dark:border-zinc-800">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">Departments</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`text-center px-3 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${!selectedCategory ? 'bg-blue-600 text-white' : 'bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300'}`}
                    >
                      All Departments
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.slug)}
                        className={`text-center px-3 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer truncate ${selectedCategory === cat.slug ? 'bg-blue-600 text-white' : 'bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300'}`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price filter */}
                <div className="space-y-3 pb-6 border-b border-zinc-100 dark:border-zinc-800">
                  <div className="flex justify-between items-center text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
                    <span>Price Range</span>
                    <span className="text-zinc-900 dark:text-white font-bold font-sans">${priceRange[0]} - ${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="3000"
                    step="50"
                    value={priceRange[1]}
                    onChange={handlePriceChange}
                    className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-950 dark:accent-white"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-400 font-bold font-mono">
                    <span>$0</span>
                    <span>$3,000</span>
                  </div>
                </div>

                {/* Brand filter */}
                <div className="space-y-3 pb-6 border-b border-zinc-100 dark:border-zinc-800">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">Brands</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {BRANDS.map((brand) => (
                      <button
                        key={brand}
                        onClick={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${selectedBrand === brand ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 border-zinc-950 dark:border-white' : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'}`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating selection */}
                <div className="space-y-3 pb-6">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">Minimum Rating</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                        className={`flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl transition-all border cursor-pointer ${minRating === rating ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 border-zinc-950 dark:border-white' : 'border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300'}`}
                      >
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{rating}+</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Sheet Apply Action Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-white/0 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900/0 pt-8 flex gap-3 z-10">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-4 bg-zinc-950 hover:bg-zinc-900 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all text-center cursor-pointer shadow-lg"
                >
                  Apply Filters ({filteredProducts.length})
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
