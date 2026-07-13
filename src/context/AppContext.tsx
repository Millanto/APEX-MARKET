import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  auth, 
  db, 
  googleProvider, 
  handleFirestoreError, 
  OperationType 
} from '../firebase';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  sendPasswordResetEmail,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  onSnapshot,
  writeBatch
} from 'firebase/firestore';
import { 
  Product, 
  Category, 
  Order, 
  UserProfile, 
  SavedAddress, 
  Review, 
  CartItem, 
  WishlistItem, 
  ActiveView, 
  ToastMessage 
} from '../types';
import { PRODUCTS, CATEGORIES } from '../data/products';

interface AppContextType {
  // Routing & Navigation
  activeView: ActiveView;
  navigateTo: (view: ActiveView, productId?: string | null) => void;
  selectedProductId: string | null;

  // Authentication State
  user: FirebaseUser | null;
  profile: UserProfile | null;
  authLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePhoneAndName: (name: string, phone: string) => Promise<void>;

  // Products & Seed System
  products: Product[];
  categories: Category[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  selectedBrand: string | null;
  setSelectedBrand: (brand: string | null) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  getFilteredProducts: () => Product[];

  // Shopping Cart (Local Storage & Synced)
  cart: CartItem[];
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  couponCode: string;
  setCouponCode: (code: string) => void;
  discountAmount: number;
  applyCoupon: (code: string) => boolean;
  cartSubtotal: number;
  cartTax: number;
  cartShipping: number;
  cartTotal: number;

  // Wishlist State (Firestore)
  wishlist: WishlistItem[];
  toggleWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;

  // Addresses State (Firestore)
  addresses: SavedAddress[];
  addAddress: (address: Omit<SavedAddress, 'id' | 'userId'>) => Promise<void>;
  updateAddress: (id: string, address: Omit<SavedAddress, 'id' | 'userId'>) => Promise<void>;
  deleteAddress: (id: string) => Promise<void>;

  // Orders State (Firestore)
  orders: Order[];
  placeOrder: (shippingAddress: any, paymentMethod: string) => Promise<string>;

  // Reviews System
  reviews: Review[];
  fetchProductReviews: (productId: string) => Promise<Review[]>;
  submitReview: (productId: string, rating: number, comment: string) => Promise<void>;
  deleteReview: (reviewId: string) => Promise<void>;

  // Toast System
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  dismissToast: (id: string) => void;

  // Theme Settings
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Views
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Auth
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Products
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('featured');

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('apex_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  // Database Syncs
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  // Theme & Toasts
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('apex_dark_mode');
    return saved === 'true';
  });
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Show Toast Helper
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Persist theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('apex_dark_mode', String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Persist cart
  useEffect(() => {
    localStorage.setItem('apex_cart', JSON.stringify(cart));
  }, [cart]);

  // Navigate function
  const navigateTo = (view: ActiveView, productId?: string | null) => {
    setActiveView(view);
    if (productId !== undefined) {
      setSelectedProductId(productId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth State Listener
  useEffect(() => {
    let unsubscribeWishlist: (() => void) | null = null;
    let unsubscribeAddresses: (() => void) | null = null;
    let unsubscribeOrders: (() => void) | null = null;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      // Clean up previous listeners first to avoid memory leaks and permissions errors
      if (unsubscribeWishlist) {
        unsubscribeWishlist();
        unsubscribeWishlist = null;
      }
      if (unsubscribeAddresses) {
        unsubscribeAddresses();
        unsubscribeAddresses = null;
      }
      if (unsubscribeOrders) {
        unsubscribeOrders();
        unsubscribeOrders = null;
      }

      setUser(currentUser);
      if (currentUser) {
        // Fetch or create user profile document
        const profileRef = doc(db, 'users', currentUser.uid);
        try {
          const profileSnap = await getDoc(profileRef);
          if (profileSnap.exists()) {
            setProfile(profileSnap.data() as UserProfile);
          } else {
            // First time profile seed
            const newProfile: UserProfile = {
              uid: currentUser.uid,
              name: currentUser.displayName || currentUser.email?.split('@')[0] || 'Premium Shopper',
              email: currentUser.email || '',
              phone: currentUser.phoneNumber || '',
              photoURL: currentUser.photoURL || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${currentUser.uid}`,
              createdAt: new Date().toISOString(),
              lastLogin: new Date().toISOString()
            };
            await setDoc(profileRef, newProfile);
            setProfile(newProfile);
          }
        } catch (err) {
          console.error("Failed to query user profile:", err);
        }

        // Setup real-time listeners for User specific collections
        const wishlistQuery = query(collection(db, 'wishlist'), where('userId', '==', currentUser.uid));
        unsubscribeWishlist = onSnapshot(wishlistQuery, (snap) => {
          const items: WishlistItem[] = [];
          snap.forEach((d) => items.push(d.data() as WishlistItem));
          setWishlist(items);
        }, (error) => {
          console.error("Wishlist sync fail:", error);
        });

        const addressQuery = query(collection(db, 'addresses'), where('userId', '==', currentUser.uid));
        unsubscribeAddresses = onSnapshot(addressQuery, (snap) => {
          const items: SavedAddress[] = [];
          snap.forEach((d) => items.push(d.data() as SavedAddress));
          setAddresses(items);
        }, (error) => {
          console.error("Addresses sync fail:", error);
        });

        const orderQuery = query(collection(db, 'orders'), where('userId', '==', currentUser.uid));
        unsubscribeOrders = onSnapshot(orderQuery, (snap) => {
          const items: Order[] = [];
          snap.forEach((d) => items.push(d.data() as Order));
          // Sort orders by date descending
          items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setOrders(items);
        }, (error) => {
          console.error("Orders sync fail:", error);
        });
      } else {
        setProfile(null);
        setWishlist([]);
        setAddresses([]);
        setOrders([]);
      }
      setAuthLoading(false);
    });

    return () => {
      unsubscribe();
      if (unsubscribeWishlist) unsubscribeWishlist();
      if (unsubscribeAddresses) unsubscribeAddresses();
      if (unsubscribeOrders) unsubscribeOrders();
    };
  }, []);

  // Google Login Auth
  const loginWithGoogle = async () => {
    try {
      setAuthLoading(true);
      await signInWithPopup(auth, googleProvider);
      showToast('Successfully authenticated with Google!', 'success');
      navigateTo('home');
    } catch (err: any) {
      showToast(err.message || 'Failed Google authentication', 'error');
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  // Email login
  const loginWithEmail = async (email: string, pass: string) => {
    try {
      setAuthLoading(true);
      await signInWithEmailAndPassword(auth, email, pass);
      showToast('Welcome back to ApexMarket!', 'success');
      navigateTo('home');
    } catch (err: any) {
      showToast(err.message || 'Authentication failed', 'error');
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  // Email Register
  const registerWithEmail = async (name: string, email: string, pass: string) => {
    try {
      setAuthLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(res.user, { displayName: name });
      
      const newProfile: UserProfile = {
        uid: res.user.uid,
        name,
        email,
        phone: '',
        photoURL: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${res.user.uid}`,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      await setDoc(doc(db, 'users', res.user.uid), newProfile);
      
      // Sign out immediately to prevent auto-login
      await signOut(auth);
      setProfile(null);
      setUser(null);
      
      showToast('Registration complete! Please sign in with your credentials.', 'success');
      return true;
    } catch (err: any) {
      showToast(err.message || 'Registration failed', 'error');
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      showToast('Successfully logged out.', 'info');
      navigateTo('home');
    } catch (err: any) {
      showToast(err.message || 'Logout failed', 'error');
    }
  };

  // Password recovery
  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      showToast('Recovery email dispatched!', 'info');
    } catch (err: any) {
      showToast(err.message || 'Reset dispatch failed', 'error');
      throw err;
    }
  };

  // Update profile
  const updatePhoneAndName = async (name: string, phone: string) => {
    if (!user) return;
    try {
      const profileRef = doc(db, 'users', user.uid);
      const updated = {
        ...profile,
        name,
        phone,
        lastLogin: new Date().toISOString()
      } as UserProfile;
      await setDoc(profileRef, updated, { merge: true });
      setProfile(updated);
      showToast('Profile updated successfully!', 'success');
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  // Product Filtering Logic
  const getFilteredProducts = (): Product[] => {
    let result = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (selectedBrand) {
      result = result.filter((p) => p.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    // Filter price
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Filter rating
    result = result.filter((p) => p.rating >= minRating);

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'discount') {
      result.sort((a, b) => b.discount - a.discount);
    }

    return result;
  };

  // Cart Functions
  const addToCart = (product: Product, qty: number = 1) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id);
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += qty;
        showToast(`Added ${qty} more ${product.name} to cart.`, 'success');
        return next;
      }
      showToast(`${product.name} added to shopping cart!`, 'success');
      return [...prev, { product, quantity: qty }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const match = prev.find((item) => item.product.id === productId);
      if (match) {
        showToast(`${match.product.name} removed from cart.`, 'info');
      }
      return prev.filter((item) => item.product.id !== productId);
    });
  };

  const updateCartQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Coupon Engine
  const applyCoupon = (code: string): boolean => {
    const formatted = code.trim().toUpperCase();
    if (formatted === 'APEX20') {
      setCouponCode(formatted);
      setDiscountAmount(0.20); // 20% discount
      showToast('APEX20 Promo Applied: 20% Off!', 'success');
      return true;
    } else if (formatted === 'WELCOME50') {
      setCouponCode(formatted);
      setDiscountAmount(0.10); // 10% discount
      showToast('WELCOME50 Promo Applied: 10% Off!', 'success');
      return true;
    }
    showToast('Invalid promotion code.', 'error');
    return false;
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((total, item) => {
    const activePrice = item.product.price;
    return total + activePrice * item.quantity;
  }, 0);

  const cartDiscount = cartSubtotal * discountAmount;
  const cartTax = (cartSubtotal - cartDiscount) * 0.08; // 8% sales tax
  const cartShipping = cartSubtotal > 150 ? 0 : cart.length > 0 ? 15 : 0; // free shipping over $150
  const cartTotal = cartSubtotal - cartDiscount + cartTax + cartShipping;

  // Wishlist Functions
  const toggleWishlist = async (productId: string) => {
    if (!user) {
      showToast('Please login to save favorites!', 'info');
      navigateTo('auth');
      return;
    }

    const existingIdx = wishlist.findIndex((w) => w.productId === productId);
    if (existingIdx > -1) {
      const match = wishlist[existingIdx];
      try {
        await deleteDoc(doc(db, 'wishlist', match.id));
        showToast('Removed from favorites', 'info');
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `wishlist/${match.id}`);
      }
    } else {
      const id = Math.random().toString(36).substring(2, 12);
      const newItem: WishlistItem = {
        id,
        userId: user.uid,
        productId,
        createdAt: new Date().toISOString()
      };
      try {
        await setDoc(doc(db, 'wishlist', id), newItem);
        showToast('Saved to Wishlist!', 'success');
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, `wishlist/${id}`);
      }
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((w) => w.productId === productId);
  };

  // Address Functions
  const addAddress = async (addr: Omit<SavedAddress, 'id' | 'userId'>) => {
    if (!user) return;
    const id = Math.random().toString(36).substring(2, 12);
    const newAddr: SavedAddress = {
      ...addr,
      id,
      userId: user.uid
    };
    try {
      await setDoc(doc(db, 'addresses', id), newAddr);
      showToast('Address added successfully!', 'success');
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `addresses/${id}`);
    }
  };

  const updateAddress = async (id: string, addr: Omit<SavedAddress, 'id' | 'userId'>) => {
    if (!user) return;
    try {
      const updated: SavedAddress = {
        ...addr,
        id,
        userId: user.uid
      };
      await setDoc(doc(db, 'addresses', id), updated);
      showToast('Address updated successfully!', 'success');
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `addresses/${id}`);
    }
  };

  const deleteAddress = async (id: string) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, 'addresses', id));
      showToast('Address deleted.', 'info');
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `addresses/${id}`);
    }
  };

  // Placing Order
  const placeOrder = async (shippingAddressInput: any, paymentMethod: string): Promise<string> => {
    if (!user) {
      showToast('Authentication required to checkout!', 'error');
      throw new Error('Authentication required');
    }
    if (cart.length === 0) {
      showToast('Cart is empty.', 'error');
      throw new Error('Cart is empty');
    }

    const orderId = 'APX-' + Math.floor(100000 + Math.random() * 900000);
    const orderItems = cart.map((item) => ({
      id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      discount: item.product.discount,
      image: item.product.images[0],
      quantity: item.quantity
    }));

    const shippingAddress: SavedAddress = {
      id: Math.random().toString(36).substring(2, 10),
      userId: user.uid,
      label: shippingAddressInput.name || 'Recipient',
      fullName: shippingAddressInput.name || '',
      street: shippingAddressInput.street || '',
      city: shippingAddressInput.city || '',
      state: shippingAddressInput.state || '',
      zipCode: shippingAddressInput.zip || shippingAddressInput.zipCode || '',
      country: shippingAddressInput.country || 'United States',
      phone: shippingAddressInput.phone || ''
    };

    const newOrder: Order = {
      orderId,
      userId: user.uid,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      subtotal: cartSubtotal,
      tax: cartTax,
      shipping: cartShipping,
      total: cartTotal,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, 'orders', orderId), newOrder);
      
      // Clear local states
      clearCart();
      setCouponCode('');
      setDiscountAmount(0);

      showToast(`Order Placed! Thank you for choosing ApexMarket. ID: ${orderId}`, 'success');
      return orderId;
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `orders/${orderId}`);
      throw err;
    }
  };

  // Review System
  const fetchProductReviews = async (productId: string): Promise<Review[]> => {
    try {
      const q = query(collection(db, 'reviews'), where('productId', '==', productId));
      const snap = await getDocs(q);
      const items: Review[] = [];
      snap.forEach((d) => items.push(d.data() as Review));
      // Sort reviews newest first
      items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return items;
    } catch (err) {
      console.error('Failed to load reviews:', err);
      return [];
    }
  };

  const submitReview = async (productId: string, rating: number, comment: string) => {
    if (!user || !profile) {
      showToast('Please sign in to write reviews.', 'error');
      return;
    }

    const id = Math.random().toString(36).substring(2, 12);
    const newReview: Review = {
      id,
      userId: user.uid,
      userName: profile.name,
      userAvatar: profile.photoURL,
      productId,
      rating,
      comment,
      createdAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, 'reviews', id), newReview);
      
      // Update local product reviews count/rating visually for responsiveness
      setProducts((prev) => 
        prev.map((p) => {
          if (p.id === productId) {
            const nextCount = p.reviews + 1;
            const nextRating = parseFloat(((p.rating * p.reviews + rating) / nextCount).toFixed(1));
            return {
              ...p,
              reviews: nextCount,
              rating: nextRating
            };
          }
          return p;
        })
      );

      showToast('Review submitted successfully!', 'success');
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `reviews/${id}`);
    }
  };

  const deleteReview = async (reviewId: string) => {
    try {
      await deleteDoc(doc(db, 'reviews', reviewId));
      showToast('Review deleted.', 'info');
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `reviews/${reviewId}`);
    }
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        navigateTo,
        selectedProductId,
        
        user,
        profile,
        authLoading,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        logout,
        resetPassword,
        updatePhoneAndName,

        products,
        categories: CATEGORIES,
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
        getFilteredProducts,

        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        couponCode,
        setCouponCode,
        discountAmount,
        applyCoupon,
        cartSubtotal,
        cartTax,
        cartShipping,
        cartTotal,

        wishlist,
        toggleWishlist,
        isInWishlist,

        addresses,
        addAddress,
        updateAddress,
        deleteAddress,

        orders,
        placeOrder,

        reviews,
        fetchProductReviews,
        submitReview,
        deleteReview,

        toasts,
        showToast,
        dismissToast,

        darkMode,
        toggleDarkMode
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used inside an AppProvider');
  }
  return context;
}
