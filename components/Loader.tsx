
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Loader: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020617]"
        >
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 flex items-center justify-center">
              {/* Outer Pulsing Glow */}
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full"
              />
              
              {/* Spinning Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-t-2 border-r-2 border-cyan-400/30 rounded-full"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 glass w-20 h-28 rounded-2xl flex flex-col items-center justify-center border-cyan-400/40 shadow-2xl"
              >
                <div className="font-heading font-black text-3xl text-white tracking-tighter">C</div>
                <div className="w-8 h-[2px] bg-cyan-400 my-1 shadow-[0_0_10px_rgba(34,211,238,1)]" />
                <div className="font-heading font-black text-3xl text-cyan-400 tracking-tighter">P</div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 180 }}
              transition={{ duration: 1.5, ease: "circIn", delay: 0.2 }}
              className="h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-12"
            />
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-slate-500 font-black tracking-[0.4em] text-[10px] uppercase"
            >
              Excellence in Print
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
