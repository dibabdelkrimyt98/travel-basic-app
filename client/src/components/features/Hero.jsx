import { motion } from 'framer-motion';
import { Calendar, MapPin, Search } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Hero = ({ onSearch }) => {
  const { t, isRTL } = useLanguage();
  const [destination, setDestination] = useState('');

  return (
    <section className="relative min-h-[600px] w-full flex items-center justify-center overflow-hidden pt-20">
      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-6 mt-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-[64px] font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-lg">
              {t('hero.title')}
            </h1>
            <p className="text-white/90 text-lg md:text-xl mb-12 font-medium drop-shadow-md">
              {t('hero.subtitle')}
            </p>
          </motion.div>

          {/* Glass Search Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2"
          >
            {/* Input 1 */}
            <div className={`flex-1 flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl border border-transparent focus-within:border-[#0B67FF] focus-within:bg-white transition-all ${isRTL ? 'border-l' : 'border-r'} md:border-0`}>
              <MapPin className="text-[#0B67FF]" size={20} />
              <input 
                type="text" 
                placeholder={t('hero.placeholder_where')}
                className="w-full bg-transparent outline-none text-[#0F1724] font-medium placeholder:text-gray-400"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            {/* Input 2 */}
            <div className="flex-1 flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl border border-transparent focus-within:border-[#0B67FF] focus-within:bg-white transition-all">
              <Calendar className="text-[#0B67FF]" size={20} />
              <input 
                type="text" 
                placeholder={t('hero.placeholder_when')}
                className="w-full bg-transparent outline-none text-[#0F1724] font-medium placeholder:text-gray-400"
              />
            </div>

            {/* Button */}
            <button 
              onClick={() => onSearch(destination)}
              className="bg-[#0B67FF] hover:bg-[#0055eb] text-white px-8 py-4 md:py-0 rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-500/30 active:scale-95 flex items-center justify-center gap-2"
            >
              <Search size={20} />
              {t('hero.btn_search')}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;