import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, ChevronDown, History, MapPin, Minus, Plus, Search, Star, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { destinations } from '../../data/destinations';
import { clearSearches, getRecentSearches, saveSearch } from '../../data/recentSearches';

const Hero = ({ onSearch }) => {
  const { t, isRTL } = useLanguage();
  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState([]);
  const [showRecent, setShowRecent] = useState(false);
  const [showTravelers, setShowTravelers] = useState(false);
  
  // Date & Traveler State
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState('');
  const [counts, setCounts] = useState({ adults: 1, children: 0 });

  const searchRef = useRef(null);

  useEffect(() => {
    setRecent(getRecentSearches());
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowRecent(false);
        setShowTravelers(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const updateCount = (type, val) => {
    setCounts(prev => {
      const newVal = Math.max(type === 'adults' ? 1 : 0, prev[type] + val);
      return { ...prev, [type]: newVal };
    });
  };

  const handleSearch = (selectedQuery = query) => {
    if (!selectedQuery.trim()) return;
    saveSearch(selectedQuery);
    setRecent(getRecentSearches());
    setShowRecent(false);
    onSearch({ destination: selectedQuery, date, travelers: counts });
  };

  const suggestions = destinations.filter(d => 
    d.name.toLowerCase().includes(query.toLowerCase()) && query.length > 0
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Background Layer */}
      <div className="absolute inset-0 z-[-1]">
        <motion.img 
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021"
          animate={{ scale: 1.1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#081121]/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#081121]/50 to-[#081121]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full mb-8 backdrop-blur-md">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          <span className="text-white text-xs font-bold tracking-widest uppercase">{t('hero.badge_text')}</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-7xl font-black text-white mb-6 leading-tight">
          {t('hero.title_start')} <span className="text-[#0B67FF]">{t('hero.title_highlight')}</span>
        </motion.h1>

        {/* --- Search Engine Card --- */}
        <motion.div 
          ref={searchRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-6xl mx-auto mt-12"
        >
          <div className="bg-white rounded-[2.5rem] p-2 md:p-4 shadow-2xl flex flex-col md:flex-row items-stretch gap-2">
            
            {/* Destination Input */}
            <div className="flex-1 relative group border-b md:border-b-0 md:border-r border-gray-100">
              <div className="flex items-center px-6 py-4 h-full">
                <MapPin className="text-[#0B67FF] shrink-0" size={24} />
                <div className={`flex-1 ${isRTL ? 'mr-4 text-right' : 'ml-4 text-left'}`}>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('hero.placeholder_where')}</label>
                  <input 
                    type="text"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setShowRecent(true); }}
                    onFocus={() => setShowRecent(true)}
                    placeholder="Paris, Tokyo..."
                    className="w-full bg-transparent border-none outline-none font-bold text-[#0F1724] text-lg placeholder:text-gray-200"
                  />
                </div>
              </div>

              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {showRecent && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full left-0 right-0 mt-3 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-[100] text-left">
                    {suggestions.length > 0 && (
                      <div className="p-2 border-b border-gray-50">
                        {suggestions.map(s => (
                          <button key={s.id} onClick={() => { setQuery(s.name); setShowRecent(false); }} className="w-full flex items-center gap-3 p-3 hover:bg-blue-50 rounded-2xl transition-all">
                            <MapPin size={16} className="text-blue-400" />
                            <span className="font-bold text-gray-700">{s.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    {recent.length > 0 && (
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          <span className="flex items-center gap-2"><History size={14}/> {t('hero.recent_title')}</span>
                          <button onClick={() => setRecent(clearSearches())} className="hover:text-red-500">{t('hero.clear')}</button>
                        </div>
                        {recent.map((r, i) => (
                          <button key={i} onClick={() => { setQuery(r); setShowRecent(false); }} className="block w-full text-left py-2 font-bold text-gray-600 hover:text-[#0B67FF]">{r}</button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Date Input */}
            <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-100">
              <div className="flex items-center px-6 py-4 h-full relative">
                <Calendar className="text-[#0B67FF] shrink-0" size={24} />
                <div className={`flex-1 ${isRTL ? 'mr-4 text-right' : 'ml-4 text-left'}`}>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('hero.placeholder_when')}</label>
                  <input 
                    type="date"
                    min={today}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-transparent border-none outline-none font-bold text-[#0F1724] text-lg uppercase appearance-none"
                  />
                </div>
              </div>
            </div>

            {/* Travelers Input */}
            <div className="flex-1 relative">
              <div 
                onClick={() => setShowTravelers(!showTravelers)}
                className="flex items-center px-6 py-4 h-full cursor-pointer hover:bg-gray-50 transition-all md:rounded-r-none rounded-2xl"
              >
                <Users className="text-[#0B67FF] shrink-0" size={24} />
                <div className={`flex-1 ${isRTL ? 'mr-4 text-right' : 'ml-4 text-left'}`}>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('hero.placeholder_travelers')}</label>
                  <div className="font-bold text-[#0F1724] text-lg flex items-center justify-between">
                    {counts.adults + counts.children} {t('hero.placeholder_travelers')}
                    <ChevronDown size={16} className={`transition-transform ${showTravelers ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </div>

              {/* Travelers Dropdown */}
              <AnimatePresence>
                {showTravelers && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full right-0 mt-3 w-72 bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 z-[100]">
                    {[
                      { key: 'adults', label: 'Adults', sub: 'Age 13+' },
                      { key: 'children', label: 'Children', sub: 'Age 2-12' }
                    ].map(item => (
                      <div key={item.key} className="flex justify-between items-center mb-6 last:mb-0">
                        <div>
                          <p className="font-black text-gray-800 text-sm">{item.label}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{item.sub}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <button onClick={() => updateCount(item.key, -1)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#0B67FF] hover:text-[#0B67FF] transition-all"><Minus size={14} /></button>
                          <span className="font-bold text-gray-800 w-4 text-center">{counts[item.key]}</span>
                          <button onClick={() => updateCount(item.key, 1)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#0B67FF] hover:text-[#0B67FF] transition-all"><Plus size={14} /></button>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search Button */}
            <button 
              onClick={() => handleSearch()}
              className="bg-[#0B67FF] hover:bg-[#0052D1] text-white px-8 py-5 md:py-0 rounded-3xl md:rounded-[2rem] font-black transition-all flex items-center justify-center gap-3 group shrink-0"
            >
              <Search size={22} strokeWidth={3} className="group-hover:scale-110 transition-transform" />
              <span className="uppercase tracking-[0.2em] text-sm">{t('hero.btn_search')}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;