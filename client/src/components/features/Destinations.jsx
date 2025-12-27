import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { destinationCategories, destinations } from '../../data/destinations';
import DestinationCard from '../common/DestinationCard';

const Destinations = () => {
  const [activeTab, setActiveTab] = useState('All');
  const { t, isRTL } = useLanguage();

  const filtered = activeTab === 'All' 
    ? destinations 
    : destinations.filter(d => d.category === activeTab);

  return (
    <section id="destinations" className="py-24 bg-[#081121] px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className={`text-center mb-16 ${isRTL ? 'rtl' : 'ltr'}`}>
          <motion.span 
            initial={{ opacity: 0, tracking: "0.2em" }}
            whileInView={{ opacity: 1, tracking: "0.5em" }}
            transition={{ duration: 1 }}
            className="text-[#0B67FF] text-[10px] font-black uppercase block mb-4"
          >
            {t('destinations.sub_title')}
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white"
          >
            {t('destinations.main_title')}{" "}
            <span className="text-white/20">{t('destinations.highlight_title')}</span>
          </motion.h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {destinationCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                activeTab === cat 
                ? 'bg-[#0B67FF] border-[#0B67FF] text-white shadow-[0_10px_20px_rgba(11,103,255,0.3)] scale-105' 
                : 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:bg-white/10'
              }`}
            >
              {/* Maps "All" to "destinations.categories.all", etc. */}
              {t(`destinations.categories.${cat.toLowerCase()}`)}
            </button>
          ))}
        </div>

        {/* Grid Container */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filtered.map((item) => (
              <DestinationCard 
                key={item.id} 
                item={item} 
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results Fallback */}
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 border border-dashed border-white/10 rounded-[3rem]"
            >
              <p className="text-white/30 font-bold uppercase tracking-widest text-sm">
                {t('home.no_results')}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Destinations;