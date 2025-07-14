import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, SkipBack, SkipForward } from 'lucide-react';

const LodgifiersBar = ({ onPrev, onNext, currentIndex = 0, totalItems = 10, visibleItems = 3 }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Generate avatar items for the carousel
  const generateAvatars = () => {
    const avatars = [];
    for (let i = 0; i < totalItems; i++) {
      avatars.push({
        id: i,
        src: `avatar${(i % 3) + 1}.jpg`,
        alt: `Avatar ${i + 1}`,
        name: `User${i + 1}`
      });
    }
    return avatars;
  };

  const avatars = generateAvatars();
  const visibleAvatars = [];
  
  // Get visible avatars based on current index
  for (let i = 0; i < visibleItems; i++) {
    const index = (currentIndex + i) % totalItems;
    visibleAvatars.push(avatars[index]);
  }

  return (
    <motion.div 
      className="flex items-center justify-center bg-gradient-to-r from-[#29113e] to-[#1B0B29] border border-white/10 p-3 rounded-2xl"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <motion.button 
        className="bg-gradient-to-r from-purple-800 to-purple-900 text-white p-2.5 rounded-full hover:from-purple-700 hover:to-purple-800 focus:outline-none border border-white/20 shadow-lg"
        onClick={onPrev}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <SkipBack size={16} />
      </motion.button>
      
      <div className="flex items-center bg-gradient-to-r from-purple-600 to-purple-700 p-2 rounded-xl text-white text-sm mx-3 border border-white/20">
        <div className="flex -space-x-2">
          {visibleAvatars.map((avatar, index) => (
            <motion.img
              key={avatar.id}
              src={avatar.src}
              alt={avatar.alt}
              className="w-8 h-8 rounded-full border-2 border-white/30 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.2, zIndex: 10 }}
            />
          ))}
        </div>
        <motion.span 
          className="font-bold ml-3 text-yellow-300"
          animate={{ 
            color: isHovered ? "#fbbf24" : "#fde047"
          }}
          transition={{ duration: 0.3 }}
        >
          {totalItems.toLocaleString()} Lodgifiers
        </motion.span>
      </div>
      
      <motion.button 
        className="bg-gradient-to-r from-purple-800 to-purple-900 text-white p-2.5 rounded-full hover:from-purple-700 hover:to-purple-800 focus:outline-none border border-white/20 shadow-lg"
        onClick={onNext}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <SkipForward size={16} />
      </motion.button>
    </motion.div>
  );
};

export default LodgifiersBar;