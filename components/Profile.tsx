
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, X, Save, CheckCircle } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onSave: (u: UserProfile) => void;
}

export const Profile: React.FC<ProfileProps> = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState<UserProfile>(user || {
    name: '',
    department: '',
    section: '',
    orderHistory: []
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 1500);
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
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[80]"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[500px] h-fit max-h-[90vh] overflow-y-auto no-scrollbar glass rounded-[2.5rem] p-6 sm:p-10 z-[90] border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.6)] flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-cyan-400/10 rounded-2xl flex items-center justify-center text-cyan-400 border border-cyan-400/20 shadow-lg">
                  <User size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-black tracking-tight">User Profile</h2>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-0.5">Order Customization</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-slate-500 hover:text-white transition-colors">
                <X size={28} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-1">Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 px-5 focus:outline-none focus:border-cyan-400/50 transition-all text-white placeholder:text-slate-700 font-medium"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-1">Department</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Computer Science"
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 px-5 focus:outline-none focus:border-cyan-400/50 transition-all text-white placeholder:text-slate-700 font-medium"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-1">Section</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. A Section"
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 px-5 focus:outline-none focus:border-cyan-400/50 transition-all text-white placeholder:text-slate-700 font-medium"
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className={`w-full font-black py-4 md:py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl mt-4 ${
                  showSuccess ? 'bg-green-500 text-white' : 'bg-cyan-400 text-slate-950 hover:bg-cyan-300 neon-glow'
                }`}
              >
                {showSuccess ? <CheckCircle size={20} /> : <Save size={20} />}
                {showSuccess ? "PROFILE SAVED!" : "SAVE PROFILE"}
              </button>
            </form>
            
            <div className="mt-10 p-4 rounded-2xl bg-slate-900/50 border border-white/5 text-center">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight leading-relaxed">
                Your details are used exclusively to auto-generate your WhatsApp order message. They are stored locally on this device.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
