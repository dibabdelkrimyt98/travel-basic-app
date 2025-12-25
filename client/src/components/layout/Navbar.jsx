import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Plane, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Navbar = () => {
  const { t, changeLanguage, language, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { key: 'nav.destinations', href: '#' },
    { key: 'nav.offers', href: '#' },
    { key: 'nav.about', href: '#' },
    { key: 'nav.contact', href: '#' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-[#0F1724] text-xl z-50">
          <div className="bg-[#0B67FF] p-2 rounded-xl text-white shadow-lg shadow-blue-500/30">
            <Plane size={24} />
          </div>
          <span className={scrolled ? 'text-[#0F1724]' : 'text-[#0F1724] md:text-white'}>TravelSimple</span>
        </div>

        {/* Desktop Links */}
        <div className={`hidden md:flex items-center gap-8 text-[15px] font-medium transition-colors ${scrolled ? 'text-gray-600' : 'text-white/90'}`}>
          {navLinks.map((link) => (
            <a key={link.key} href={link.href} className="hover:text-[#0B67FF] transition-colors relative group">
              {t(link.key)}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0B67FF] transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Lang Switcher */}
          <div className={`flex items-center bg-white/10 backdrop-blur-md rounded-full px-1 py-1 border border-white/20 ${scrolled ? 'bg-gray-100 border-gray-200' : ''}`}>
            {['ar', 'en', 'fr'].map((lang) => (
              <button
                key={lang}
                onClick={() => changeLanguage(lang)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === lang ? 'bg-[#0B67FF] text-white shadow-md' : scrolled ? 'text-gray-500 hover:text-black' : 'text-white/70 hover:text-white'}`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          <button className="bg-[#0B67FF] text-white px-6 py-2.5 rounded-full text-[14px] font-semibold hover:bg-[#0956d6] hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95">
            {t('nav.book')}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden z-50 text-[#0F1724]">
          {isOpen ? <X size={28} /> : <Menu size={28} color={scrolled ? '#0F1724' : 'white'} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link) => (
              <a key={link.key} href={link.href} className="text-2xl font-bold text-[#0F1724]" onClick={() => setIsOpen(false)}>
                {t(link.key)}
              </a>
            ))}
            <div className="flex gap-4 mt-4">
              {['ar', 'en', 'fr'].map((lang) => (
                <button key={lang} onClick={() => changeLanguage(lang)} className={`px-4 py-2 rounded-lg font-bold border ${language === lang ? 'bg-[#0B67FF] text-white border-[#0B67FF]' : 'text-gray-500 border-gray-200'}`}>
                  {lang.toUpperCase()}
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