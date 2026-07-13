import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Lock, 
  ChevronRight, 
  CheckCircle, 
  ArrowLeft, 
  CreditCard, 
  Truck, 
  AlertCircle,
  Clock,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CheckoutView() {
  const {
    cart,
    cartTotal,
    cartSubtotal,
    cartTax,
    cartShipping,
    couponCode,
    profile,
    placeOrder,
    navigateTo,
    showToast
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1: Shipping States
  const [shippingForm, setShippingForm] = useState({
    name: profile?.name || '',
    email: profile?.phone || '', // fallback
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  });

  // Step 2: Payment States
  const [paymentForm, setPaymentForm] = useState({
    cardName: profile?.name || '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const [processingOrder, setProcessingOrder] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState('');

  // Hydrate shipping address if user has saved addresses
  useEffect(() => {
    if (profile) {
      setShippingForm(prev => ({
        ...prev,
        name: profile.name || prev.name,
        address: profile.address || prev.address
      }));
    }
  }, [profile]);

  // Handle automatic formatting for Card Number (XXXX XXXX XXXX XXXX)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = rawVal.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      setPaymentForm(prev => ({ ...prev, cardNumber: parts.join(' ') }));
    } else {
      setPaymentForm(prev => ({ ...prev, cardNumber: rawVal }));
    }
  };

  // Handle automatic formatting for Expiry (MM/YY)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawVal = e.target.value.replace(/\D/g, '');
    if (rawVal.length > 2) {
      rawVal = `${rawVal.substring(0, 2)}/${rawVal.substring(2, 4)}`;
    }
    setPaymentForm(prev => ({ ...prev, expiry: rawVal }));
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate
    const { name, address, city, state, zip, phone } = shippingForm;
    if (!name || !address || !city || !state || !zip || !phone) {
      showToast('All shipping coordinates are required to progress.', 'error');
      return;
    }
    setStep(2);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { cardName, cardNumber, expiry, cvc } = paymentForm;
    if (!cardName || cardNumber.length < 15 || expiry.length < 5 || cvc.length < 3) {
      showToast('Please insert correct payment details to complete authorization.', 'error');
      return;
    }

    setProcessingOrder(true);
    try {
      const orderId = await placeOrder({
        shippingAddress: {
          name: shippingForm.name,
          street: shippingForm.address,
          city: shippingForm.city,
          state: shippingForm.state,
          zip: shippingForm.zip,
          phone: shippingForm.phone
        },
        paymentDetails: {
          cardholder: cardName,
          last4: cardNumber.substring(cardNumber.length - 4)
        }
      });
      setCreatedOrderId(orderId);
      setStep(3);
    } catch (err) {
      console.error(err);
    } finally {
      setProcessingOrder(false);
    }
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="w-full text-center py-20 bg-zinc-50 dark:bg-zinc-950 min-h-screen flex flex-col items-center justify-center">
        <AlertCircle className="w-16 h-16 text-zinc-400 mb-6" />
        <h3 className="text-xl font-bold mb-2">No Items in Checkout Process</h3>
        <button onClick={() => navigateTo('products')} className="px-6 py-2.5 bg-zinc-950 text-white rounded-xl">Shop Catalog</button>
      </div>
    );
  }

  // Calculated arrival date (3 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);

  return (
    <div className="w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step Header */}
        <div className="flex items-center justify-center gap-2 mb-10 text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
          <span className={step >= 1 ? 'text-zinc-900 dark:text-white font-black' : ''}>1. Shipping</span>
          <ChevronRight className="w-4 h-4" />
          <span className={step >= 2 ? 'text-zinc-900 dark:text-white font-black' : ''}>2. Payment</span>
          <ChevronRight className="w-4 h-4" />
          <span className={step >= 3 ? 'text-zinc-900 dark:text-white font-black' : ''}>3. Summary</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Wizard Form Area */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: SHIPPING ADDRESS */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6"
                >
                  <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                    <Truck className="w-5 h-5 text-zinc-400" />
                    <h2 className="text-xl font-black text-zinc-950 dark:text-white tracking-tight">Delivery Coordinates</h2>
                  </div>

                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold font-mono text-zinc-400 uppercase">Receiver Name</label>
                        <input
                          type="text"
                          required
                          value={shippingForm.name}
                          onChange={(e) => setShippingForm({ ...shippingForm, name: e.target.value })}
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm"
                          placeholder="Eleanor Sterling"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold font-mono text-zinc-400 uppercase">Contact Phone</label>
                        <input
                          type="tel"
                          required
                          value={shippingForm.phone}
                          onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm"
                          placeholder="+1 (555) 019-2831"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold font-mono text-zinc-400 uppercase">Street Address</label>
                      <input
                        type="text"
                        required
                        value={shippingForm.address}
                        onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm"
                        placeholder="742 Luxury Boulevard, Penthouse C"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold font-mono text-zinc-400 uppercase">City</label>
                        <input
                          type="text"
                          required
                          value={shippingForm.city}
                          onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm"
                          placeholder="New York"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold font-mono text-zinc-400 uppercase">State / region</label>
                        <input
                          type="text"
                          required
                          value={shippingForm.state}
                          onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm"
                          placeholder="NY"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold font-mono text-zinc-400 uppercase">Zip / Postcode</label>
                        <input
                          type="text"
                          required
                          value={shippingForm.zip}
                          onChange={(e) => setShippingForm({ ...shippingForm, zip: e.target.value })}
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm"
                          placeholder="10001"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-6 py-4 bg-zinc-950 hover:bg-zinc-900 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-black text-sm rounded-2xl transition-all shadow-md cursor-pointer"
                    >
                      Continue to Payment Authorization
                    </button>
                  </form>
                </motion.div>
              )}

              {/* STEP 2: SECURE CREDIT CARD PROCESSING */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6"
                >
                  <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                    <button onClick={() => setStep(1)} className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-white cursor-pointer mr-2">
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <CreditCard className="w-5 h-5 text-zinc-400" />
                    <h2 className="text-xl font-black text-zinc-950 dark:text-white tracking-tight">Financial Authorization</h2>
                  </div>

                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold font-mono text-zinc-400 uppercase">Cardholder Legal Name</label>
                      <input
                        type="text"
                        required
                        value={paymentForm.cardName}
                        onChange={(e) => setPaymentForm({ ...paymentForm, cardName: e.target.value })}
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm"
                        placeholder="Eleanor Sterling"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold font-mono text-zinc-400 uppercase">Credit Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          maxLength={19}
                          value={paymentForm.cardNumber}
                          onChange={handleCardNumberChange}
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-11 pr-4 py-2.5 text-sm font-mono tracking-widest"
                          placeholder="4111 2222 3333 4444"
                        />
                        <CreditCard className="absolute left-3.5 top-3 w-4 h-4 text-zinc-400" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold font-mono text-zinc-400 uppercase">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          required
                          maxLength={5}
                          value={paymentForm.expiry}
                          onChange={handleExpiryChange}
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm font-mono tracking-widest"
                          placeholder="12/28"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold font-mono text-zinc-400 uppercase">CVC Code</label>
                        <input
                          type="password"
                          required
                          maxLength={3}
                          value={paymentForm.cvc}
                          onChange={(e) => setPaymentForm({ ...paymentForm, cvc: e.target.value.replace(/\D/g, '') })}
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm font-mono tracking-widest"
                          placeholder="•••"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex items-center gap-2.5 text-xs text-zinc-400 font-medium">
                      <Lock className="w-4 h-4 text-zinc-400" />
                      <span>Stripe 256-bit encryption active. Your physical credentials are never logged.</span>
                    </div>

                    <button
                      type="submit"
                      disabled={processingOrder}
                      className="w-full mt-6 py-4 bg-zinc-950 hover:bg-zinc-900 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-black text-sm rounded-2xl transition-all shadow-md cursor-pointer disabled:opacity-50"
                    >
                      {processingOrder ? 'Verifying Merchant Credentials...' : `Authorize and Complete Purchase • $${cartTotal.toFixed(2)}`}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* STEP 3: ORDER COMPLETED SUCCESSFULLY */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl p-8 text-center space-y-6 shadow-md"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle className="w-10 h-10 stroke-[2.5]" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight">Order Executed Successfully!</h2>
                    <p className="text-sm text-zinc-400 max-w-md mx-auto">
                      Thank you for choosing ApexMarket. Your purchase has been authenticated and recorded in Firestore.
                    </p>
                  </div>

                  {/* Order credentials display */}
                  <div className="max-w-md mx-auto bg-zinc-50 dark:bg-zinc-950 p-5 rounded-2xl border border-zinc-200/20 text-left space-y-3 font-medium text-xs">
                    <div className="flex justify-between">
                      <span className="text-zinc-400 font-mono font-bold">ORDER IDENTIFIER:</span>
                      <span className="font-mono font-bold text-zinc-900 dark:text-white">{createdOrderId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400 font-mono font-bold">RECEIVER:</span>
                      <span className="text-zinc-800 dark:text-zinc-200 font-semibold">{shippingForm.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400 font-mono font-bold">DELIVERY ESTIMATE:</span>
                      <span className="text-zinc-800 dark:text-zinc-200 font-semibold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-zinc-400" />
                        {deliveryDate.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-zinc-200/30 font-bold">
                      <span className="text-zinc-400 font-mono">CHARGED TOTAL:</span>
                      <span className="text-sm font-black text-zinc-950 dark:text-white">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="pt-6 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => navigateTo('profile')}
                      className="px-6 py-3 bg-zinc-950 hover:bg-zinc-900 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-xs rounded-xl transition-all cursor-pointer"
                    >
                      Audit Order Timeline
                    </button>
                    <button
                      onClick={() => navigateTo('home')}
                      className="px-6 py-3 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-800 dark:text-white font-bold text-xs rounded-xl transition-all border border-zinc-200/50 dark:border-zinc-800/50 cursor-pointer"
                    >
                      Return to Storefront
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Right Summary details bar (hidden in success state) */}
          {step !== 3 && (
            <div className="lg:col-span-4 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl p-6 shadow-sm h-fit space-y-6">
              
              <h3 className="text-sm font-black text-zinc-950 dark:text-white uppercase tracking-wider pb-3 border-b border-zinc-100 dark:border-zinc-850">Basket Summary</h3>
              
              {/* Product mini list */}
              <div className="divide-y divide-zinc-100 dark:divide-zinc-850 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-3 py-3 items-center">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 object-cover rounded-xl bg-zinc-100" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white truncate">{item.product.name}</h4>
                      <p className="text-[10px] text-zinc-400">{item.quantity} x ${item.product.price}</p>
                    </div>
                    <span className="text-xs font-bold text-zinc-900 dark:text-white">${item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Pricing values */}
              <div className="space-y-3.5 pt-4 border-t border-zinc-100 dark:border-zinc-850 text-xs text-zinc-500 dark:text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-zinc-900 dark:text-white">${cartSubtotal}</span>
                </div>

                {couponCode && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Applied Coupon ({couponCode})</span>
                    <span>-${cartSubtotal - (cartSubtotal - (cartSubtotal * (couponCode === 'APEX20' ? 0.20 : 0.10)))}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Tax (8%)</span>
                  <span className="font-bold text-zinc-900 dark:text-white">${cartTax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Express Shipping</span>
                  <span className="font-bold text-zinc-900 dark:text-white">
                    {cartShipping === 0 ? 'COMPLEMENTARY' : `$${cartShipping}`}
                  </span>
                </div>

                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-850 flex justify-between items-baseline mb-4 text-sm font-bold text-zinc-950 dark:text-white">
                  <span>Amount Charged</span>
                  <span className="text-xl font-black">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
