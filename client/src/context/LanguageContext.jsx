import { createContext, useContext, useEffect, useState } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ar');

  useEffect(() => {
    // 1. Set text direction
    const dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    
    // 2. Adjust font based on language (optional but recommended)
    if (language === 'ar') {
      document.body.style.fontFamily = "'Cairo', sans-serif"; // You need to import Cairo font
    } else {
      document.body.style.fontFamily = "'Inter', sans-serif";
    }
  }, [language]);

  // Nested Key Support (e.g., t('nav.home'))
  const t = (path) => {
    return path.split('.').reduce((obj, key) => obj?.[key], translations[language]) || path;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage: setLanguage, t, isRTL: language === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);