import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Home, 
  Grid, 
  Search, 
  ShoppingBag, 
  User,
  Heart,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function MobileBottomNav() {
  const { 
    activeView, 
    navigateTo, 
    cart, 
    wishlist,
    searchQuery,
    setSearchQuery,
    products
  } = useApp();

  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleNav = (view: string) => {
    setMobileSearchOpen(false);
    navigateTo(view);
  };

  // Mobile search suggestions
  const mobileSuggestions = () => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return products
      .filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q))
      .slice(0, 4);
  };

  const suggestions = mobileSuggestions();

  return (
    <>
      {/* Curved Floating Bottom Tab Bar for Mobile devices */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl shadow-xl shadow-zinc-950/10 dark:shadow-black/30 z-45 px-4 py-2.5 transition-colors duration-300">
        <div className="flex items-center justify-around">
          
          {/* Home Tab */}
          <button
            onClick={() => handleNav('home')}
            className="flex flex-col items-center justify-center relative py-1 px-3 rounded-xl transition-all active:scale-90 cursor-pointer"
            id="mobile-nav-home"
          >
            <Home className={`w-5 h-5 transition-all duration-200 ${activeView === 'home' ? 'text-blue-600 dark:text-blue-500 scale-110' : 'text-zinc-500 dark:text-zinc-400'}`} />
            <span className={`text-[10px] mt-0.5 font-bold transition-all ${activeView === 'home' ? 'text-blue-600 dark:text-blue-500 opacity-100' : 'text-zinc-400 dark:text-zinc-500 opacity-80'}`}>Home</span>
            {activeView === 'home' && (
              <motion.div 
                layoutId="activeTabGlow"
                className="absolute -bottom-1 w-5 h-1 bg-blue-600 dark:bg-blue-500 rounded-full"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>

          {/* Catalog Tab */}
          <button
            onClick={() => handleNav('products')}
            className="flex flex-col items-center justify-center relative py-1 px-3 rounded-xl transition-all active:scale-90 cursor-pointer"
            id="mobile-nav-products"
          >
            <Grid className={`w-5 h-5 transition-all duration-200 ${activeView === 'products' ? 'text-blue-600 dark:text-blue-500 scale-110' : 'text-zinc-500 dark:text-zinc-400'}`} />
            <span className={`text-[10px] mt-0.5 font-bold transition-all ${activeView === 'products' ? 'text-blue-600 dark:text-blue-500 opacity-100' : 'text-zinc-400 dark:text-zinc-500 opacity-80'}`}>Store</span>
            {activeView === 'products' && (
              <motion.div 
                layoutId="activeTabGlow"
                className="absolute -bottom-1 w-5 h-1 bg-blue-600 dark:bg-blue-500 rounded-full"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>

          {/* Search trigger Tab */}
          <button
            onClick={() => setMobileSearchOpen(true)}
            className="flex flex-col items-center justify-center relative py-1 px-3 rounded-xl transition-all active:scale-90 cursor-pointer"
            id="mobile-nav-search"
          >
            <Search className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
            <span className="text-[10px] mt-0.5 font-bold text-zinc-400 dark:text-zinc-500 opacity-80">Search</span>
          </button>

          {/* Cart Tab */}
          <button
            onClick={() => handleNav('cart')}
            className="flex flex-col items-center justify-center relative py-1 px-3 rounded-xl transition-all active:scale-90 cursor-pointer"
            id="mobile-nav-cart"
          >
            <div className="relative">
              <ShoppingBag className={`w-5 h-5 transition-all duration-200 ${activeView === 'cart' ? 'text-blue-600 dark:text-blue-500 scale-110' : 'text-zinc-500 dark:text-zinc-400'}`} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white font-black text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white dark:border-zinc-900 animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </div>
            <span className={`text-[10px] mt-0.5 font-bold transition-all ${activeView === 'cart' ? 'text-blue-600 dark:text-blue-500 opacity-100' : 'text-zinc-400 dark:text-zinc-500 opacity-80'}`}>Cart</span>
            {activeView === 'cart' && (
              <motion.div 
                layoutId="activeTabGlow"
                className="absolute -bottom-1 w-5 h-1 bg-blue-600 dark:bg-blue-500 rounded-full"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>

          {/* Profile/Wishlist Tab */}
          <button
            onClick={() => handleNav('profile')}
            className="flex flex-col items-center justify-center relative py-1 px-3 rounded-xl transition-all active:scale-90 cursor-pointer"
            id="mobile-nav-profile"
          >
            <div className="relative">
              <User className={`w-5 h-5 transition-all duration-200 ${activeView === 'profile' ? 'text-blue-600 dark:text-blue-500 scale-110' : 'text-zinc-500 dark:text-zinc-400'}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-blue-600 dark:bg-blue-500 text-white font-bold text-[8px] w-3 h-3 rounded-full border border-white dark:border-zinc-900" />
              )}
            </div>
            <span className={`text-[10px] mt-0.5 font-bold transition-all ${activeView === 'profile' ? 'text-blue-600 dark:text-blue-500 opacity-100' : 'text-zinc-400 dark:text-zinc-500 opacity-80'}`}>Profile</span>
            {activeView === 'profile' && (
              <motion.div 
                layoutId="activeTabGlow"
                className="absolute -bottom-1 w-5 h-1 bg-blue-600 dark:bg-blue-500 rounded-full"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>

        </div>
      </div>

      {/* Full screen Premium search Overlay for Mobile */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-zinc-950/90 backdrop-blur-xl z-55 flex flex-col p-6"
          >
            {/* Search header controls */}
            <div className="flex items-center justify-between gap-4 mb-8">
              <span className="text-xs font-mono font-bold text-zinc-400 tracking-wider">APEX SEARCH BAR</span>
              <button 
                onClick={() => setMobileSearchOpen(false)}
                className="p-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Smart Search Input Form */}
            <div className="relative w-full mb-6">
              <input
                type="text"
                placeholder="Find state-of-the-art tech, luxury coats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-zinc-900 text-white placeholder-zinc-500 font-bold text-base border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <Search className="absolute left-4 top-4.5 w-5 h-5 text-zinc-500" />
            </div>

            {/* Suggestions list */}
            <div className="flex-1 overflow-y-auto space-y-4">
              <span className="text-[10px] font-mono font-bold text-zinc-500 tracking-widest block uppercase">DYNAMIC PREVIEW MATCHES</span>
              
              {searchQuery.trim() !== '' ? (
                suggestions.length > 0 ? (
                  <div className="flex flex-col gap-2.5">
                    {suggestions.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setMobileSearchOpen(false);
                          navigateTo('product-details', p.id);
                        }}
                        className="w-full flex items-center gap-4 p-3 bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-850 rounded-2xl text-left transition-colors"
                      >
                        <img src={p.images[0]} alt={p.name} className="w-12 h-12 object-cover rounded-xl bg-zinc-950" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-white truncate">{p.name}</h4>
                          <p className="text-xs text-zinc-400 truncate">{p.brand} • {p.category}</p>
                        </div>
                        <span className="text-sm font-black text-white">${p.price}</span>
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        setMobileSearchOpen(false);
                        navigateTo('products');
                      }}
                      className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl text-center transition-all shadow-lg"
                    >
                      Show All Matched Results
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-12 text-sm text-zinc-400">
                    No curations match "{searchQuery}"
                  </div>
                )
              ) : (
                <div className="space-y-4">
                  {/* Popular quick-tap recommendations */}
                  <div className="flex flex-wrap gap-2">
                    {['Phones', 'Audio', 'Apparel', 'Vortex', 'Monarch', 'Sale'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          if (tag === 'Sale') {
                            setSearchQuery('');
                            navigateTo('products');
                          } else {
                            setSearchQuery(tag);
                          }
                        }}
                        className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-semibold text-xs rounded-xl transition-all"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                    Type keywords or select popular labels above to explore our global inventory.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
