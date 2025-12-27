import axios from 'axios';
import { Clock, Gem, Loader2, ShieldCheck } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import Destinations from '../components/features/Destinations';
import Hero from '../components/features/Hero';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import PackageCard from '../components/ui/PackageCard';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const { t } = useLanguage();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Enhanced Fetch Logic
   * Handles both simple reset calls and complex search objects
   */
  const fetchPackages = useCallback(async (searchParams = null) => {
    setLoading(true);
    try {
      let url = 'http://localhost:5000/api/packages';
      
      // If searchParams is an object (from Hero search), build query string
      if (searchParams && typeof searchParams === 'object') {
        const { destination, date, travelers } = searchParams;
        const params = new URLSearchParams();

        if (destination) params.append('query', destination);
        if (date) params.append('date', date);
        if (travelers) {
          params.append('adults', travelers.adults || 1);
          params.append('children', travelers.children || 0);
        }
        
        url = `http://localhost:5000/api/packages/search?${params.toString()}`;
      } 
      // Handle legacy string query if necessary
      else if (typeof searchParams === 'string' && searchParams.trim() !== '') {
        url = `http://localhost:5000/api/packages/search?query=${searchParams}`;
      }

      const response = await axios.get(url);
      setPackages(response.data);
    } catch (error) {
      console.error("Fetch error:", error);
      setPackages([]); // Clear results on error
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const features = [
    { icon: <Gem size={32} />, title: 'features.f1_title', desc: 'features.f1_desc' },
    { icon: <ShieldCheck size={32} />, title: 'features.f2_title', desc: 'features.f2_desc' },
    { icon: <Clock size={32} />, title: 'features.f3_title', desc: 'features.f3_desc' },
  ];

  return (
    <div className="min-h-screen bg-[#081121] font-sans selection:bg-[#0B67FF] selection:text-white overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section 
          onSearch now receives: { destination: string, date: string, travelers: object }
      */}
      <Hero onSearch={fetchPackages} />

      <main className="max-w-7xl mx-auto px-6 relative">
        
        {/* Features Grid - Floating Glass Effect with Responsive Negative Margin */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-16 md:-mt-24 relative z-30 mb-20 md:mb-32">
          {features.map((f, i) => (
            <div 
              key={i} 
              className="bg-[#0F1724]/90 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/5 shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
            >
              <div className="w-14 h-14 bg-[#0B67FF]/20 rounded-2xl flex items-center justify-center text-[#0B67FF] mb-6 shadow-inner group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight">
                {t(f.title)}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed font-medium">
                {t(f.desc)}
              </p>
            </div>
          ))}
        </div>

        {/* 1. Curated Destinations (Static Data Grid) */}
        <div className="mb-32">
           <Destinations />
        </div>

        {/* 2. Dynamic Offers (API Driven Search Results) */}
        <section id="offers" className="pb-32 scroll-mt-32">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6 text-center md:text-left">
            <div>
              <span className="text-[#0B67FF] font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">
                {t('nav.offers')}
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                {t('home.popular_title')}
              </h2>
            </div>
            
            <button 
              onClick={() => fetchPackages()} 
              className="px-10 py-4 rounded-full border border-white/10 text-white/40 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#0B67FF] hover:text-white hover:border-[#0B67FF] transition-all bg-white/5 shadow-xl active:scale-95"
            >
              {t('home.reset')}
            </button>
          </div>
          
          {loading ? (
            <div className="py-40 flex flex-col items-center justify-center">
              <div className="relative">
                <Loader2 className="animate-spin text-[#0B67FF]" size={60} />
                <div className="absolute inset-0 blur-2xl bg-[#0B67FF]/20 rounded-full"></div>
              </div>
              <p className="mt-6 font-black tracking-[0.3em] uppercase text-xs text-white/20">
                {t('home.loading')}
              </p>
            </div>
          ) : packages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {packages.map((pkg) => (
                <PackageCard key={pkg._id} item={pkg} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-white/5 rounded-[4rem] border-2 border-dashed border-white/5">
              <div className="mb-4 flex justify-center text-white/10">
                <Gem size={48} />
              </div>
              <p className="text-white/30 text-xl font-black uppercase tracking-widest">
                {t('home.no_results')}
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;