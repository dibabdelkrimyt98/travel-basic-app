import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, History, MapPin, Search, Star, Trash2, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { clearSearches, getRecentSearches, saveSearch } from '../../data/recentSearches';

const Hero = ({ onSearch }) => {
  const { t, isRTL } = useLanguage();
  const [destination, setDestination] = useState('');
  const [recent, setRecent] = useState([]);
  const [showRecent, setShowRecent] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    setRecent(getRecentSearches());
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowRecent(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query = destination) => {
    if (!query.trim()) return;
    const updated = saveSearch(query);
    setRecent(updated || []);
    setShowRecent(false);
    setDestination(query);
    onSearch(query);
  };

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight * 0.85,
      behavior: 'smooth'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
      
      {/* --- Cinematic Background Layer --- */}
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        <motion.img 
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
          alt="Travel Background"
          initial={{ scale: 1 }}
          animate={{ scale: 1.15 }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#081121]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#081121] via-transparent to-[#081121]/70" /> 
        <div className="absolute inset-0 bg-gradient-to-b from-[#081121]/80 via-transparent to-[#081121]" />
      </div>

      {/* --- Main Content --- */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container mx-auto px-6 pt-32 pb-16 text-center"
      >
        <motion.div variants={itemVariants} className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full mb-8 shadow-lg">
          <div className="flex -space-x-3">
            {[1,2,3].map(i => (
              <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} alt="traveler" className="w-8 h-8 rounded-full border-2 border-[#081121]" />
            ))}
          </div>
          <div className="flex items-center gap-1 text-white text-xs md:text-sm font-medium">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span>{t('hero.badge_text')}</span>
          </div>
        </motion.div>

        <motion.h1 variants={itemVariants} className="max-w-4xl mx-auto text-4xl md:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight">
          {t('hero.title_start')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B67FF] to-[#60a5fa]">{t('hero.title_highlight')}</span>
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-white/70 text-base md:text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
          {t('hero.subtitle')}
        </motion.p>

        <motion.div variants={itemVariants} className="max-w-5xl mx-auto relative z-50 px-2" ref={searchRef}>
          <div className="bg-white/95 backdrop-blur-xl p-3 rounded-[2rem] shadow-2xl border border-white/40 flex flex-col md:flex-row gap-2 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            
            <div className="relative flex-[2] flex items-center px-6 py-4 md:py-2 bg-gray-50 md:bg-transparent rounded-2xl md:rounded-none focus-within:bg-blue-50/30 transition-all group">
              <MapPin className="text-gray-400 group-focus-within:text-[#0B67FF] transition-colors" size={22} />
              <div className={`flex-1 ${isRTL ? 'mr-4' : 'ml-4'} text-start`}>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{t('hero.placeholder_where')}</label>
                <input 
                  type="text" 
                  className="w-full bg-transparent outline-none text-[#0F1724] font-bold text-lg placeholder:text-gray-300"
                  placeholder="Paris, Tokyo..."
                  value={destination}
                  onFocus={() => setShowRecent(true)}
                  onChange={(e) => setDestination(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>

               <AnimatePresence>
                {showRecent && recent.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-[110%] left-0 right-0 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[100]"
                  >
                    <div className="px-5 py-3 flex justify-between items-center border-b border-gray-50 bg-gray-50/50">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <History size={14} /> {t('hero.recent_title')}
                      </span>
                      <button 
                        onClick={() => setRecent(clearSearches())}
                        className="text-[10px] font-bold text-gray-400 hover:text-red-500 flex items-center gap-1 uppercase tracking-wider"
                      >
                        <Trash2 size={12} /> {t('hero.clear')}
                      </button>
                    </div>
                    <div className="max-h-[240px] overflow-y-auto py-2">
                    {recent.map((item, idx) => (
                      <button 
                        key={idx}
                        className="w-full text-start px-5 py-3 hover:bg-blue-50/50 flex items-center gap-4 transition-colors group/item"
                        onClick={() => handleSearch(item)}
                      >
                        <div className="bg-gray-100 p-2 rounded-full text-gray-400 group-hover/item:text-[#0B67FF] transition-colors">
                          <MapPin size={16} />
                        </div>
                        <span className="font-bold text-[#0F1724]">{item}</span>
                      </button>
                    ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex-1 flex items-center px-6 py-4 md:py-2 bg-gray-50 md:bg-transparent rounded-2xl md:rounded-none focus-within:bg-blue-50/30 transition-all group cursor-pointer text-start">
              <Calendar className="text-gray-400 group-focus-within:text-[#0B67FF]" size={22} />
              <div className={`flex-1 ${isRTL ? 'mr-4' : 'ml-4'}`}>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{t('hero.placeholder_when')}</label>
                <div className="font-bold text-[#0F1724] text-lg opacity-30">Add dates</div>
              </div>
            </div>

            <div className="flex-1 flex items-center px-6 py-4 md:py-2 bg-gray-50 md:bg-transparent rounded-2xl md:rounded-none focus-within:bg-blue-50/30 transition-all group cursor-pointer text-start">
              <Users className="text-gray-400 group-focus-within:text-[#0B67FF]" size={22} />
              <div className={`flex-1 ${isRTL ? 'mr-4' : 'ml-4'}`}>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{t('hero.placeholder_travelers')}</label>
                <div className="font-bold text-[#0F1724] text-lg">1 Traveler</div>
              </div>
            </div>

            <div className="p-2">
              <button 
                onClick={() => handleSearch()}
                className="w-full md:w-auto h-full bg-[#0B67FF] hover:bg-[#0055eb] text-white px-10 py-4 md:py-0 rounded-[1.5rem] font-black text-lg transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest"
              >
                <Search size={22} strokeWidth={3} />
                <span className="md:hidden lg:inline">{t('hero.btn_search')}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* --- Animated Scroll Down Indicator --- */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10"
        onClick={scrollToContent}
      >
        <span className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em]">Explore</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1"
        >
          <motion.div className="w-1 h-2 bg-[#0B67FF] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;