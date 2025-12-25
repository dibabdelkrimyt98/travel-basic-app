import axios from 'axios';
import { Clock, Gem, Loader2, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import Hero from '../components/features/Hero';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import PackageCard from '../components/ui/PackageCard';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const { t } = useLanguage();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch logic (same as before)
  const fetchPackages = async (query = '') => {
    setLoading(true);
    try {
      const url = query 
        ? `http://localhost:5000/api/packages/search?query=${query}`
        : 'http://localhost:5000/api/packages';
      const response = await axios.get(url);
      setPackages(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPackages(); }, []);

  const features = [
    { icon: <Gem size={32} />, title: 'features.f1_title', desc: 'features.f1_desc' },
    { icon: <ShieldCheck size={32} />, title: 'features.f2_title', desc: 'features.f2_desc' },
    { icon: <Clock size={32} />, title: 'features.f3_title', desc: 'features.f3_desc' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-[#0B67FF] selection:text-white">
      <Navbar />
      <Hero onSearch={fetchPackages} />

      <main className="max-w-7xl mx-auto px-6 pb-20">
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-16 relative z-20 mb-20">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-xl shadow-blue-900/5 hover:-translate-y-2 transition-transform duration-300 border border-gray-100">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[#0B67FF] mb-6">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0F1724] mb-2">{t(f.title)}</h3>
              <p className="text-gray-500 leading-relaxed">{t(f.desc)}</p>
            </div>
          ))}
        </div>

        {/* Packages Section */}
        <section id="offers">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <span className="text-[#0B67FF] font-bold tracking-wider uppercase text-sm mb-2 block">
                {t('nav.offers')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F1724]">
                {t('home.popular_title')}
              </h2>
            </div>
            <button onClick={() => fetchPackages()} className="px-6 py-2 rounded-full border border-gray-200 font-medium hover:border-[#0B67FF] hover:text-[#0B67FF] transition-colors">
              {t('home.reset')}
            </button>
          </div>
          
          {loading ? (
            <div className="min-h-[300px] flex flex-col items-center justify-center text-gray-400 animate-pulse">
              <Loader2 className="animate-spin mb-4 text-[#0B67FF]" size={40} />
              <p className="font-medium">{t('home.loading')}</p>
            </div>
          ) : packages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <PackageCard key={pkg._id} item={pkg} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-500 text-lg">{t('home.no_results')}</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;