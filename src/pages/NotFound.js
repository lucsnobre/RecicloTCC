import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HomeIcon, 
  ArrowLeftIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="inline-block mb-8"
        >
          <div className="relative">
            <span className="text-9xl">♻️</span>
            <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2">
              <ExclamationTriangleIcon className="h-8 w-8 text-gray-900" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-6xl font-display font-bold text-gray-900 mb-4">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Ops! Página não encontrada
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Parece que esta página foi reciclada e transformada em algo novo! 
            Que tal voltar ao início e continuar sua jornada sustentável?
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary px-6 py-3 flex items-center justify-center"
              >
                <HomeIcon className="h-5 w-5 mr-2" />
                Ir para o Dashboard
              </motion.button>
            </Link>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.history.back()}
              className="btn-outline px-6 py-3 flex items-center justify-center"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Voltar
            </motion.button>
          </div>
        </motion.div>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 p-6 bg-white/50 backdrop-blur rounded-xl"
        >
          <h3 className="font-semibold text-gray-900 mb-3">
            💡 Você sabia?
          </h3>
          <p className="text-sm text-gray-600">
            Uma garrafa PET pode levar até 400 anos para se decompor na natureza, 
            mas quando reciclada, pode se transformar em roupas, móveis e até mesmo 
            novas garrafas!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
