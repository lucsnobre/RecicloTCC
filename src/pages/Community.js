import React from 'react';
import { motion } from 'framer-motion';
import { UserGroupIcon, ChatBubbleLeftRightIcon, HeartIcon, ShareIcon } from '@heroicons/react/24/outline';

const Community = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <UserGroupIcon className="h-16 w-16 text-primary-500 mx-auto mb-4" />
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Comunidade Verde
        </h1>
        <p className="text-gray-600">
          Conecte-se com outros eco-guerreiros e compartilhe suas conquistas!
        </p>
      </div>

      <div className="grid gap-6">
        {/* Sample Posts */}
        {[1, 2, 3].map((post) => (
          <div key={post} className="card p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-xl">👤</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Usuário Eco {post}</h3>
                <p className="text-sm text-gray-500 mb-2">Há 2 horas</p>
                <p className="text-gray-700 mb-4">
                  Acabei de completar meu desafio semanal! 🎉 100 garrafas coletadas!
                </p>
                <div className="flex items-center gap-6 text-sm">
                  <button className="flex items-center gap-1 text-gray-600 hover:text-primary-600">
                    <HeartIcon className="h-5 w-5" />
                    <span>123</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-600 hover:text-primary-600">
                    <ChatBubbleLeftRightIcon className="h-5 w-5" />
                    <span>45</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-600 hover:text-primary-600">
                    <ShareIcon className="h-5 w-5" />
                    <span>Compartilhar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Community;
