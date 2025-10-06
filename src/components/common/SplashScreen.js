import React from 'react';
import { motion } from 'framer-motion';

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 1.5
          }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto bg-white rounded-3xl shadow-2xl flex items-center justify-center">
            <span className="text-6xl">♻️</span>
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-4xl md:text-5xl font-display font-bold text-white mb-4"
        >
          RECICLO
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-white/90 text-lg"
        >
          Transformando PET em Moda Sustentável
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-12"
        >
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SplashScreen;
