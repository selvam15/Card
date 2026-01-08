
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, User, Hexagon, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onCartClick: () => void;
  onProfileClick: () => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onCartClick, onProfileClick, cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Catalogue', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const linkVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${scrolled ? 'py-3 md:py-4' : 'py-6 md:py-8'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className={`glass rounded-[2rem] px-4 md:px-8 py-3 md:py-4 flex items-center justify-between transition-all duration-500 border-white/10 shadow-2xl ${scrolled ? 'bg-slate-950/60' : 'bg-slate-950/20'}`}>
          {/* Logo Section */}
          <div 
            className="flex items-center gap-2 md:gap-3 group cursor-pointer" 
            onClick={() => {
              window.scrollTo({top: 0, behavior: 'smooth'});
              setIsOpen(false);
            }}
          >
            <div className="relative flex-shrink-0">
              <Hexagon size={scrolled ? 28 : 34} className="text-cyan-400 fill-cyan-400/10 group-hover:rotate-90 transition-transform duration-700" />
              <span className="absolute inset-0 flex items-center justify-center font-black text-[10px] md:text-xs text-white">CP</span>
            </div>
            <span className="font-heading font-black text-lg md:text-2xl tracking-tighter text-white uppercase select-none">
              <span className="hidden xs:inline">CARDS</span>
              <span className="xs:hidden">C</span>
              <span className="text-cyan-400 opacity-80">
                <span className="hidden xs:inline">POSTERS</span>
                <span className="xs:hidden">P</span>
              </span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="relative text-slate-400 hover:text-white transition-colors font-bold text-xs uppercase tracking-[0.25em] group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 md:gap-5">
            <motion.button 
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.05)' }}
              whileTap={{ scale: 0.95 }}
              onClick={onProfileClick} 
              className="p-2 md:p-3 glass rounded-xl md:rounded-2xl transition-colors text-slate-300 hover:text-cyan-400"
              aria-label="Profile"
            >
              <User size={18} />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.05)' }}
              whileTap={{ scale: 0.95 }}
              onClick={onCartClick} 
              className="p-2 md:p-3 glass rounded-xl md:rounded-2xl transition-colors text-slate-300 hover:text-cyan-400 relative"
              aria-label="Cart"
            >
              <ShoppingCart size={18} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-cyan-400 text-slate-950 text-[9px] md:text-[10px] font-black w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.5)] border border-slate-950/20"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden p-2 text-slate-300 hover:text-cyan-400 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md md:hidden"
            />
            
            {/* Menu Panel */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden absolute top-[calc(100%+0.5rem)] left-4 right-4 glass rounded-3xl p-6 flex flex-col gap-2 shadow-[0_30px_60px_rgba(0,0,0,0.5)] border-white/10"
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  variants={linkVariants}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between text-slate-300 hover:text-cyan-400 font-black text-xl uppercase tracking-tighter transition-all px-4 py-4 rounded-2xl hover:bg-white/5 group"
                >
                  {link.name}
                  <ChevronRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 transition-transform" />
                </motion.a>
              ))}
              
              <motion.div 
                variants={linkVariants}
                className="mt-4 pt-4 border-t border-white/5 px-4 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Contact us</span>
                  <span className="text-cyan-400 text-xs font-bold">+91 80152 13825</span>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};
