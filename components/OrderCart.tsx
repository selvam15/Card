
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus, Trash2, Send } from 'lucide-react';
import { CartItem, UserProfile } from '../types';
import { WHATSAPP_NUMBER, PRICE_PER_PHOTO } from '../constants';

interface OrderCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, q: number) => void;
  onRemove: (id: string) => void;
  user: UserProfile | null;
}

export const OrderCart: React.FC<OrderCartProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
  user,
}) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleWhatsAppOrder = () => {
    if (!user) {
      alert("Please set up your profile first!");
      return;
    }

    const itemsText = items.map(item => `- ${item.name} (${item.quantity}x) - ${item.imageUrl}`).join('\n');
    const message = `Hi, I want to place an order.

Selected Cards:
${itemsText}

Price: ₹${PRICE_PER_PHOTO} per photo
Total: ₹${total}

Customer Details:
Name: ${user.name}
Department: ${user.department}
Section: ${user.section}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:max-w-md bg-slate-950 border-l border-white/10 z-[70] flex flex-col shadow-2xl"
          >
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-3">
                <ShoppingCart className="text-cyan-400" size={24} />
                <h2 className="text-lg md:text-xl font-heading font-bold">Your Order List</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 no-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-30 px-6">
                  <ShoppingCart size={64} className="mb-6" />
                  <p className="text-lg font-medium">Your list is empty.</p>
                  <p className="text-sm mt-2 leading-relaxed">Browse the gallery and add some premium designs to get started.</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="glass rounded-2xl p-3 md:p-4 flex gap-4 border-white/5 bg-white/[0.02]"
                  >
                    <div className="w-16 h-24 md:w-20 md:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-slate-900">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h3 className="text-sm md:text-base font-bold text-slate-100 line-clamp-1">{item.name}</h3>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{item.category}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3 bg-slate-900/80 rounded-xl p-1 border border-white/5">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:text-cyan-400 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-6 text-center text-xs md:text-sm font-black">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:text-cyan-400 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button onClick={() => onRemove(item.id)} className="p-2 text-slate-500 hover:text-red-400 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-white/5 bg-slate-950 space-y-4">
                <div className="flex items-center justify-between mb-2 px-1">
                  <span className="text-slate-400 font-bold text-sm uppercase tracking-widest">Subtotal</span>
                  <span className="text-2xl font-heading font-black text-white">₹{total}</span>
                </div>
                
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black py-4 md:py-5 rounded-2xl flex items-center justify-center gap-3 transition-all neon-glow"
                >
                  <Send size={20} />
                  ORDER VIA WHATSAPP
                </button>
                
                {!user && (
                  <p className="text-[10px] text-center text-red-400 font-black uppercase tracking-[0.2em] animate-pulse">
                    Complete your profile to order
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
