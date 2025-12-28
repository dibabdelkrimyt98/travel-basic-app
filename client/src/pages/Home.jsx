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

  // --- SMART SEARCH FETCH LOGIC ---
  const fetchPackages = useCallback(async (searchParams = null, signal = null) => {
    setLoading(true);
    try {
      let url = 'http://localhost:5000/api/packages';
      
      if (searchParams && typeof searchParams === 'object') {
        const { destination, date, travelers, budget } = searchParams;
        const params = new URLSearchParams();

        // 1. Destination
        if (destination) params.append('query', destination);
        
        // 2. Date
        if (date) params.append('date', date);
        
        // 3. Travelers
        if (travelers) {
          const totalPeople = (travelers.adults || 0) + (travelers.children || 0);
          if (totalPeople > 0) {
            params.append('adults', travelers.adults || 1);
            params.append('children', travelers.children || 0);
          }
        }

        // 4. Budget (New)
        if (budget) {
          if (budget.min !== undefined) params.append('minPrice', budget.min);
          if (budget.max !== undefined) params.append('maxPrice', budget.max);
        }

        url = `http://localhost:5000/api/packages/search?${params.toString()}`;
      }

      const response = await axios.get(url, { 
        signal: signal,
        timeout: 8000 
      });
      
      setPackages(response.data);
    } catch (error) {
      if (axios.isCancel(error)) return;
      console.error("Fetch error:", error);
      setPackages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial Load
  useEffect(() => {
    const controller = new AbortController();
    fetchPackages(null, controller.signal);
    return () => controller.abort();
  }, [fetchPackages]);

  const features = [
    { icon: <Gem size={32} />, title: 'features.f1_title', desc: 'features.f1_desc' },
    { icon: <ShieldCheck size={32} />, title: 'features.f2_title', desc: 'features.f2_desc' },
    { icon: <Clock size={32} />, title: 'features.f3_title', desc: 'features.f3_desc' },
  ];

  return (
    <div className="min-h-screen bg-[#081121] font-sans selection:bg-[#0B67FF] selection:text-white overflow-x-hidden">
      <Navbar />
      
      {/* WRAPPER: Adds space between Hero Search and the cards below */}
      <div className="pb-16 md:pb-24">
        <Hero onSearch={(params) => fetchPackages(params)} />
      </div>

      <main className="max-w-7xl mx-auto px-6 relative">
        
        {/* FEATURES GRID: Negative margin pulls it up slightly, but strictly controlled */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-12 md:-mt-20 relative z-30 mb-32 md:mb-48">
          {features.map((f, i) => (
            <div key={i} className="bg-[#0F1724]/90 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/5 shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
              <div className="w-16 h-16 bg-[#0B67FF]/20 rounded-2xl flex items-center justify-center text-[#0B67FF] mb-8 shadow-inner group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight">{t(f.title)}</h3>
              <p className="text-white/40 text-sm leading-relaxed font-medium">{t(f.desc)}</p>
            </div>
          ))}
        </div>

        {/* DESTINATIONS SECTION */}
        <div className="mb-40 md:mb-56">
           <Destinations />
        </div>

        {/* OFFERS / PACKAGES SECTION */}
        <section id="offers" className="pb-40 pt-10 scroll-mt-32">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 gap-8 text-center md:text-left">
            <div>
              <span className="text-[#0B67FF] font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">{t('nav.offers')}</span>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">{t('home.popular_title')}</h2>
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
              <p className="mt-6 font-black tracking-[0.3em] uppercase text-xs text-white/20">{t('home.loading')}</p>
            </div>
          ) : packages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
              {packages.map((pkg) => (
                <PackageCard key={pkg._id} item={pkg} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-white/5 rounded-[4rem] border-2 border-dashed border-white/5">
              <div className="mb-4 flex justify-center text-white/10"><Gem size={48} /></div>
              <p className="text-white/30 text-xl font-black uppercase tracking-widest">{t('home.no_results')}</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;