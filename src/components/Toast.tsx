import React from 'react';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-300 font-sans">
      <div className="bg-neutral-900 border-2 border-red-600 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md">
        <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-white shrink-0 shadow-md">
          <ShoppingBag className="w-4 h-4" />
        </div>
        <div className="text-xs font-black uppercase tracking-wider text-white">
          {message}
        </div>
        <button
          onClick={onClose}
          aria-label="Dismiss toast"
          className="text-white/40 hover:text-white p-1 ml-1 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
