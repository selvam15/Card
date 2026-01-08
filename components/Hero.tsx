
import React from 'react';
import { motion } from 'framer-motion';
import { Send, Image as ImageIcon, Sparkles } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

export const Hero: React.FC = () => {
  const handleOrderNow = () => {
    const message = encodeURIComponent("Hi, I want to order customized cards.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-[5%] left-[5%] w-64 h-64 md:w-96 md:h-96 bg-cyan-500/20 blur-[100px] md:blur-[150px] rounded-full" 
      />
      <motion.div 
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute bottom-[10%] right-[5%] w-80 h-80 md:w-[500px] md:h-[500px] bg-indigo-500/20 blur-[120px] md:blur-[180px] rounded-full" 
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center z-10 max-w-5xl"
      >
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-cyan-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] border-cyan-400/20 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
            <Sparkles size={12} className="animate-pulse" />
            Defining Premium Prints
          </span>
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-heading font-extrabold mb-6 md:mb-8 tracking-tighter leading-[1] md:leading-[0.9]">
          Elevate Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-400 to-indigo-400 text-glow">
            Space With Art
          </span>
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-slate-400 text-base sm:text-lg md:text-2xl max-w-3xl mx-auto mb-10 md:mb-12 leading-relaxed font-light px-4">
          Bespoke high-quality posters and customized cards designed to make every wall and every gift truly unforgettable.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center w-full px-4">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOrderNow}
            className="group relative w-full sm:w-auto bg-cyan-400 text-slate-950 font-black py-4 md:py-5 px-8 md:px-12 rounded-2xl flex items-center justify-center gap-3 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            ORDER NOW
          </motion.button>
          
          <motion.a
            href="#gallery"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
            whileTap={{ scale: 0.95 }}
            className="group glass w-full sm:w-auto text-white font-black py-4 md:py-5 px-8 md:px-12 rounded-2xl flex items-center justify-center gap-3 border-white/10 transition-all shadow-xl"
          >
            <ImageIcon size={18} className="text-cyan-400 group-hover:rotate-12 transition-transform" />
            CUSTOM CARDS
            <div className="ml-2 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
          </motion.a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-16 md:mt-24 grid grid-cols-3 gap-4 md:gap-12 max-w-2xl mx-auto border-t border-white/5 pt-8 md:pt-12 px-4"
        >
          {[
            { label: 'Small', price: '₹20' },
            { label: 'Medium', price: '₹50' },
            { label: 'Large', price: '₹100' }
          ].map((item, idx) => (
            <div key={idx} className="group flex flex-col items-center gap-1 md:gap-2">
              <span className="text-slate-500 text-[8px] md:text-[10px] uppercase font-bold tracking-[0.2em] md:tracking-[0.3em] group-hover:text-cyan-400 transition-colors text-center">{item.label}</span>
              <span className="text-xl md:text-3xl font-heading font-black text-white">{item.price}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-cyan-400 to-transparent rounded-full" />
      </motion.div>
    </section>
  );
};
