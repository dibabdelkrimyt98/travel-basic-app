import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, MapPin, Star } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const PackageCard = ({ item }) => {
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group bg-[#0F1724] rounded-[2rem] overflow-hidden border border-white/5 shadow-lg hover:shadow-[0_0_30px_rgba(11,103,255,0.15)] transition-all duration-300 h-full flex flex-col relative z-10"
    >
      {/* Image Container */}
      <div className="relative h-72 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient Overlay for seamless blend */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1724] via-[#0F1724]/40 to-transparent" />
        
        {/* Badges */}
        <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} flex gap-2`}>
          <span className="bg-[#0B67FF] backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-black text-white uppercase tracking-widest shadow-lg">
            Basic
          </span>
        </div>
        
        {/* Location Overlay */}
        <div className={`absolute bottom-4 ${isRTL ? 'right-6' : 'left-6'} flex items-center gap-1 text-white`}>
          <MapPin size={16} className="text-[#0B67FF]" />
          <span className="text-sm font-bold tracking-wide">{item.destination || "Worldwide"}</span>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 pb-8 pt-2 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-black text-white group-hover:text-[#0B67FF] transition-colors leading-tight">
            {item.title}
          </h3>
          <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg border border-white/5">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-bold text-white">4.8</span>
          </div>
        </div>
        
        <p className="text-white/50 text-sm leading-relaxed mb-8 line-clamp-2 font-medium">
          {item.summary}
        </p>

        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
          <div>
            <span className="block text-[10px] text-white/30 uppercase font-black tracking-widest mb-1">{t('card.from')}</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-[#0B67FF]">${item.price}</span>
            </div>
          </div>

          <button className="bg-white/5 hover:bg-[#0B67FF] text-white p-3 rounded-2xl transition-all group-hover:scale-110 active:scale-95 border border-white/10 group-hover:border-[#0B67FF] shadow-lg">
            <ArrowIcon size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PackageCard;