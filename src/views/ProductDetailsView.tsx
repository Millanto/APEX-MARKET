import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  ChevronRight, 
  Plus, 
  Minus, 
  Check, 
  MessageSquare, 
  User, 
  Trash2,
  Package,
  Cpu,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ProductCard from '../components/ProductCard';
import { Review } from '../types';

export default function ProductDetailsView() {
  const {
    selectedProductId,
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateTo,
    user,
    profile,
    fetchProductReviews,
    submitReview,
    showToast
  } = useApp();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'features'>('details');
  const [productReviews, setProductReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  // Review Form States
  const [ratingInput, setRatingInput] = useState(5);
  const [commentInput, setCommentInput] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  // Sync reviews
  useEffect(() => {
    if (product) {
      setReviewsLoading(true);
      fetchProductReviews(product.id)
        .then((items) => {
          setProductReviews(items);
        })
        .finally(() => {
          setReviewsLoading(false);
        });
      
      // Reset defaults
      setActiveImageIdx(0);
      setQuantity(1);
    }
  }, [product, selectedProductId]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Product link copied to clipboard!', 'info');
  };

  const handleQuantityIncrement = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    } else {
      showToast(`Only ${product.stock} items remaining in warehouse inventory.`, 'info');
    }
  };

  const handleQuantityDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      showToast('Authentication required to submit reviews.', 'error');
      navigateTo('auth');
      return;
    }
    if (!commentInput.trim()) {
      showToast('Comment cannot be empty.', 'error');
      return;
    }

    setSubmittingReview(true);
    try {
      await submitReview(product.id, ratingInput, commentInput);
      setCommentInput('');
      setRatingInput(5);
      // Reload reviews
      const freshReviews = await fetchProductReviews(product.id);
      setProductReviews(freshReviews);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingReview(false);
    }
  };

  // Get Related items
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Frequently bought together bundle selection
  const bundleProduct = products.find(p => p.category !== product.category) || products[1];

  const handleAddBundleToCart = () => {
    addToCart(product, quantity);
    addToCart(bundleProduct, 1);
    showToast('Bundle package successfully appended to cart!', 'success');
  };

  const isFavorited = isInWishlist(product.id);

  return (
    <div className="w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-semibold mb-8">
          <button onClick={() => navigateTo('home')} className="hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer">Home</button>
          <ChevronRight className="w-3 h-3" />
          <button onClick={() => navigateTo('products')} className="hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer">Catalog</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-zinc-500 capitalize">{product.category}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-zinc-900 dark:text-white font-black truncate">{product.name}</span>
        </div>

        {/* Core details stage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Gallery Media block */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden shadow-sm">
              <img
                src={product.images[activeImageIdx]}
                alt={product.name}
                className="w-full h-full object-cover transition-all"
                id="details-primary-image"
              />
            </div>

            {/* Thumbnail collection */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border bg-white dark:bg-zinc-900 transition-all cursor-pointer ${activeImageIdx === idx ? 'ring-2 ring-zinc-950 dark:ring-white border-transparent' : 'border-zinc-200 dark:border-zinc-800'}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Config & Checkout parameters */}
          <div className="flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              {/* Brand & badges */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-zinc-150 dark:bg-zinc-900 text-zinc-500 text-xs font-mono font-bold tracking-widest rounded-lg">
                  {product.brand.toUpperCase()}
                </span>
                
                <div className="flex items-center gap-1 text-sm font-semibold">
                  <div className="flex gap-0.5 text-amber-400">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <span className="text-zinc-900 dark:text-white">{product.rating}</span>
                  <span className="text-zinc-400">({product.reviews} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl font-black text-zinc-950 dark:text-white tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Price segment */}
              <div className="flex items-baseline gap-4 py-2 border-b border-zinc-200/50 dark:border-zinc-800/50">
                <span className="text-3xl font-black text-zinc-950 dark:text-white">${product.price}</span>
                {product.discount > 0 && (
                  <>
                    <span className="text-base line-through text-zinc-400">${product.oldPrice}</span>
                    <span className="text-xs bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-black px-2 py-0.5 rounded-md">
                      -{product.discount}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Short summary */}
              <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                {product.description}
              </p>
            </div>

            {/* Selection mechanics */}
            <div className="space-y-6 pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
              
              {/* Quantity */}
              {product.stock > 0 && (
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">Quantity:</span>
                  <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-xl px-2 py-1">
                    <button
                      onClick={handleQuantityDecrement}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-800 transition-all cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center text-sm font-bold">{quantity}</span>
                    <button
                      onClick={handleQuantityIncrement}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-800 transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-xs text-zinc-400">({product.stock} items available in store)</span>
                </div>
              )}

              {/* Buy actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                {product.stock > 0 ? (
                  <>
                    <button
                      onClick={() => addToCart(product, quantity)}
                      className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-zinc-950 hover:bg-zinc-900 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-sm tracking-wide rounded-2xl transition-all shadow-md hover:shadow-lg cursor-pointer"
                      id="details-add-to-cart-btn"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      onClick={() => {
                        addToCart(product, quantity);
                        navigateTo('cart');
                      }}
                      className="flex-1 px-8 py-4 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-800/50 text-zinc-900 dark:text-white font-bold text-sm tracking-wide rounded-2xl transition-all cursor-pointer"
                    >
                      Buy Now
                    </button>
                  </>
                ) : (
                  <div className="w-full text-center py-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <span className="text-sm font-black text-rose-500 uppercase tracking-widest">PRODUCT CURRENTLY OUT OF STOCK</span>
                  </div>
                )}

                {/* Wish & Share secondary utilities */}
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-4 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer ${isFavorited ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/20' : 'text-zinc-500'}`}
                    title="Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-4 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                    title="Share product link"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Detailed technical Tabs */}
        <section className="mb-16 border-b border-zinc-200/30 pb-12">
          
          {/* Tab headers */}
          <div className="flex border-b border-zinc-200/50 dark:border-zinc-800/50 mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-3 text-sm font-bold uppercase tracking-wider mr-8 border-b-2 transition-all cursor-pointer ${activeTab === 'details' ? 'border-zinc-950 dark:border-white text-zinc-950 dark:text-white' : 'border-transparent text-zinc-400 hover:text-zinc-700'}`}
            >
              Description Tab
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 text-sm font-bold uppercase tracking-wider mr-8 border-b-2 transition-all cursor-pointer ${activeTab === 'specs' ? 'border-zinc-950 dark:border-white text-zinc-950 dark:text-white' : 'border-transparent text-zinc-400 hover:text-zinc-700'}`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`pb-3 text-sm font-bold uppercase tracking-wider mr-8 border-b-2 transition-all cursor-pointer ${activeTab === 'features' ? 'border-zinc-950 dark:border-white text-zinc-950 dark:text-white' : 'border-transparent text-zinc-400 hover:text-zinc-700'}`}
            >
              Key Highlights
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'details' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="space-y-4 max-w-4xl"
              >
                <h3 className="text-lg font-bold text-zinc-950 dark:text-white">Commercial Craft Description</h3>
                <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {product.description} Each unit is put through rigid volumetric alignment checks to verify hardware integrity before it enters dispatch. Backed by full 12-month manufacturer insurance, you are buying peace of mind alongside cutting edge luxury aesthetics.
                </p>
              </motion.div>
            )}

            {activeTab === 'specs' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl overflow-hidden shadow-sm"
              >
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <tr key={key} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/50 transition-colors">
                        <td className="px-6 py-4 font-mono font-bold text-zinc-400 text-xs tracking-wider uppercase bg-zinc-50/35 dark:bg-zinc-900/35 w-1/3">{key}</td>
                        <td className="px-6 py-4 font-semibold text-zinc-800 dark:text-zinc-200">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}

            {activeTab === 'features' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="space-y-3 max-w-4xl"
              >
                <h3 className="text-lg font-bold text-zinc-950 dark:text-white">Engineering Highlights</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex gap-3 items-start p-3 bg-white dark:bg-zinc-900 border border-zinc-200/40 dark:border-zinc-800/40 rounded-xl">
                      <div className="w-5 h-5 rounded-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Frequently Bought Together Bundle */}
        <section className="mb-16 bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 p-8 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-inner">
          <h3 className="text-lg font-bold text-zinc-950 dark:text-white mb-6 uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-5 h-5 text-amber-500" />
            <span>Frequently Bought Together Bundle</span>
          </h3>

          <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
              {/* Main product */}
              <div className="flex gap-3 items-center bg-white dark:bg-zinc-900 p-3 rounded-2xl border border-zinc-200/30">
                <img src={product.images[0]} alt={product.name} className="w-16 h-16 object-cover rounded-xl bg-zinc-100" />
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white truncate max-w-[150px]">{product.name}</h4>
                  <p className="text-xs font-black text-zinc-400">${product.price}</p>
                </div>
              </div>

              <span className="text-xl font-bold text-zinc-400">+</span>

              {/* Bundle offer */}
              <div className="flex gap-3 items-center bg-white dark:bg-zinc-900 p-3 rounded-2xl border border-zinc-200/30">
                <img src={bundleProduct.images[0]} alt={bundleProduct.name} className="w-16 h-16 object-cover rounded-xl bg-zinc-100" />
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white truncate max-w-[150px]">{bundleProduct.name}</h4>
                  <p className="text-xs font-black text-zinc-400">${bundleProduct.price}</p>
                </div>
              </div>
            </div>

            <div className="text-center md:text-right space-y-3">
              <div>
                <span className="text-xs text-zinc-400 block font-mono">BUNDLE PRICE FOR BOTH:</span>
                <span className="text-2xl font-black text-zinc-950 dark:text-white">${product.price + bundleProduct.price}</span>
              </div>
              <button
                onClick={handleAddBundleToCart}
                className="px-6 py-3 bg-zinc-950 hover:bg-zinc-900 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-xs tracking-wide rounded-xl transition-all cursor-pointer"
              >
                Add Both to Shopping Cart
              </button>
            </div>
          </div>
        </section>

        {/* Interactive Reviews and ratings stage */}
        <section className="mb-16 grid grid-cols-1 lg:grid-cols-3 gap-12" id="details-reviews-stage">
          
          {/* Left Review overview */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-xl font-black text-zinc-950 dark:text-white tracking-tight">Customer Endorsements</h3>
            
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl p-6 text-center space-y-4 shadow-sm">
              <span className="text-5xl font-black text-zinc-950 dark:text-white block">{product.rating}</span>
              
              <div className="flex justify-center text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-zinc-200'}`} />
                ))}
              </div>

              <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider block">Based on {productReviews.length} real user logs</span>
            </div>

            {/* Write a review form */}
            {user ? (
              <form onSubmit={handleReviewSubmit} className="space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl p-6">
                <h4 className="text-sm font-bold text-zinc-950 dark:text-white uppercase tracking-wider">Leave your feedback</h4>
                
                {/* Rating selection star row */}
                <div className="flex gap-1.5 text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRatingInput(star)}
                      className="hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star className={`w-6 h-6 ${star <= ratingInput ? 'fill-current' : 'text-zinc-200 dark:text-zinc-800'}`} />
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  <textarea
                    placeholder="Write your detailed product feedback here..."
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    rows={4}
                    className="w-full text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-950/20"
                    maxLength={2000}
                  />
                  <span className="text-[10px] text-zinc-400 text-right block">{commentInput.length}/2000 chars</span>
                </div>

                <button
                  type="submit"
                  disabled={submittingReview}
                  className="w-full py-2.5 bg-zinc-950 hover:bg-zinc-900 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-xs rounded-xl transition-all cursor-pointer disabled:opacity-50"
                >
                  {submittingReview ? 'Dispatching Review...' : 'Submit Written Review'}
                </button>
              </form>
            ) : (
              <div className="bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200/30 rounded-2xl p-6 text-center">
                <p className="text-xs text-zinc-400 mb-3 font-semibold">Sign in with Google or Email to submit ratings and written reviews on items.</p>
                <button
                  onClick={() => navigateTo('auth')}
                  className="px-4 py-2 bg-zinc-950 hover:bg-zinc-900 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Access Authorization
                </button>
              </div>
            )}
          </div>

          {/* Right Reviews list */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-black text-zinc-950 dark:text-white tracking-tight flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-zinc-400" />
              <span>Verified Logs ({productReviews.length})</span>
            </h3>

            {reviewsLoading ? (
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-white dark:bg-zinc-900 h-28 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50" />
                ))}
              </div>
            ) : productReviews.length > 0 ? (
              <div className="space-y-4">
                {productReviews.map((r) => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl relative shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <img src={r.userAvatar} alt={r.userName} className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800" />
                        <div>
                          <h5 className="text-sm font-bold text-zinc-900 dark:text-white">{r.userName}</h5>
                          <span className="text-[10px] text-zinc-400 font-semibold">{new Date(r.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < r.rating ? 'fill-current' : 'text-zinc-200 dark:text-zinc-800'}`} />
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {r.comment}
                    </p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl">
                <p className="text-sm text-zinc-400">No written feedback logs registered for this item yet. Be the first to catalog your experience!</p>
              </div>
            )}
          </div>

        </section>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="pt-10 border-t border-zinc-200/30">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-zinc-950 dark:text-white tracking-tight">Discovered Related Picks</h2>
              <button 
                onClick={() => { navigateTo('products'); }}
                className="text-sm font-bold text-zinc-900 dark:text-white hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Shop Similar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
