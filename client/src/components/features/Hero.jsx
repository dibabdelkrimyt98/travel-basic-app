import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { Banknote, Calendar, ChevronDown, History, MapPin, Minus, Plus, Search, Star, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { clearSearches, getRecentSearches, saveSearch } from '../../data/recentSearches';

const Hero = ({ onSearch }) => {
  const { t, isRTL } = useLanguage();
  
  // -- Search States --
  const [query, setQuery] = useState('');
  const [date, setDate] = useState('');
  const [counts, setCounts] = useState({ adults: 1, children: 0 });
  const [budget, setBudget] = useState({ min: 0, max: 5000 }); // Default budget
  
  // -- UI States --
  const [suggestions, setSuggestions] = useState([]); // From API
  const [availableDestinations, setAvailableDestinations] = useState([]); // All from API
  const [recent, setRecent] = useState([]);
  
  // -- Dropdown Toggles --
  const [activeDropdown, setActiveDropdown] = useState(null); // 'location', 'travelers', 'budget'
  const searchRef = useRef(null);
  const today = new Date().toISOString().split('T')[0];

  // 1. Fetch Suggestions & Price Range on Mount
  useEffect(() => {
    setRecent(getRecentSearches());
    
    const fetchMetadata = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/packages/destinations');
        setAvailableDestinations(res.data.destinations);
        // Optionally set max budget based on DB: setBudget(prev => ({ ...prev, max: res.data.priceRange.max }))
      } catch (err) {
        console.error("Failed to load search data", err);
      }
    };
    fetchMetadata();

    // Click Outside Listener
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 2. Filter Suggestions Locally
  useEffect(() => {
    if (query.trim() === '') {
      setSuggestions([]);
    } else {
      const filtered = availableDestinations.filter(d => 
        d.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    }
  }, [query, availableDestinations]);

  // 3. Search Handler
  const handleSearch = (selectedQuery = query) => {
    if (selectedQuery.trim()) saveSearch(selectedQuery);
    
    setActiveDropdown(null);
    setRecent(getRecentSearches());
    
    onSearch({ 
      destination: selectedQuery, 
      date, 
      travelers: counts,
      budget 
    });
  };

  const updateCount = (type, val) => {
    setCounts(prev => ({ ...prev, [type]: Math.max(type === 'adults' ? 1 : 0, prev[type] + val) }));
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 z-[-1]">
        <motion.img 
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070"
          animate={{ scale: 1.1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#081121]/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#081121]/50 to-[#081121]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center pb-20">
        
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-5 py-2.5 rounded-full mb-10 backdrop-blur-md">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          <span className="text-white text-[10px] font-black tracking-[0.3em] uppercase">{t('hero.badge_text')}</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-8xl font-black text-white mb-10 leading-[1.1] tracking-tight">
          {t('hero.title_start')} <br />
          <span className="text-[#0B67FF]">{t('hero.title_highlight')}</span>
        </motion.h1>

        {/* --- Advanced Search Engine --- */}
        <motion.div 
          ref={searchRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-7xl mx-auto mt-24"
        >
          <div className="bg-white rounded-[3rem] p-4 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] flex flex-col xl:flex-row items-stretch gap-2">
            
            {/* 1. Destination Input */}
            <div className="flex-[1.5] relative group border-b xl:border-b-0 xl:border-r border-gray-100">
              <div className="flex items-center px-6 py-4 h-full">
                <MapPin className="text-[#0B67FF] shrink-0" size={24} />
                <div className={`flex-1 ${isRTL ? 'mr-5 text-right' : 'ml-5 text-left'}`}>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t('hero.placeholder_where')}</label>
                  <input 
                    type="text"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setActiveDropdown('location'); }}
                    onFocus={() => setActiveDropdown('location')}
                    placeholder="Where to?"
                    className="w-full bg-transparent border-none outline-none font-bold text-[#0F1724] text-lg placeholder:text-gray-200"
                  />
                </div>
              </div>
              
              <AnimatePresence>
                {activeDropdown === 'location' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-[110%] left-0 right-0 bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden z-[100] text-left p-2">
                    {/* Live Suggestions */}
                    {suggestions.map((s, i) => (
                      <button key={i} onClick={() => { setQuery(s); setActiveDropdown(null); }} className="w-full flex items-center gap-4 p-4 hover:bg-blue-50 rounded-[1.5rem] transition-all">
                        <MapPin size={18} className="text-blue-400" />
                        <span className="font-bold text-gray-700">{s}</span>
                      </button>
                    ))}
                    {/* Recent Searches */}
                    {recent.length > 0 && (
                      <div className="p-4 border-t border-gray-50 mt-2">
                        <div className="flex justify-between items-center mb-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          <span className="flex items-center gap-2"><History size={14}/> Recent</span>
                          <button onClick={() => setRecent(clearSearches())} className="hover:text-red-500">Clear</button>
                        </div>
                        {recent.map((r, i) => (
                          <button key={i} onClick={() => { setQuery(r); setActiveDropdown(null); }} className="block w-full text-left py-2 font-bold text-gray-500 hover:text-[#0B67FF]">{r}</button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. Date Input */}
            <div className="flex-1 border-b xl:border-b-0 xl:border-r border-gray-100">
              <div className="flex items-center px-6 py-4 h-full relative">
                <Calendar className="text-[#0B67FF] shrink-0" size={24} />
                <div className={`flex-1 ${isRTL ? 'mr-5 text-right' : 'ml-5 text-left'}`}>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t('hero.placeholder_when')}</label>
                  <input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-transparent border-none outline-none font-bold text-[#0F1724] text-lg appearance-none" />
                </div>
              </div>
            </div>

            {/* 3. Budget Input (NEW) */}
            <div className="flex-1 relative border-b xl:border-b-0 xl:border-r border-gray-100">
              <div onClick={() => setActiveDropdown(activeDropdown === 'budget' ? null : 'budget')} className="flex items-center px-6 py-4 h-full cursor-pointer hover:bg-gray-50 transition-all rounded-[2rem]">
                <Banknote className="text-[#0B67FF] shrink-0" size={24} />
                <div className={`flex-1 ${isRTL ? 'mr-5 text-right' : 'ml-5 text-left'}`}>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Budget</label>
                  <div className="font-bold text-[#0F1724] text-lg flex items-center justify-between">
                    ${budget.max}
                    <ChevronDown size={16} className={`transition-transform opacity-30 ${activeDropdown === 'budget' ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {activeDropdown === 'budget' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-[110%] left-0 w-full xl:w-80 bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-6 z-[100]">
                     <div className="mb-6">
                        <div className="flex justify-between mb-4">
                            <span className="text-sm font-black text-gray-500">Max Price</span>
                            <span className="text-xl font-black text-[#0B67FF]">${budget.max}</span>
                        </div>
                        <input 
                            type="range" min="100" max="10000" step="100"
                            value={budget.max}
                            onChange={(e) => setBudget({ ...budget, max: e.target.value })}
                            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#0B67FF]"
                        />
                     </div>
                     <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => setBudget({ min: 0, max: 1000 })} className="py-2 rounded-xl bg-gray-50 hover:bg-blue-50 text-xs font-bold text-gray-600 transition-colors">Economic</button>
                        <button onClick={() => setBudget({ min: 0, max: 5000 })} className="py-2 rounded-xl bg-gray-50 hover:bg-blue-50 text-xs font-bold text-gray-600 transition-colors">Luxury</button>
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 4. Travelers Input */}
            <div className="flex-1 relative">
              <div onClick={() => setActiveDropdown(activeDropdown === 'travelers' ? null : 'travelers')} className="flex items-center px-6 py-4 h-full cursor-pointer hover:bg-gray-50 transition-all rounded-[2rem]">
                <Users className="text-[#0B67FF] shrink-0" size={24} />
                <div className={`flex-1 ${isRTL ? 'mr-5 text-right' : 'ml-5 text-left'}`}>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t('hero.placeholder_travelers')}</label>
                  <div className="font-bold text-[#0F1724] text-lg flex items-center justify-between">
                    {counts.adults + counts.children}
                    <ChevronDown size={16} className={`transition-transform opacity-30 ${activeDropdown === 'travelers' ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {activeDropdown === 'travelers' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-[110%] right-0 w-80 bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-8 z-[100]">
                    {[{ key: 'adults', label: 'Adults', sub: '13+' }, { key: 'children', label: 'Children', sub: '2-12' }].map(item => (
                      <div key={item.key} className="flex justify-between items-center mb-6 last:mb-0">
                        <div>
                          <p className="font-black text-gray-800 text-base">{item.label}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Age {item.sub}</p>
                        </div>
                        <div className="flex items-center gap-5">
                          <button onClick={() => updateCount(item.key, -1)} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:border-[#0B67FF] hover:text-[#0B67FF] transition-all"><Minus size={16} /></button>
                          <span className="font-black text-gray-800 w-4 text-center text-lg">{counts[item.key]}</span>
                          <button onClick={() => updateCount(item.key, 1)} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:border-[#0B67FF] hover:text-[#0B67FF] transition-all"><Plus size={16} /></button>
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
              className="bg-[#0B67FF] hover:bg-[#0052D1] text-white px-10 py-5 xl:py-0 rounded-[2.5rem] font-black transition-all flex items-center justify-center gap-3 group shrink-0 shadow-[0_20px_40px_-10px_rgba(11,103,255,0.4)] mt-2 xl:mt-0"
            >
              <Search size={24} strokeWidth={3} className="group-hover:scale-110 transition-transform" />
              <span className="uppercase tracking-[0.2em] text-sm">{t('hero.btn_search')}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;