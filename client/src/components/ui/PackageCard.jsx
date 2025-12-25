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
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 h-full flex flex-col"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
        
        {/* Badges */}
        <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} flex gap-2`}>
          <span className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-[#0B67FF] shadow-sm uppercase tracking-wider">
            Basic
          </span>
        </div>
        
        {/* Location Overlay */}
        <div className={`absolute bottom-4 ${isRTL ? 'right-4' : 'left-4'} flex items-center gap-1 text-white`}>
          <MapPin size={16} />
          <span className="text-sm font-medium">{item.destination || "Worldwide"}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-[#0F1724] group-hover:text-[#0B67FF] transition-colors">
            {item.title}
          </h3>
          <div className="flex items-center gap-1 text-amber-400">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-bold text-gray-400">4.8</span>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
          {item.summary}
        </p>

        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
          <div>
            <span className="block text-xs text-gray-400 uppercase font-semibold">{t('card.from')}</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[#0B67FF]">${item.price}</span>
            </div>
          </div>

          <button className="bg-gray-50 hover:bg-[#0B67FF] text-[#0F1724] hover:text-white p-3 rounded-xl transition-all group-hover:scale-110 active:scale-95 border border-gray-100 group-hover:border-[#0B67FF]">
            <ArrowIcon size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PackageCard;