import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Send, 
  Instagram, 
  Twitter, 
  Facebook, 
  Youtube, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Headphones 
} from 'lucide-react';

export default function Footer() {
  const { navigateTo, setSelectedCategory, showToast } = useApp();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      showToast('Please insert a valid email address.', 'error');
      return;
    }
    showToast(`Subscription successful! Welcome to the inner circle: ${email}`, 'success');
    setEmail('');
  };

  const selectCat = (slug: string) => {
    setSelectedCategory(slug);
    navigateTo('products');
  };

  return (
    <footer className="w-full bg-zinc-950 text-zinc-400 border-t border-zinc-900 pt-16 pb-8 transition-all">
      {/* Brand values / Trust badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-zinc-900 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center text-white flex-shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Free Express Shipping</h4>
            <p className="text-xs text-zinc-500">Comped on orders above $150</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center text-white flex-shrink-0">
            <RotateCcw className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">30-Day Free Returns</h4>
            <p className="text-xs text-zinc-500">Stress-free premium return slip</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center text-white flex-shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">100% Encrypted Payments</h4>
            <p className="text-xs text-zinc-500">Protected by Stripe & Firebase</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center text-white flex-shrink-0">
            <Headphones className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">24/7 Dedicated Support</h4>
            <p className="text-xs text-zinc-500">Instant expert live response</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-black text-white font-sans tracking-tight">
            APEX<span className="font-light text-zinc-500">MARKET</span>
          </h3>
          <p className="text-sm text-zinc-500 max-w-sm">
            ApexMarket is the definitive modern shopping engine, providing meticulously engineered consumer items, high-performance wearables, and luxury garments built to exceed industry standards.
          </p>
          <div className="flex items-center gap-3">
            <a href="#" className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-zinc-850 hover:text-white flex items-center justify-center transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-zinc-850 hover:text-white flex items-center justify-center transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-zinc-850 hover:text-white flex items-center justify-center transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-zinc-850 hover:text-white flex items-center justify-center transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Departments</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <button onClick={() => selectCat('tech')} className="hover:text-white transition-colors cursor-pointer">Smartphones & Tech</button>
            </li>
            <li>
              <button onClick={() => selectCat('audio')} className="hover:text-white transition-colors cursor-pointer">Audio & Wearables</button>
            </li>
            <li>
              <button onClick={() => selectCat('apparel')} className="hover:text-white transition-colors cursor-pointer">Luxury Apparel</button>
            </li>
            <li>
              <button onClick={() => selectCat('home')} className="hover:text-white transition-colors cursor-pointer">Smart Home & Living</button>
            </li>
            <li>
              <button onClick={() => selectCat('fitness')} className="hover:text-white transition-colors cursor-pointer">Fitness & Performance</button>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Company</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors cursor-pointer">About Us</button>
            </li>
            <li>
              <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors cursor-pointer">Contact & Support</button>
            </li>
            <li>
              <button onClick={() => navigateTo('faq')} className="hover:text-white transition-colors cursor-pointer">Frequently Asked Questions</button>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">Corporate Careers</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">Sustainability Code</a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Apex Newsletter</h4>
          <p className="text-xs text-zinc-500">Subscribe for early product launches, private promotions, and seasonal editorial lookbooks.</p>
          <form onSubmit={handleSubscribe} className="relative">
            <input
              type="email"
              placeholder="Your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 text-sm text-white px-4 py-2.5 rounded-xl placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bg-white text-zinc-950 p-1.5 rounded-lg hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Sub-footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
        <div>
          &copy; {new Date().getFullYear()} APEXMARKET Inc. All rights protected. Constructed with extreme security.
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-zinc-400">Privacy Policy</a>
          <a href="#" className="hover:text-zinc-400">Terms of Use</a>
          <a href="#" className="hover:text-zinc-400">Cookie Matrix</a>
        </div>
      </div>
    </footer>
  );
}
