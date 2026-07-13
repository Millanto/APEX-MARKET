import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Toast from './components/Toast';
import MobileBottomNav from './components/MobileBottomNav';

// Views
import HomeView from './views/HomeView';
import ProductsView from './views/ProductsView';
import ProductDetailsView from './views/ProductDetailsView';
import CartView from './views/CartView';
import CheckoutView from './views/CheckoutView';
import ProfileView from './views/ProfileView';
import AuthView from './views/AuthView';
import { AboutView, FaqView, ContactView } from './views/StaticViews';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect } from 'react';

function MainAppLayout() {
  const { activeView, darkMode } = useApp();

  // Keep dark-mode DOM class synchronized
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  const renderActiveView = () => {
    switch (activeView) {
      case 'home':
        return <HomeView />;
      case 'products':
        return <ProductsView />;
      case 'product-details':
        return <ProductDetailsView />;
      case 'cart':
        return <CartView />;
      case 'checkout':
        return <CheckoutView />;
      case 'profile':
        return <ProfileView />;
      case 'auth':
        return <AuthView />;
      case 'about':
        return <AboutView />;
      case 'faq':
        return <FaqView />;
      case 'contact':
        return <ContactView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      
      {/* Dynamic Navigation Header */}
      <Header />

      {/* Primary view viewport with transition motion frame */}
      <main className="flex-1 pb-24 lg:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            id="view-transition-wrapper"
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Floating Tab Navigation Bar */}
      <MobileBottomNav />

      {/* Massive Commercial Footer */}
      <Footer />

      {/* High-fidelity Sensory Toast overlays */}
      <Toast />

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppLayout />
    </AppProvider>
  );
}
