
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Instagram, Facebook, Twitter, MessageCircle, Send } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormData({ name: '', phone: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="py-20 md:py-32 px-4 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-500/5 blur-[100px] rounded-full -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-heading font-black mb-6 md:mb-8 tracking-tighter">Get in <span className="text-cyan-400">Touch</span></h2>
              <p className="text-slate-400 mb-10 md:mb-12 leading-relaxed text-base md:text-lg font-light">
                Have questions about your order or want a fully custom poster design? 
                Drop us a message and we'll get back to you within 24 hours.
              </p>
            </motion.div>

            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-5"
              >
                <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-cyan-400 shadow-lg border-white/5">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Call or WhatsApp</p>
                  <p className="text-white font-bold text-lg">+91 80152 13825</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-5"
              >
                <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-cyan-400 shadow-lg border-white/5">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Email Us</p>
                  <p className="text-white font-bold text-lg">support@cardsandposters.in</p>
                </div>
              </motion.div>
            </div>

            <div className="mt-12 md:mt-16">
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] mb-6">Social Networks</p>
              <div className="flex flex-wrap items-center gap-4">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.1, y: -5, backgroundColor: 'rgba(34,211,238,0.1)' }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-all border-white/5 shadow-xl"
                  >
                    <Icon size={22} />
                  </motion.a>
                ))}
                <motion.a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  whileHover={{ scale: 1.1, y: -5, backgroundColor: 'rgba(34,197,94,0.1)' }}
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-slate-400 hover:text-green-400 transition-all border-white/5 shadow-xl"
                >
                  <MessageCircle size={22} />
                </motion.a>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-[2.5rem] p-6 md:p-10 border-white/10 shadow-2xl bg-slate-900/40"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 px-5 focus:outline-none focus:border-cyan-400/50 transition-all text-white placeholder:text-slate-800 font-medium"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Mobile Number</label>
                <input
                  required
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 px-5 focus:outline-none focus:border-cyan-400/50 transition-all text-white placeholder:text-slate-800 font-medium"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Your Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we help you?"
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 px-5 focus:outline-none focus:border-cyan-400/50 transition-all resize-none text-white placeholder:text-slate-800 font-medium"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>
              
              <button
                type="submit"
                disabled={sent}
                className={`w-full py-5 rounded-2xl font-black transition-all flex items-center justify-center gap-3 shadow-xl mt-4 ${
                  sent ? 'bg-green-500 text-white' : 'bg-cyan-400 text-slate-950 hover:bg-cyan-300 neon-glow'
                }`}
              >
                {sent ? (
                  <>SUCCESSFULLY SENT!</>
                ) : (
                  <>
                    <Send size={18} />
                    SEND MESSAGE
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
