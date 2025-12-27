import axios from 'axios';
import { Clock, Gem, Loader2, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
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

  // Fetch logic for API-driven packages
  const fetchPackages = async (query = '') => {
    setLoading(true);
    try {
      const url = query 
        ? `http://localhost:5000/api/packages/search?query=${query}`
        : 'http://localhost:5000/api/packages';
      const response = await axios.get(url);
      setPackages(response.data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchPackages(); 
  }, []);

  const features = [
    { icon: <Gem size={32} />, title: 'features.f1_title', desc: 'features.f1_desc' },
    { icon: <ShieldCheck size={32} />, title: 'features.f2_title', desc: 'features.f2_desc' },
    { icon: <Clock size={32} />, title: 'features.f3_title', desc: 'features.f3_desc' },
  ];

  return (
    <div className="min-h-screen bg-[#081121] font-sans selection:bg-[#0B67FF] selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <Hero onSearch={fetchPackages} />

      <main className="max-w-7xl mx-auto px-6 pb-20">
        
        {/* Features Grid - Floating Glass Effect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-16 relative z-30 mb-24">
          {features.map((f, i) => (
            <div 
              key={i} 
              className="bg-[#0F1724]/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-white/5 hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-[#0B67FF]/10 rounded-2xl flex items-center justify-center text-[#0B67FF] mb-6 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t(f.title)}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{t(f.desc)}</p>
            </div>
          ))}
        </div>

        {/* 1. Static/Curated Destinations Section */}
        <div className="mb-24">
           <Destinations />
        </div>

        {/* 2. Dynamic Packages Section (Search Results) */}
        <section id="offers" className="scroll-mt-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="text-start">
              <span className="text-[#0B67FF] font-black tracking-[0.3em] uppercase text-xs mb-3 block">
                {t('nav.offers')}
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-white">
                {t('home.popular_title')}
              </h2>
            </div>
            <button 
              onClick={() => fetchPackages()} 
              className="px-8 py-3 rounded-full border border-white/10 text-white/60 font-bold text-xs uppercase tracking-widest hover:border-[#0B67FF] hover:text-[#0B67FF] transition-all bg-white/5"
            >
              {t('home.reset')}
            </button>
          </div>
          
          {loading ? (
            <div className="min-h-[400px] flex flex-col items-center justify-center text-white/20">
              <Loader2 className="animate-spin mb-4 text-[#0B67FF]" size={48} />
              <p className="font-bold tracking-widest uppercase text-xs">{t('home.loading')}</p>
            </div>
          ) : packages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {packages.map((pkg) => (
                <PackageCard key={pkg._id} item={pkg} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white/5 rounded-[3rem] border border-dashed border-white/10">
              <p className="text-white/40 text-lg font-medium">{t('home.no_results')}</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;