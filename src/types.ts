export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  discount: number; // percentage (e.g. 15 for 15%)
  oldPrice: number;
  rating: number;
  reviews: number;
  stock: number;
  description: string;
  specifications: Record<string, string>;
  features: string[];
  images: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phone: string;
  photoURL: string;
  createdAt: string;
  lastLogin: string;
}

export interface SavedAddress {
  id: string;
  userId: string;
  label: string; // e.g. "Home", "Office"
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  discount: number;
  image: string;
  quantity: number;
}

export interface Order {
  orderId: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: SavedAddress;
  paymentMethod: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
}

export type ActiveView =
  | 'home'
  | 'products'
  | 'product-details'
  | 'cart'
  | 'checkout'
  | 'profile'
  | 'auth'
  | 'about'
  | 'contact'
  | 'faq'
  | '404';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
