import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import DestinationCard from '../components/common/DestinationCard';
import DestinationFilters from '../components/features/DestinationFilters';
import { destinations } from '../data/destinations';

const DestinationsPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredDestinations = activeCategory === 'All' 
    ? destinations 
    : destinations.filter(d => d.category === activeCategory);

  return (
    <div className="bg-[#081121] min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[12px] font-black text-[#0B67FF] uppercase tracking-[0.4em] mb-4"
          >
            Explore the Unexplored
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white"
          >
            Popular <span className="text-white/20">Destinations</span>
          </motion.h1>
        </div>

        {/* Filters */}
        <DestinationFilters active={activeCategory} setActive={setActiveCategory} />

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredDestinations.map((item) => (
              <DestinationCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default DestinationsPage;