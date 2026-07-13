import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Award, 
  Globe, 
  Send, 
  ChevronDown, 
  Mail, 
  Phone, 
  MapPin,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// ==========================================
// 1. ABOUT VIEW
// ==========================================
export function AboutView() {
  return (
    <div className="w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest block">THE APEX MANIFESTO</span>
          <h1 className="text-3xl sm:text-5xl font-black text-zinc-950 dark:text-white tracking-tight">Redefining Modern E-Commerce</h1>
          <p className="text-sm sm:text-base leading-relaxed text-zinc-500">
            ApexMarket was founded in 2026 as a luxury engineering playground. Our vision is simple: craft high-fidelity consumer electronics, elite wearables, and masterwork garments, serving them on a secure, frictionless transactional platform.
          </p>
        </div>

        {/* Visual blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl p-8 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-950 dark:text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-zinc-950 dark:text-white">Hardened Privacy</h3>
            <p className="text-xs leading-relaxed text-zinc-400">
              Your structural logs are secured behind Google Firestore access conditions. We operate a Zero-Trust platform to safeguard client data integrity.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl p-8 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-950 dark:text-white">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-zinc-950 dark:text-white">Uncompromising Quality</h3>
            <p className="text-xs leading-relaxed text-zinc-400">
              Every curated item, from Mongolian cashmere to titanium tech, is run through multiple validation protocols before leaving warehouse dispatch.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl p-8 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-950 dark:text-white">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-zinc-950 dark:text-white">Global Distribution</h3>
            <p className="text-xs leading-relaxed text-zinc-400">
              With fulfillment centers strategically located across London, New York, and Tokyo, we provide complimentary air logistics to over 120 countries.
            </p>
          </div>
        </div>

        {/* Big Editorial block */}
        <div className="bg-zinc-950 text-white rounded-3xl p-8 sm:p-12 overflow-hidden relative flex flex-col justify-between min-h-[300px] border border-zinc-850 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10" />
          <img src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=1200&auto=format&fit=crop&q=80" alt="Apex Manifesto" className="absolute inset-0 w-full h-full object-cover opacity-20" />
          
          <div className="relative z-20 space-y-4 max-w-xl">
            <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase">OUR COMMITMENT</span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-none">Designed to Last, Built to Protect</h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              We believe in conscious commerce. By producing limited-run series, we reduce industrial waste and ensure that every customer receives an item of unique value, meticulously logged in the database ledger.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 2. FAQ VIEW
// ==========================================
const FAQ_ITEMS = [
  {
    q: "How fast is express delivery?",
    a: "Orders above $150 qualify for complimentary global air freight. Fulfillment typically processes in 24 hours, and air transport estimates 2-4 business days worldwide."
  },
  {
    q: "Can I edit or cancel my order after authorization?",
    a: "Once credit card authorization completes, your order is instantly dispatched to our fulfillment warehouse queue to maintain high-speed shipments. To modify, reach our priority support line within 1 hour."
  },
  {
    q: "How does the reviews validation system operate?",
    a: "To prevent malicious feedback and protect catalog integrity, only authenticated clients can write reviews. Review databases utilize custom security rules matching the author's credentials."
  },
  {
    q: "What payment platforms do you support?",
    a: "We support major physical cards (Visa, Mastercard, American Express), Google Pay, Apple Pay, and securely encrypted transactions protected by Stripe merchant networks."
  },
  {
    q: "How does return and refund insurance work?",
    a: "We provide a 30-day stress-free return period. Simply access your Order Timeline inside your profile to print a prepaid delivery slip and return items in their original packaging."
  }
];

export function FaqView() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-16">
      <div className="max-w-3xl mx-auto px-4 space-y-12">
        
        <div className="text-center space-y-3">
          <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest block">CUSTOMER CARE</span>
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-950 dark:text-white tracking-tight">Frequently Asked Questions</h1>
          <p className="text-sm text-zinc-500">Instant answers to shipping, credentials, security, and returns.</p>
        </div>

        <div className="space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl p-6 sm:p-8 shadow-sm">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="border-b border-zinc-100 dark:border-zinc-800 last:border-0 pb-4 last:pb-0 pt-4 first:pt-0">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left font-bold text-sm sm:text-base text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors cursor-pointer py-1"
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isOpen ? 'rotate-180 text-zinc-900 dark:text-white' : ''}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pt-2.5">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 3. CONTACT VIEW
// ==========================================
export function ContactView() {
  const { showToast } = useApp();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      showToast('All contact fields are required.', 'error');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      showToast('Support ticket registered! An agent will respond in 2 hours.', 'success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setSubmitting(false);
    }, 1500);
  };

  return (
    <div className="w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest block">24/7 PRIORITY ASSISTANCE</span>
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-950 dark:text-white tracking-tight">Support Desk</h1>
          <p className="text-sm text-zinc-500">Contact our professional customer relations desk regarding logistics, specifications, or security.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-8 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-zinc-950 dark:text-white">Our Head Offices</h3>
            
            <div className="space-y-6 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
              <div className="flex gap-4">
                <MapPin className="w-5 h-5 text-zinc-400 flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-zinc-900 dark:text-white">Apex Market HQ</strong><br />
                  742 Luxury Boulevard, Suite 500<br />
                  New York, NY 10001
                </p>
              </div>

              <div className="flex gap-4">
                <Phone className="w-5 h-5 text-zinc-400 flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-zinc-900 dark:text-white">Customer Support Hotline</strong><br />
                  +1 (555) 019-2831 (Priority clients)<br />
                  +1 (800) APEX-MARKET (General queries)
                </p>
              </div>

              <div className="flex gap-4">
                <Mail className="w-5 h-5 text-zinc-400 flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-zinc-900 dark:text-white">Email Desk</strong><br />
                  support@apexmarket.io<br />
                  press@apexmarket.io
                </p>
              </div>

              <div className="flex gap-4">
                <Clock className="w-5 h-5 text-zinc-400 flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-zinc-900 dark:text-white">Operational Hours</strong><br />
                  24 Hours a day, 7 Days a week
                </p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-zinc-950 dark:text-white mb-6">Dispatch a Written Ticket</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold font-mono text-zinc-400 uppercase">Your Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5"
                    placeholder="Marcus Vance"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold font-mono text-zinc-400 uppercase">Your Email Coordinate</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5"
                    placeholder="marcus@consultant.com"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold font-mono text-zinc-400 uppercase">Subject</label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5"
                  placeholder="Inquiry regarding AeroPhone 15 Pro wireless band specs..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold font-mono text-zinc-400 uppercase">Detailed Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5"
                  placeholder="Type your message text here..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-950 hover:bg-zinc-900 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-xs rounded-xl transition-all cursor-pointer disabled:opacity-50"
              >
                {submitting ? 'Dispatching Ticket...' : 'Dispatch Ticket'}
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
