import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Trash2, 
  Minus, 
  Plus, 
  Tag, 
  ArrowLeft, 
  Lock, 
  ShoppingBag,
  Sparkles,
  Ticket
} from 'lucide-react';
import { motion } from 'motion/react';

export default function CartView() {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    navigateTo,
    applyCoupon,
    couponCode,
    cartSubtotal,
    cartTax,
    cartShipping,
    cartTotal,
    user
  } = useApp();

  const [promoInput, setPromoInput] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyCoupon(promoInput)) {
      setPromoInput('');
    }
  };

  const handleProceedToCheckout = () => {
    if (!user) {
      navigateTo('auth');
    } else {
      navigateTo('checkout');
    }
  };

  return (
    <div className="w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-3xl font-black text-zinc-950 dark:text-white tracking-tight mb-8">Shopping Cart</h1>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* List of Cart Items */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl p-6 shadow-sm space-y-6">
                {cart.map((item) => {
                  const product = item.product;
                  const itemTotal = product.price * item.quantity;

                  return (
                    <motion.div
                      key={product.id}
                      layout
                      className="flex flex-col sm:flex-row gap-5 items-center justify-between pb-6 border-b border-zinc-100 dark:border-zinc-800 last:border-0 last:pb-0"
                    >
                      {/* Product details info card */}
                      <div className="flex gap-4 items-center w-full sm:w-1/2">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded-2xl bg-zinc-100 border border-zinc-200/20"
                        />
                        <div className="min-w-0">
                          <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-400 uppercase">{product.brand}</span>
                          <h3
                            onClick={() => navigateTo('product-details', product.id)}
                            className="text-sm font-bold text-zinc-900 dark:text-white hover:underline cursor-pointer truncate"
                          >
                            {product.name}
                          </h3>
                          <p className="text-xs text-zinc-500 mt-0.5 capitalize">{product.category}</p>
                        </div>
                      </div>

                      {/* Quantity & Actions control */}
                      <div className="flex items-center justify-between w-full sm:w-1/2 gap-6">
                        {/* Price */}
                        <div className="text-left sm:text-right">
                          <span className="text-sm font-bold text-zinc-900 dark:text-white">${product.price}</span>
                          <span className="text-[10px] text-zinc-400 block">Unit Price</span>
                        </div>

                        {/* Plus/minus slider */}
                        <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/40 dark:border-zinc-800/40 rounded-xl px-2 py-1">
                          <button
                            onClick={() => updateCartQuantity(product.id, item.quantity - 1)}
                            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-800 transition-all cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(product.id, item.quantity + 1)}
                            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-800 transition-all cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Calculated total and delete icon */}
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <span className="text-base font-black text-zinc-950 dark:text-white">${itemTotal}</span>
                          </div>
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="p-2 rounded-xl text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Continue Shopping button */}
              <button
                onClick={() => navigateTo('products')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold border border-zinc-200 hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600 rounded-xl transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Shopping</span>
              </button>
            </div>

            {/* Calculations summaries sidebar */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Promo code entry */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold text-sm uppercase tracking-wider">
                  <Ticket className="w-4 h-4 text-zinc-400" />
                  <span>Promo Codes</span>
                </div>
                
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. APEX20"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-2 text-sm uppercase font-mono placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-950/20"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-zinc-950 hover:bg-zinc-900 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {couponCode && (
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl flex items-center justify-between text-xs text-emerald-600 font-bold">
                    <span>Applied Coupon: {couponCode}</span>
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  </div>
                )}

                <div className="text-[10px] text-zinc-400 leading-normal font-medium bg-zinc-50 dark:bg-zinc-950 p-2.5 rounded-xl border border-zinc-200/20">
                  <span className="font-bold text-zinc-500 block mb-1">AVAILABLE ACTIVE PROMOS:</span>
                  • <span className="font-mono text-zinc-600 dark:text-zinc-300">APEX20</span> (20% reduction on order checkout)<br/>
                  • <span className="font-mono text-zinc-600 dark:text-zinc-300">WELCOME50</span> (10% markdown on order subtotal)
                </div>
              </div>

              {/* Final price summary block */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-black text-zinc-950 dark:text-white uppercase tracking-wider pb-3 border-b border-zinc-100 dark:border-zinc-800">Order Summary</h3>
                
                <div className="space-y-3.5 text-xs text-zinc-500 dark:text-zinc-400">
                  <div className="flex justify-between">
                    <span>Basket Subtotal</span>
                    <span className="font-bold text-zinc-900 dark:text-white">${cartSubtotal}</span>
                  </div>

                  {couponCode && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Promo discount</span>
                      <span>-${cartSubtotal - (cartSubtotal - (cartSubtotal * (couponCode === 'APEX20' ? 0.20 : 0.10)))}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Estimated Sales Tax (8%)</span>
                    <span className="font-bold text-zinc-900 dark:text-white">${cartTax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Estimated Express Shipping</span>
                    <span className="font-bold text-zinc-900 dark:text-white">
                      {cartShipping === 0 ? 'COMPLEMENTARY' : `$${cartShipping}`}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-baseline mb-6">
                  <span className="text-sm font-bold text-zinc-950 dark:text-white">Order Total</span>
                  <span className="text-2xl font-black text-zinc-950 dark:text-white">${cartTotal.toFixed(2)}</span>
                </div>

                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-4 bg-zinc-950 hover:bg-zinc-900 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-black text-sm tracking-wide rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  id="cart-checkout-btn"
                >
                  <Lock className="w-4 h-4" />
                  <span>Proceed to Secure Checkout</span>
                </button>
              </div>

            </div>

          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 px-4 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl text-center">
            <div className="w-20 h-20 rounded-full bg-zinc-150 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-600 mb-6">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Your Shopping Cart is Empty</h3>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed mb-8">
              Explore our luxury tech, custom wardrobes, and smart items to load high-end components into your cart.
            </p>
            <button
              onClick={() => navigateTo('products')}
              className="px-8 py-3 bg-zinc-950 hover:bg-zinc-900 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-xs tracking-wider uppercase rounded-xl transition-all cursor-pointer"
            >
              Explore Catalog Directory
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
