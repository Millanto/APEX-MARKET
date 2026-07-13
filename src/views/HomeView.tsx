import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  ChevronLeft, 
  ChevronRight, 
  Star,
  Quote,
  ShieldCheck,
  Package,
  Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ProductCard from '../components/ProductCard';

const HERO_SLIDES = [
  {
    id: 1,
    title: "AeroPhone 15 Pro Max",
    subtitle: "AEROSPACE TITANIUM • 3NM SILICON",
    tagline: "The definitive titan of smartphones, engineered to exceed expectations.",
    actionText: "Order Tech",
    view: "product-details",
    targetId: "tech-01",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1600&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "AeroPods Max ANC",
    subtitle: "STUDIO ACOUSTICS • ADAPTIVE NOISE CANCELING",
    tagline: "Uncompromising spatial sound meets comfort in a hand-polished design.",
    actionText: "Explore Audio",
    view: "product-details",
    targetId: "audio-01",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "Monarch Winter Cashmere",
    subtitle: "MONGOLIAN VIRGIN GRADE-A CASHMERE",
    tagline: "Expertly double-faced wool silhouettes providing timeless luxury.",
    actionText: "Shop Luxury",
    view: "products",
    targetId: null,
    category: "apparel",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&auto=format&fit=crop&q=80"
  }
];

const TESTIMONIALS = [
  {
    name: "Eleanor Sterling",
    role: "Lead Creative, Vogue Labs",
    quote: "The Monarch cashmere coat is absolute perfection. Seamless checkout and lightning-fast global dispatch. Comparable to high-end houses but with a modern, friction-free shopping layout.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Eleanor"
  },
  {
    name: "Marcus Vance",
    role: "Senior Engineering Consultant",
    quote: "Bought the AeroPhone 15 Pro Max. The spec lists are extremely accurate, and the customer support was remarkably professional. It is refreshing to buy luxury electronics from a platform that cares about security.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Marcus"
  }
];

export default function HomeView() {
  const { 
    navigateTo, 
    setSelectedCategory, 
    products, 
    categories 
  } = useApp();

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Flash Sale Live Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 12, seconds: 59 });
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset countdown
          return { hours: 8, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleHeroAction = (slide: typeof HERO_SLIDES[0]) => {
    if (slide.view === 'product-details' && slide.targetId) {
      navigateTo('product-details', slide.targetId);
    } else {
      if (slide.category) {
        setSelectedCategory(slide.category);
      }
      navigateTo('products');
    }
  };

  const selectCat = (slug: string) => {
    setSelectedCategory(slug);
    navigateTo('products');
  };

  // Extract products for specific home page categories
  const flashSaleProducts = products.filter(p => p.discount > 12).slice(0, 4);
  const bestSellers = products.filter(p => p.rating >= 4.8 && p.reviews > 400).slice(0, 4);
  const newArrivals = products.slice(4, 8);

  return (
    <div className="w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen">
      
      {/* 1. HERO CAROUSEL */}
      <section className="relative w-full h-[65vh] sm:h-[80vh] overflow-hidden bg-black border-b border-zinc-200/50 dark:border-zinc-800/50" id="home-hero-section">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Background image */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black/30 z-10" />
            <img 
              src={HERO_SLIDES[currentSlide].image} 
              alt={HERO_SLIDES[currentSlide].title} 
              className="w-full h-full object-cover opacity-85"
            />
            
            {/* Slide Content */}
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl space-y-4">
                  <motion.span 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-[10px] sm:text-xs font-black tracking-widest text-white uppercase"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                    {HERO_SLIDES[currentSlide].subtitle}
                  </motion.span>
                  
                  <motion.h1 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.05]"
                  >
                    {HERO_SLIDES[currentSlide].title}
                  </motion.h1>

                  <motion.p 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-sm sm:text-lg text-zinc-300 font-medium leading-relaxed"
                  >
                    {HERO_SLIDES[currentSlide].tagline}
                  </motion.p>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="pt-4"
                  >
                    <button
                      onClick={() => handleHeroAction(HERO_SLIDES[currentSlide])}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-zinc-200 text-zinc-950 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-xl cursor-pointer"
                    >
                      <span>{HERO_SLIDES[currentSlide].actionText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${currentSlide === idx ? 'w-8 bg-white' : 'w-2 bg-white/40'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Slider Navigation arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md hidden sm:block transition-colors cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md hidden sm:block transition-colors cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </section>

      {/* 2. FEATURED DEPARTMENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="home-categories-section">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block mb-2">CURATED COLLECTIONS</span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 dark:text-white">Shop by Department</h2>
          </div>
          <button 
            onClick={() => { setSelectedCategory(null); navigateTo('products'); }}
            className="flex items-center gap-1.5 text-sm font-bold text-zinc-900 dark:text-white hover:underline cursor-pointer"
          >
            <span>See Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => selectCat(cat.slug)}
              className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden cursor-pointer shadow-sm border border-zinc-200/10 hover:shadow-lg transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 z-10 group-hover:from-black/90 transition-all" />
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <h3 className="text-sm sm:text-base font-black text-white leading-tight mb-1">{cat.name}</h3>
                <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-300 group-hover:text-white transition-colors flex items-center gap-1">
                  <span>DISCOVER</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. FLASH SALE & SPECIAL OFFER */}
      <section className="bg-white dark:bg-zinc-900 border-y border-zinc-200/50 dark:border-zinc-800/50 py-16" id="home-flashsale-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-10 pb-8 border-b border-zinc-100 dark:border-zinc-800">
            {/* Left Flash Header */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center animate-bounce shadow-md shadow-amber-500/20">
                <Zap className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight">APEX Lightning Deals</h2>
                <p className="text-xs text-zinc-400">High-demand items at unprecedented markdown rates. Once gone, pricing resets.</p>
              </div>
            </div>

            {/* Right clock */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest mr-2">ENDS IN:</span>
              <div className="flex items-center gap-1.5">
                <div className="w-12 py-2 bg-zinc-950 dark:bg-zinc-800 border border-zinc-800 text-white rounded-xl text-center shadow-inner">
                  <span className="text-lg font-black block leading-none">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="text-[8px] font-mono font-bold text-zinc-500 block mt-0.5">HRS</span>
                </div>
                <span className="text-zinc-500 font-bold">:</span>
                <div className="w-12 py-2 bg-zinc-950 dark:bg-zinc-800 border border-zinc-800 text-white rounded-xl text-center shadow-inner">
                  <span className="text-lg font-black block leading-none">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="text-[8px] font-mono font-bold text-zinc-500 block mt-0.5">MINS</span>
                </div>
                <span className="text-zinc-500 font-bold">:</span>
                <div className="w-12 py-2 bg-zinc-950 dark:bg-zinc-800 border border-zinc-800 text-white rounded-xl text-center shadow-inner">
                  <span className="text-lg font-black block leading-none text-rose-500 animate-pulse">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="text-[8px] font-mono font-bold text-zinc-500 block mt-0.5">SECS</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {flashSaleProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

        </div>
      </section>

      {/* 4. EXQUISITE BENTO GRID ADVANTAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="home-bento-grid">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Big Card - Left */}
          <div className="lg:col-span-8 bg-zinc-900 text-white rounded-3xl p-8 sm:p-12 overflow-hidden relative flex flex-col justify-between min-h-[350px] border border-zinc-800 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-transparent z-10" />
            <img src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1200&auto=format&fit=crop&q=80" alt="Audio Showcase" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform" />
            
            <div className="relative z-20 space-y-3 max-w-lg">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold tracking-wider text-zinc-200">
                <Compass className="w-3.5 h-3.5 text-yellow-400" />
                Apex Innovation
              </span>
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">Mastering Studio-Grade Acoustics</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Connect deeply with your digital auditory experiences. Our multi-element planar magnetic transducers produce clinically accurate transients, offering unrivaled depth and resolution.
              </p>
            </div>

            <div className="relative z-20 pt-6">
              <button 
                onClick={() => { setSelectedCategory('audio'); navigateTo('products'); }}
                className="px-6 py-3 bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs tracking-wider uppercase rounded-xl transition-colors cursor-pointer"
              >
                Experience Sonic Highs
              </button>
            </div>
          </div>

          {/* Right Top Card */}
          <div className="lg:col-span-4 bg-gradient-to-br from-zinc-950 to-zinc-900 text-white rounded-3xl p-8 overflow-hidden relative flex flex-col justify-between border border-zinc-800 shadow-xl min-h-[220px]">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest block">AUTHENTIC CRAFT</span>
              <h4 className="text-xl font-bold tracking-tight">Italian Wool Blazer</h4>
              <p className="text-xs text-zinc-400">Tailored drape construction from super 120s virgin fleece.</p>
            </div>
            <div>
              <button 
                onClick={() => navigateTo('product-details', 'apparel-03')}
                className="text-xs font-mono font-bold tracking-widest text-zinc-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>ACQUIRE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BEST SELLERS & RECENT CATALOGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-zinc-200/50 dark:border-zinc-800/50" id="home-bestsellers-section">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block mb-2">CONSUMER FAVORITES</span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 dark:text-white">Customer Best Sellers</h2>
          </div>
          <button 
            onClick={() => { setSelectedCategory(null); navigateTo('products'); }}
            className="flex items-center gap-1.5 text-sm font-bold text-zinc-900 dark:text-white hover:underline cursor-pointer"
          >
            <span>Browse All Favorites</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIALS & EDITORIAL */}
      <section className="bg-zinc-100 dark:bg-zinc-900/40 border-y border-zinc-200/50 dark:border-zinc-800/50 py-20" id="home-testimonials-section">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest block mb-4">CRITICAL ENDORSEMENTS</span>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 dark:text-white tracking-tight mb-16">Trusted by Discerning Clients</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {TESTIMONIALS.map((t, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center md:items-start text-center md:text-left bg-white dark:bg-zinc-900 border border-zinc-200/30 dark:border-zinc-800/30 p-8 rounded-2xl shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-600 mb-6">
                  <Quote className="w-5 h-5 fill-current" />
                </div>
                
                {/* Stars */}
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                  "{t.quote}"
                </p>

                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full bg-zinc-150 border border-zinc-200/30" />
                  <div>
                    <h4 className="text-sm font-bold text-zinc-950 dark:text-white">{t.name}</h4>
                    <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. BRANDS SCROLL ROW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center border-t border-zinc-100 dark:border-zinc-900" id="home-brands-logo-row">
        <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block mb-8">COMPREHENSIVE PARTNERSHIPS</span>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-40 hover:opacity-60 transition-opacity">
          <span className="text-xl sm:text-2xl font-black font-sans tracking-tight text-zinc-500 dark:text-zinc-400">AERO</span>
          <span className="text-xl sm:text-2xl font-black font-sans tracking-tight text-zinc-500 dark:text-zinc-400">VORTEX</span>
          <span className="text-xl sm:text-2xl font-black font-sans tracking-tight text-zinc-500 dark:text-zinc-400">MONARCH</span>
          <span className="text-xl sm:text-2xl font-black font-sans tracking-tight text-zinc-500 dark:text-zinc-400">CHRONOS</span>
          <span className="text-xl sm:text-2xl font-black font-sans tracking-tight text-zinc-500 dark:text-zinc-400">NEBULA</span>
        </div>
      </section>

    </div>
  );
}
