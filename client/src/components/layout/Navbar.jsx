import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Plane, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Navbar = () => {
  const { t, changeLanguage, language, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
      scrolled 
        ? 'bg-[#081121]/90 backdrop-blur-lg border-b border-white/10 py-3 shadow-2xl' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer z-[110]">
          <div className="bg-[#0B67FF] p-2 rounded-xl text-white shadow-[0_0_20px_rgba(11,103,255,0.4)] group-hover:rotate-12 transition-transform duration-300">
            <Plane size={22} fill="currentColor" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white uppercase">
            Travel<span className="text-[#0B67FF]">Simple</span>
          </span>
        </div>

        {/* Links - Desktop */}
        <div className="hidden md:flex items-center gap-10 text-white/70">
          {['destinations', 'offers', 'about'].map((item) => (
            <a 
              key={item} 
              href={`#${item}`} 
              className="text-[12px] font-bold hover:text-white transition-colors uppercase tracking-[0.2em] relative group"
            >
              {t(`nav.${item}`)}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0B67FF] transition-all group-hover:w-full" />
            </a>
          ))}
          
          {/* Enhanced Lang Switcher */}
          <div className="flex bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-sm">
            {['ar', 'en', 'fr'].map((l) => (
              <button 
                key={l}
                onClick={() => changeLanguage(l)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black transition-all duration-300 ${
                  language === l 
                    ? 'bg-[#0B67FF] text-white shadow-[0_0_15px_rgba(11,103,255,0.5)]' 
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-white p-2 hover:bg-white/5 rounded-xl transition-colors z-[110]"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: isRTL ? '100%' : '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? '100%' : '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#081121] z-[100] flex flex-col items-center justify-center gap-10"
          >
            {['destinations', 'offers', 'about'].map((item) => (
              <a 
                key={item} 
                href={`#${item}`} 
                className="text-4xl font-black text-white uppercase tracking-tighter hover:text-[#0B67FF] transition-colors" 
                onClick={() => setIsOpen(false)}
              >
                {t(`nav.${item}`)}
              </a>
            ))}
            <div className="flex gap-4 mt-8">
              {['ar', 'en', 'fr'].map((l) => (
                <button 
                  key={l} 
                  onClick={() => {changeLanguage(l); setIsOpen(false);}}
                  className={`w-12 h-12 rounded-full border font-bold ${
                    language === l ? 'bg-[#0B67FF] border-[#0B67FF] text-white' : 'border-white/10 text-white/40'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;