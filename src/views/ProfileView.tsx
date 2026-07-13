import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  MapPin, 
  Clock, 
  Heart, 
  Plus, 
  Trash2, 
  Check, 
  LogOut, 
  Settings, 
  ShoppingBag,
  Star,
  Loader,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SavedAddress } from '../types';

export default function ProfileView() {
  const {
    user,
    profile,
    orders,
    wishlist,
    products,
    addresses,
    updatePhoneAndName,
    addAddress,
    deleteAddress,
    logout,
    navigateTo,
    showToast,
    addToCart,
    toggleWishlist
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'orders' | 'wishlist'>('profile');

  // Profile Edit form states
  const [nameInput, setNameInput] = useState(profile?.name || '');
  const [phoneInput, setPhoneInput] = useState(profile?.phone || '');
  const [updatingProfile, setUpdatingProfile] = useState(false);

  // Address edit form states
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    isDefault: false
  });

  useEffect(() => {
    if (profile) {
      setNameInput(profile.name || '');
      setPhoneInput(profile.phone || '');
    }
  }, [profile]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      showToast('Name cannot be empty.', 'error');
      return;
    }
    setUpdatingProfile(true);
    try {
      await updatePhoneAndName(nameInput, phoneInput);
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, street, city, state, zip, phone } = addressForm;
    if (!name || !street || !city || !state || !zip || !phone) {
      showToast('All fields are required to store addresses.', 'error');
      return;
    }

    try {
      await addAddress({
        label: name,
        fullName: name,
        street,
        city,
        state,
        zipCode: zip,
        country: 'United States',
        phone
      });
      setIsAddingAddress(false);
      setAddressForm({
        name: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        isDefault: false
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) {
    return (
      <div className="w-full min-h-screen bg-zinc-50 dark:bg-zinc-950 py-20 flex flex-col items-center justify-center text-center">
        <User className="w-16 h-16 text-zinc-300 dark:text-zinc-700 mb-6" />
        <h2 className="text-xl font-bold mb-2">Access Denied: Authentication Required</h2>
        <p className="text-sm text-zinc-500 max-w-sm mb-6">You must be logged into an active account profile to inspect your private orders, wishlist, and shipping addresses.</p>
        <button
          onClick={() => navigateTo('auth')}
          className="px-6 py-2.5 bg-zinc-950 text-white rounded-xl font-bold text-xs cursor-pointer"
        >
          Proceed to Login Screen
        </button>
      </div>
    );
  }

  // Find wishlist products
  const wishlistProducts = products.filter((p) => wishlist.some((w) => w.productId === p.id));

  return (
    <div className="w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Hero Banner */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <img
              src={profile?.photoURL || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.uid}`}
              alt={profile?.name || 'User'}
              className="w-20 h-20 rounded-full border-2 border-zinc-200 dark:border-zinc-800 object-cover"
              referrerPolicy="no-referrer"
            />
            <div>
              <h1 className="text-2xl font-black text-zinc-950 dark:text-white tracking-tight">{profile?.name || 'Apex Client'}</h1>
              <p className="text-xs text-zinc-400 font-medium font-mono">{user.email}</p>
              <span className="inline-flex mt-2 px-2 py-0.5 bg-zinc-100 dark:bg-zinc-850 rounded-md text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-semibold">Verified Client</span>
            </div>
          </div>

          <button
            onClick={() => { logout(); navigateTo('home'); }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-xs font-bold border border-rose-200/20 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>

        {/* Dynamic subtabs */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Subtabs sidebar list */}
          <aside className="lg:col-span-1">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl p-4 shadow-sm space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left text-sm font-bold transition-all cursor-pointer ${activeTab === 'profile' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50/50'}`}
              >
                <Settings className="w-4 h-4 text-zinc-400" />
                <span>Account Profile</span>
              </button>
              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left text-sm font-bold transition-all cursor-pointer ${activeTab === 'addresses' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50/50'}`}
              >
                <MapPin className="w-4 h-4 text-zinc-400" />
                <span>Saved Addresses</span>
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left text-sm font-bold transition-all cursor-pointer ${activeTab === 'orders' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50/50'}`}
              >
                <Clock className="w-4 h-4 text-zinc-400" />
                <span>Order Timeline</span>
              </button>
              <button
                onClick={() => setActiveTab('wishlist')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left text-sm font-bold transition-all cursor-pointer ${activeTab === 'wishlist' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50/50'}`}
              >
                <Heart className="w-4 h-4 text-zinc-400" />
                <span>Wishlist Bookmark</span>
              </button>
            </div>
          </aside>

          {/* Subtab content details stage */}
          <main className="lg:col-span-3">
            <AnimatePresence mode="wait">
              
              {/* TAB 1: PROFILE EDIT */}
              {activeTab === 'profile' && (
                <motion.div
                  key="tab-profile"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6"
                >
                  <div className="pb-4 border-b border-zinc-100 dark:border-zinc-800">
                    <h2 className="text-xl font-black text-zinc-950 dark:text-white tracking-tight">Account Parameters</h2>
                    <p className="text-xs text-zinc-400 mt-1">Refine your legal details and authentication coordinates.</p>
                  </div>

                  <form onSubmit={handleProfileUpdate} className="space-y-4 max-w-lg">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold font-mono text-zinc-400 uppercase">Customer Full Name</label>
                      <input
                        type="text"
                        required
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm"
                        placeholder="Eleanor Sterling"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold font-mono text-zinc-400 uppercase">Registered Mobile Phone</label>
                      <input
                        type="tel"
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value)}
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm"
                        placeholder="+1 (555) 019-2831"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={updatingProfile}
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-zinc-950 hover:bg-zinc-900 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-xs rounded-xl transition-all cursor-pointer disabled:opacity-50"
                    >
                      {updatingProfile ? 'Synchronizing...' : 'Save Changes'}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* TAB 2: ADDRESSES */}
              {activeTab === 'addresses' && (
                <motion.div
                  key="tab-addresses"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
                    <div>
                      <h2 className="text-xl font-black text-zinc-950 dark:text-white tracking-tight">Saved Address Book</h2>
                      <p className="text-xs text-zinc-400 mt-1">Manage physical delivery coordinates for rapid express checkouts.</p>
                    </div>
                    <button
                      onClick={() => setIsAddingAddress(!isAddingAddress)}
                      className="inline-flex items-center gap-1 px-3 py-2 bg-zinc-950 hover:bg-zinc-900 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      {isAddingAddress ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      <span>{isAddingAddress ? 'Cancel' : 'New Address'}</span>
                    </button>
                  </div>

                  {/* Add Address Form overlay */}
                  {isAddingAddress && (
                    <form onSubmit={handleAddressSubmit} className="space-y-4 p-5 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-200/30">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold font-mono text-zinc-400 uppercase">Label / Contact</label>
                          <input
                            type="text"
                            required
                            placeholder="Home, Office, Headquarters..."
                            value={addressForm.name}
                            onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                            className="w-full text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold font-mono text-zinc-400 uppercase">Contact Phone</label>
                          <input
                            type="text"
                            required
                            placeholder="+1 (555) 012-3456"
                            value={addressForm.phone}
                            onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                            className="w-full text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold font-mono text-zinc-400 uppercase">Street Address</label>
                        <input
                          type="text"
                          required
                          placeholder="Street, Building, Suite..."
                          value={addressForm.street}
                          onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                          className="w-full text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          required
                          placeholder="City"
                          value={addressForm.city}
                          onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                          className="w-full text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2"
                        />
                        <input
                          type="text"
                          required
                          placeholder="State"
                          value={addressForm.state}
                          onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                          className="w-full text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2"
                        />
                        <input
                          type="text"
                          required
                          placeholder="Zip"
                          value={addressForm.zip}
                          onChange={(e) => setAddressForm({ ...addressForm, zip: e.target.value })}
                          className="w-full text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="isDefault"
                          checked={addressForm.isDefault}
                          onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                          className="w-4 h-4 rounded text-zinc-900 accent-zinc-950 focus:ring-0"
                        />
                        <label htmlFor="isDefault" className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Set as primary checkout shipping coordinate</label>
                      </div>

                      <button
                        type="submit"
                        className="px-4 py-2 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-bold text-xs rounded-xl"
                      >
                        Register Address
                      </button>
                    </form>
                  )}

                  {/* Address lists */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {addresses && addresses.length > 0 ? (
                      addresses.map((address) => (
                        <div
                          key={address.id}
                          className={`p-4 rounded-2xl border bg-white dark:bg-zinc-900 relative shadow-sm ${address.label === 'Home' ? 'border-zinc-900 dark:border-white' : 'border-zinc-200/50 dark:border-zinc-800/50'}`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold text-zinc-900 dark:text-white capitalize">{address.label || address.fullName}</span>
                          </div>

                          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3">
                            {address.fullName}<br />
                            {address.street}<br />
                            {address.city}, {address.state} {address.zipCode}<br />
                            <span className="font-mono text-[10px] mt-1 block">Phone: {address.phone}</span>
                          </p>

                          <button
                            onClick={() => deleteAddress(address.id)}
                            className="absolute bottom-4 right-4 p-1 text-zinc-400 hover:text-rose-500 transition-colors cursor-pointer"
                            title="Delete Saved Address"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="sm:col-span-2 text-center py-8 text-zinc-400 text-sm">
                        No shipping address records found. Click "New Address" to build your dispatch credentials.
                      </div>
                    )}
                  </div>

                </motion.div>
              )}

              {/* TAB 3: ORDERS */}
              {activeTab === 'orders' && (
                <motion.div
                  key="tab-orders"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6"
                >
                  <div className="pb-4 border-b border-zinc-100 dark:border-zinc-800">
                    <h2 className="text-xl font-black text-zinc-950 dark:text-white tracking-tight">Order Activity Logs</h2>
                    <p className="text-xs text-zinc-400 mt-1">Audit past purchases, dynamic shipping timelines, and financial receipts.</p>
                  </div>

                  {orders.length > 0 ? (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <div
                          key={order.orderId}
                          className="p-5 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/50 space-y-4"
                        >
                          {/* Top order metrics bar */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-zinc-200/30">
                            <div>
                              <span className="text-[10px] font-mono font-bold text-zinc-400 block uppercase">ORDER ID</span>
                              <span className="text-xs font-mono font-bold text-zinc-900 dark:text-white">{order.orderId}</span>
                            </div>
                            <div>
                              <span className="text-[10px] font-mono font-bold text-zinc-400 block uppercase">DATE INITIATED</span>
                              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{new Date(order.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div>
                              <span className="text-[10px] font-mono font-bold text-zinc-400 block uppercase">STATUS STATE</span>
                              <span className="inline-flex px-2 py-0.5 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 text-[10px] font-black tracking-wider uppercase rounded-md">
                                {order.status}
                              </span>
                            </div>
                            <div>
                              <span className="text-[10px] font-mono font-bold text-zinc-400 block uppercase">TOTAL BILLED</span>
                              <span className="text-sm font-black text-zinc-900 dark:text-white">${order.total.toFixed(2)}</span>
                            </div>
                          </div>

                          {/* Items in order */}
                          <div className="space-y-3">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex gap-3 items-center">
                                <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg bg-white" />
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white truncate">{item.name}</h4>
                                  <p className="text-[10px] text-zinc-400">{item.brand} • Qty: {item.quantity}</p>
                                </div>
                                <span className="text-xs font-bold text-zinc-900 dark:text-white">${item.price * item.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-zinc-400 text-sm">
                      No purchase logs registered. Proceed to checkout to log your first order!
                    </div>
                  )}

                </motion.div>
              )}

              {/* TAB 4: WISHLIST */}
              {activeTab === 'wishlist' && (
                <motion.div
                  key="tab-wishlist"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6"
                >
                  <div className="pb-4 border-b border-zinc-100 dark:border-zinc-800">
                    <h2 className="text-xl font-black text-zinc-950 dark:text-white tracking-tight">Wishlist Bookmark</h2>
                    <p className="text-xs text-zinc-400 mt-1">Audit and purchase your saved luxury choices.</p>
                  </div>

                  {wishlistProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {wishlistProducts.map((p) => (
                        <div
                          key={p.id}
                          className="p-4 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 flex gap-4 items-center bg-zinc-50/20"
                        >
                          <img src={p.images[0]} alt={p.name} className="w-16 h-16 object-cover rounded-xl bg-zinc-100 cursor-pointer" onClick={() => navigateTo('product-details', p.id)} />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-zinc-900 dark:text-white hover:underline cursor-pointer truncate" onClick={() => navigateTo('product-details', p.id)}>{p.name}</h4>
                            <p className="text-[10px] text-zinc-400 font-mono mt-0.5">{p.brand.toUpperCase()}</p>
                            <span className="text-xs font-bold text-zinc-900 dark:text-white block mt-1">${p.price}</span>
                          </div>

                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => addToCart(p, 1)}
                              className="p-2 rounded-xl bg-zinc-950 hover:bg-zinc-900 dark:bg-white dark:hover:bg-zinc-150 text-white dark:text-zinc-950 transition-colors cursor-pointer"
                              title="Add to Cart"
                            >
                              <ShoppingBag className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => toggleWishlist(p.id)}
                              className="p-2 rounded-xl text-zinc-400 hover:text-rose-500 transition-colors cursor-pointer"
                              title="Delete bookmark"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-zinc-400 text-sm">
                      No bookmarks saved. Tick the heart icon on products inside the store to save items here.
                    </div>
                  )}

                </motion.div>
              )}

            </AnimatePresence>
          </main>

        </div>
      </div>
    </div>
  );
}
