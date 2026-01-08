
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Eye, ShoppingBag, Filter } from 'lucide-react';
import { CATEGORIES, MOCK_PRODUCTS } from '../constants';
import { Category, Product } from '../types';

interface GalleryProps {
  onAddToCart: (p: Product) => void;
  onViewImage: (imageUrl: string) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onAddToCart, onViewImage }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((p) => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="gallery" className="py-20 md:py-32 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12 md:mb-20 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <h2 className="text-4xl md:text-7xl font-heading font-black tracking-tighter mb-4">
              Premium <span className="text-cyan-400">Catalogue</span>
            </h2>
            <div className="h-1.5 w-16 md:w-24 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full mx-auto" />
          </motion.div>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl font-light leading-relaxed">
            Each design is curated for high-resolution printing, ensuring that every detail pops on your walls.
          </p>
        </div>

        {/* Search & Filters Container */}
        <div className="mb-12 md:mb-16 space-y-8 md:space-y-10 px-4">
          <div className="max-w-xl mx-auto group w-full">
            <div className="relative glass rounded-2xl border-white/5 group-hover:border-cyan-400/30 transition-all shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-cyan-400 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search premium designs..."
                className="w-full bg-transparent py-4 md:py-5 pl-16 pr-6 focus:outline-none text-white placeholder:text-slate-600 font-medium text-sm md:text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="relative">
            <div className="flex items-center gap-3 mb-4 text-slate-500 overflow-x-auto no-scrollbar pb-2">
              <Filter size={14} className="text-cyan-400 flex-shrink-0" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap">Explore Categories</span>
            </div>
            <div className="flex overflow-x-auto pb-4 gap-2 md:gap-3 no-scrollbar mask-fade-edges -mx-4 px-4 scroll-smooth">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-6 md:px-8 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-bold transition-all border ${
                    activeCategory === cat
                      ? 'bg-cyan-400 text-slate-950 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.25)]'
                      : 'glass text-slate-400 hover:text-white border-white/5 hover:border-white/20'
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid System - 2 cols on mobile, 3 on tablet, 5 on desktop */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8 px-2 md:px-0">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                {/* Product Card Visual */}
                <div className="aspect-[2/3] rounded-2xl md:rounded-3xl overflow-hidden glass border-white/5 group-hover:border-cyan-400/40 transition-all relative shadow-xl md:shadow-2xl bg-slate-900">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent md:opacity-60 md:group-hover:opacity-40 transition-opacity" />
                  
                  {/* Action Buttons Overlay - Always visible on small screens for better UX, hover on desktop */}
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-3 md:p-6 md:translate-y-8 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300">
                    <div className="flex gap-2 md:gap-3 w-full">
                      <button
                        onClick={() => onViewImage(product.imageUrl)}
                        className="flex-1 glass rounded-lg md:rounded-xl py-2 md:py-3 flex items-center justify-center text-white hover:bg-white hover:text-slate-950 transition-all backdrop-blur-md"
                        title="Quick View"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => onAddToCart(product)}
                        className="flex-[3] md:flex-[2] bg-cyan-400 text-slate-950 py-2 md:py-3 rounded-lg md:rounded-xl font-black text-[9px] md:text-xs uppercase flex items-center justify-center gap-1 md:gap-2 hover:bg-white transition-all shadow-lg"
                      >
                        <Plus size={14} /> <span className="hidden sm:inline">ADD LIST</span><span className="sm:hidden">ADD</span>
                      </button>
                    </div>
                  </div>

                  <div className="absolute top-3 left-3 md:top-4 md:left-4">
                    <div className="px-2 py-1 md:px-3 md:py-1.5 glass rounded-lg text-[9px] md:text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em] border-cyan-400/20 shadow-xl backdrop-blur-xl">
                      ₹{product.price}
                    </div>
                  </div>
                </div>
                
                {/* Meta Information */}
                <div className="mt-4 md:mt-5 px-1 md:px-2 text-center">
                  <h3 className="text-xs md:text-sm font-bold text-slate-100 mb-0.5 md:mb-1 group-hover:text-cyan-400 transition-colors truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-center gap-1 md:gap-2">
                    <span className="hidden sm:block h-[1px] w-3 bg-white/10" />
                    <p className="text-[9px] md:text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] md:tracking-[0.3em]">
                      {product.category}
                    </p>
                    <span className="hidden sm:block h-[1px] w-3 bg-white/10" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="py-24 md:py-32 text-center"
          >
            <div className="w-16 h-16 md:w-24 md:h-24 glass rounded-full flex items-center justify-center mx-auto mb-6 text-slate-700">
              <ShoppingBag size={32} />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-300 mb-2">No matching designs</h3>
            <p className="text-slate-500 text-sm md:text-base">Try changing your filters or keywords.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
