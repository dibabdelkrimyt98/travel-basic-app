import { Facebook, Instagram, Plane, Send, Twitter, Youtube } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { t, isRTL } = useLanguage();

  return (
    <footer className="bg-[#081121] text-white pt-24 pb-12 overflow-hidden relative">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#0B67FF]/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand Col */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 font-black text-2xl tracking-tighter">
              <div className="bg-[#0B67FF] p-2 rounded-xl text-white shadow-lg shadow-blue-500/20">
                <Plane size={24} fill="currentColor" />
              </div>
              TRAVEL<span className="text-[#0B67FF]">SIMPLE</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Redefining budget travel with premium experiences. Discover the world's most beautiful destinations without breaking the bank.
            </p>
            <div className="flex gap-5">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="group relative w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all duration-300"
                >
                  <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-[#0B67FF]/50 group-hover:scale-110 transition-all" />
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Col */}
          <div>
            <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-[#0B67FF] mb-8">
              {t('footer.links')}
            </h4>
            <ul className="space-y-4 text-sm font-medium text-white/50">
              {['destinations', 'offers', 'about', 'contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-0 h-px bg-[#0B67FF] transition-all group-hover:w-3" />
                    {t(`nav.${link}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="lg:col-span-2">
            <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-[#0B67FF] mb-8">
              {t('footer.news')}
            </h4>
            <p className="text-white/50 text-sm mb-6">Join 5,000+ travelers getting weekly budget deals.</p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder={t('footer.sub_placeholder')}
                className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl outline-none focus:border-[#0B67FF] transition-all text-white placeholder:text-white/20"
              />
              <button className={`absolute top-2 bottom-2 ${isRTL ? 'left-2' : 'right-2'} bg-[#0B67FF] text-white px-8 rounded-xl font-bold flex items-center gap-2 hover:bg-[#0055eb] shadow-lg shadow-blue-500/20 transition-all active:scale-95`}>
                <Send size={16} />
                <span className="hidden sm:inline font-bold uppercase tracking-wider text-xs">
                  {t('footer.sub_btn')}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">
            {t('footer.rights')}
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;