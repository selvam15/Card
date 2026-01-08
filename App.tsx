
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { OrderCart } from './components/OrderCart';
import { Profile } from './components/Profile';
import { Contact } from './components/Contact';
import { Loader } from './components/Loader';
import { useAppStore } from './store/useStore';
import { X } from 'lucide-react';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  
  const { 
    cart, addToCart, removeFromCart, updateQuantity, 
    user, saveUser 
  } = useAppStore();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative selection:bg-cyan-400 selection:text-slate-950">
      <Loader isLoading={isLoading} />
      
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Navbar 
            onCartClick={() => setIsCartOpen(true)} 
            onProfileClick={() => setIsProfileOpen(true)}
            cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
          />

          <main>
            <Hero />
            <Gallery 
              onAddToCart={addToCart} 
              onViewImage={setLightboxImage} 
            />
            <Contact />
          </main>

          <footer className="py-12 border-t border-white/5 text-center text-slate-500 text-sm">
            <div className="max-w-7xl mx-auto px-4">
              <div className="font-heading font-extrabold text-xl tracking-tighter text-white mb-4">
                CARDS<span className="text-cyan-400">POSTERS</span>
              </div>
              <p>© 2024 Customized Cards & Posters. All rights reserved.</p>
              <p className="mt-2 text-[10px] tracking-widest uppercase font-bold opacity-30">Premium Prints • Fast Delivery • Custom Art</p>
            </div>
          </footer>

          <OrderCart 
            isOpen={isCartOpen} 
            onClose={() => setIsCartOpen(false)}
            items={cart}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
            user={user}
          />

          <Profile 
            isOpen={isProfileOpen} 
            onClose={() => setIsProfileOpen(false)} 
            user={user}
            onSave={saveUser}
          />

          {/* Lightbox */}
          <AnimatePresence>
            {lightboxImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl"
                onClick={() => setLightboxImage(null)}
              >
                <button className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors">
                  <X size={32} />
                </button>
                <motion.img
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  src={lightboxImage}
                  className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default App;
