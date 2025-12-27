import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, Star } from 'lucide-react';

const DestinationCard = ({ item }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -10 }}
      className="group relative bg-[#0F1724] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl"
    >
      <div className="relative h-[380px] overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute top-6 left-6 bg-[#0B67FF] text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl">
          {item.tag}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1724] via-[#0F1724]/20 to-transparent opacity-90" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="flex justify-between items-end mb-6">
          <div className="text-start">
            <div className="flex items-center gap-2 text-white/50 text-xs mb-2 font-bold uppercase tracking-wider">
              <Clock size={14} className="text-[#0B67FF]" /> <span>{item.days}</span>
              <span className="mx-1 opacity-20">•</span>
              <Star size={14} className="text-yellow-400 fill-yellow-400" /> <span>{item.rating}</span>
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight leading-none">{item.name}</h3>
          </div>
          <div className="text-right">
            <span className="block text-[10px] text-white/30 uppercase font-black tracking-widest mb-1">From</span>
            <span className="text-2xl font-black text-[#0B67FF]">${item.price}</span>
          </div>
        </div>

        <button className="w-full py-4 bg-white/5 hover:bg-[#0B67FF] border border-white/10 hover:border-[#0B67FF] rounded-2xl text-white text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group/btn">
          View Details
          <ArrowUpRight size={16} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
        </button>
      </div>
    </motion.div>
  );
};

export default DestinationCard;