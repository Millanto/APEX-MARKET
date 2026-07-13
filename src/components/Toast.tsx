import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AnimatePresence, motion } from 'motion/react';

export default function Toast() {
  const { toasts, dismissToast } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            id={`toast-${toast.id}`}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl border bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md shadow-lg border-zinc-200/50 dark:border-zinc-800/50"
          >
            <div className="flex-shrink-0 mt-0.5">
              {toast.type === 'success' && (
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              )}
              {toast.type === 'error' && (
                <AlertCircle className="w-5 h-5 text-rose-500" />
              )}
              {toast.type === 'info' && (
                <Info className="w-5 h-5 text-sky-500" />
              )}
            </div>
            
            <div className="flex-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
              {toast.message}
            </div>

            <button
              onClick={() => dismissToast(toast.id)}
              className="flex-shrink-0 p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
