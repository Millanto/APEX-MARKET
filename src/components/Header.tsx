import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Sun, 
  Moon, 
  ChevronDown, 
  LogOut, 
  Settings, 
  MapPin, 
  Clock, 
  Menu, 
  X,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const {
    activeView,
    navigateTo,
    user,
    profile,
    logout,
    cart,
    wishlist,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
    setSelectedBrand,
    darkMode,
    toggleDarkMode,
    products
  } = useApp();

  const [searchFocused, setSearchFocused] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartPreviewOpen, setCartPreviewOpen] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close menus on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute search suggestions
  const getSuggestions = () => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    // Return up to 5 matching products
    return products
      .filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q))
      .slice(0, 5);
  };

  const suggestions = getSuggestions();

  const handleSuggestionClick = (productId: string) => {
    setSearchFocused(false);
    navigateTo('product-details', productId);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchFocused(false);
    navigateTo('products');
  };

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top promotional bar */}
      <div className="w-full bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 dark:from-black dark:via-zinc-950 dark:to-black text-white py-2 px-4 text-center text-xs font-semibold tracking-wide flex items-center justify-center gap-2 border-b border-zinc-800/50">
        <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
        <span>LUXURY REDEFINED: GET FREE GLOBAL DELIVERY ON ORDERS OVER $150</span>
        <span className="hidden sm:inline bg-zinc-800 dark:bg-zinc-900 px-2 py-0.5 rounded-full text-[10px] ml-2">CODE: APEX20</span>
      </div>

      {/* Main glass navigation */}
      <nav className="w-full bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button 
                onClick={() => navigateTo('home')}
                className="flex items-center gap-2 group cursor-pointer"
                id="header-logo-btn"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md shadow-blue-500/15 group-hover:scale-105 transition-transform">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <div className="text-left leading-none">
                  <span className="text-lg font-black tracking-tight text-zinc-950 dark:text-white block font-sans">
                    <span className="text-blue-600 dark:text-blue-500">APEX</span><span className="font-light text-zinc-500">MARKET</span>
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-zinc-400 block">EST. 2026</span>
                </div>
              </button>
            </div>

            {/* Desktop Center Links */}
            <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
              <button 
                onClick={() => { setSelectedCategory(null); setSelectedBrand(null); navigateTo('home'); }}
                className={`transition-colors cursor-pointer ${activeView === 'home' ? 'text-zinc-950 dark:text-white font-semibold' : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'}`}
              >
                Home
              </button>
              <button 
                onClick={() => { setSelectedCategory(null); setSelectedBrand(null); navigateTo('products'); }}
                className={`transition-colors cursor-pointer ${activeView === 'products' ? 'text-zinc-950 dark:text-white font-semibold' : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'}`}
              >
                Products
              </button>
              <button 
                onClick={() => navigateTo('about')}
                className={`transition-colors cursor-pointer ${activeView === 'about' ? 'text-zinc-950 dark:text-white font-semibold' : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'}`}
              >
                About
              </button>
              <button 
                onClick={() => navigateTo('contact')}
                className={`transition-colors cursor-pointer ${activeView === 'contact' ? 'text-zinc-950 dark:text-white font-semibold' : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'}`}
              >
                Contact
              </button>
              <button 
                onClick={() => navigateTo('faq')}
                className={`transition-colors cursor-pointer ${activeView === 'faq' ? 'text-zinc-950 dark:text-white font-semibold' : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'}`}
              >
                FAQ
              </button>
            </div>

            {/* Smart Search Bar */}
            <div ref={searchRef} className="hidden md:block flex-1 max-w-md relative">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search products, brands, tech..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-full border bg-zinc-50/50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-950/20 dark:focus:ring-white/20 border-zinc-200 dark:border-zinc-800 transition-all"
                />
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-400" />
              </form>

              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {searchFocused && searchQuery.trim() !== '' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 right-0 mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden z-50 p-2"
                  >
                    <div className="px-3 py-1.5 text-[10px] font-semibold text-zinc-400 tracking-wider font-mono">SUGGESTED RESULTS</div>
                    {suggestions.length > 0 ? (
                      suggestions.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => handleSuggestionClick(p.id)}
                          className="w-full flex items-center gap-3 p-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-xl text-left transition-colors cursor-pointer"
                        >
                          <img src={p.images[0]} alt={p.name} className="w-10 h-10 object-cover rounded-lg bg-zinc-100" />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white truncate">{p.name}</h4>
                            <p className="text-xs text-zinc-400 truncate">{p.brand} • {p.category}</p>
                          </div>
                          <span className="text-sm font-bold text-zinc-900 dark:text-white">${p.price}</span>
                        </button>
                      ))
                    ) : (
                      <div className="p-4 text-center text-sm text-zinc-400">No results match your terms</div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Side Icons & Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              
              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 sm:p-2.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer shrink-0"
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Wishlist Button (Hidden on mobile as it's elegantly housed in the floating bottom nav) */}
              <button
                onClick={() => navigateTo('profile')} // Open profile which hosts Wishlist
                className="hidden md:flex p-2.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-300 transition-colors relative cursor-pointer shrink-0"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-[10px] font-bold rounded-full flex items-center justify-center border border-white dark:border-zinc-900">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Cart Button (Hidden on mobile as it's elegantly housed in the floating bottom nav) */}
              <div 
                className="relative hidden md:block shrink-0"
                onMouseEnter={() => setCartPreviewOpen(true)}
                onMouseLeave={() => setCartPreviewOpen(false)}
              >
                <button
                  onClick={() => navigateTo('cart')}
                  className="p-2.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-300 transition-colors relative cursor-pointer"
                  aria-label="Cart"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-[10px] font-bold rounded-full flex items-center justify-center border border-white dark:border-zinc-900">
                      {cartItemCount}
                    </span>
                  )}
                </button>

                {/* Micro Cart Hover Preview */}
                <AnimatePresence>
                  {cartPreviewOpen && cart.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      className="absolute right-0 mt-2 w-80 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden z-50 p-4"
                    >
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white pb-2 border-b border-zinc-100 dark:border-zinc-800">Shopping Cart ({cartItemCount})</h4>
                      <div className="max-h-60 overflow-y-auto py-2 divide-y divide-zinc-100 dark:divide-zinc-800">
                        {cart.map((item) => (
                          <div key={item.product.id} className="flex gap-3 py-2.5 items-center">
                            <img src={item.product.images[0]} alt={item.product.name} className="w-10 h-10 object-cover rounded-lg bg-zinc-100" />
                            <div className="flex-1 min-w-0">
                              <h5 className="text-xs font-bold text-zinc-900 dark:text-white truncate">{item.product.name}</h5>
                              <p className="text-[10px] text-zinc-400">{item.quantity} x ${item.product.price}</p>
                            </div>
                            <span className="text-xs font-bold text-zinc-900 dark:text-white">${item.product.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center mb-3">
                        <span className="text-xs text-zinc-500">Subtotal:</span>
                        <span className="text-sm font-bold text-zinc-900 dark:text-white">
                          ${cart.reduce((sub, item) => sub + item.product.price * item.quantity, 0)}
                        </span>
                      </div>
                      <button
                        onClick={() => { navigateTo('cart'); setCartPreviewOpen(false); }}
                        className="w-full py-2 bg-zinc-950 hover:bg-zinc-900 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-xs rounded-xl transition-all text-center cursor-pointer"
                      >
                        Checkout Order
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Profile dropdown or Login button */}
              <div ref={userMenuRef} className="relative shrink-0">
                {user ? (
                  <>
                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center gap-1 p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer shrink-0"
                    >
                      <img
                        src={profile?.photoURL || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.uid}`}
                        alt={profile?.name || 'Profile'}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-zinc-200 dark:border-zinc-800 object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <ChevronDown className="w-4 h-4 text-zinc-500 hidden sm:block" />
                    </button>

                    <AnimatePresence>
                      {userDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 10 }}
                          className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden z-50 p-2"
                        >
                          <div className="px-3 py-2.5 border-b border-zinc-100 dark:border-zinc-800">
                            <p className="text-xs font-semibold text-zinc-400">LOGGED IN AS</p>
                            <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">{profile?.name || user.email}</p>
                          </div>
                          
                          <div className="py-1">
                            <button
                              onClick={() => { navigateTo('profile'); setUserDropdownOpen(false); }}
                              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl text-left transition-colors cursor-pointer"
                            >
                              <User className="w-4 h-4 text-zinc-400" />
                              My Profile
                            </button>
                            <button
                              onClick={() => { navigateTo('profile'); setUserDropdownOpen(false); }}
                              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl text-left transition-colors cursor-pointer"
                            >
                              <Clock className="w-4 h-4 text-zinc-400" />
                              Order History
                            </button>
                            <button
                              onClick={() => { navigateTo('profile'); setUserDropdownOpen(false); }}
                              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl text-left transition-colors cursor-pointer"
                            >
                              <MapPin className="w-4 h-4 text-zinc-400" />
                              Addresses
                            </button>
                          </div>

                          <div className="pt-1.5 border-t border-zinc-100 dark:border-zinc-800">
                            <button
                              onClick={() => { logout(); setUserDropdownOpen(false); }}
                              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl text-left transition-colors cursor-pointer"
                            >
                              <LogOut className="w-4 h-4" />
                              Log Out
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <button
                    onClick={() => navigateTo('auth')}
                    className="flex items-center justify-center gap-2 w-10 h-10 md:w-auto md:px-4 md:py-2 rounded-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-900 dark:hover:bg-zinc-100 font-bold text-sm transition-all shadow-md cursor-pointer shrink-0"
                  >
                    <User className="w-4 h-4" />
                    <span className="hidden md:inline">Sign In</span>
                  </button>
                )}
              </div>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-300 cursor-pointer shrink-0"
                aria-label="Open menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>

          </div>
        </div>

        {/* Mobile slide drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-3 flex flex-col">
                <button
                  onClick={() => { setSelectedCategory(null); setSelectedBrand(null); navigateTo('home'); setMobileMenuOpen(false); }}
                  className="py-2.5 px-4 rounded-xl text-left font-bold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => { setSelectedCategory(null); setSelectedBrand(null); navigateTo('products'); setMobileMenuOpen(false); }}
                  className="py-2.5 px-4 rounded-xl text-left font-bold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  Products
                </button>
                <button
                  onClick={() => { navigateTo('about'); setMobileMenuOpen(false); }}
                  className="py-2.5 px-4 rounded-xl text-left font-bold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  About
                </button>
                <button
                  onClick={() => { navigateTo('contact'); setMobileMenuOpen(false); }}
                  className="py-2.5 px-4 rounded-xl text-left font-bold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  Contact
                </button>
                <button
                  onClick={() => { navigateTo('faq'); setMobileMenuOpen(false); }}
                  className="py-2.5 px-4 rounded-xl text-left font-bold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  FAQ
                </button>
                
                {/* Mobile Search input */}
                <div className="pt-2 px-4">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <input
                      type="text"
                      placeholder="Search items..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-xl border bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white"
                    />
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
