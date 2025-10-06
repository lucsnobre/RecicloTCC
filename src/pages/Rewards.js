import React from 'react';
import { motion } from 'framer-motion';
import { GiftIcon, TicketIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const Rewards = () => {
  const rewards = [
    {
      id: 1,
      type: 'voucher',
      title: '10% de Desconto',
      description: 'Em produtos selecionados da loja',
      points: 100,
      validUntil: '30 dias',
      claimed: false,
      icon: '🎟️'
    },
    {
      id: 2,
      type: 'product',
      title: 'Ecobag Exclusiva',
      description: 'Sacola reutilizável premium',
      points: 200,
      validUntil: 'Sem prazo',
      claimed: false,
      icon: '👜'
    },
    {
      id: 3,
      type: 'experience',
      title: 'Workshop de Reciclagem',
      description: 'Aprenda técnicas avançadas',
      points: 300,
      validUntil: '60 dias',
      claimed: true,
      icon: '🎓'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <GiftIcon className="h-16 w-16 text-primary-500 mx-auto mb-4" />
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Recompensas
        </h1>
        <p className="text-gray-600">
          Resgate prêmios incríveis com seus pontos!
        </p>
      </div>

      <div className="grid gap-4">
        {rewards.map((reward) => (
          <motion.div
            key={reward.id}
            whileHover={{ scale: 1.02 }}
            className={`card p-6 ${reward.claimed ? 'opacity-60' : ''}`}
          >
            <div className="flex items-start gap-4">
              <span className="text-4xl">{reward.icon}</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{reward.title}</h3>
                <p className="text-gray-600 mb-2">{reward.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-primary-600">
                    <TicketIcon className="h-4 w-4" />
                    {reward.points} pontos
                  </span>
                  <span className="flex items-center gap-1 text-gray-500">
                    <ClockIcon className="h-4 w-4" />
                    {reward.validUntil}
                  </span>
                </div>
              </div>
              {reward.claimed ? (
                <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                  <CheckCircleIcon className="h-5 w-5" />
                  <span>Resgatado</span>
                </div>
              ) : (
                <button className="btn-primary px-6 py-2">
                  Resgatar
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Rewards;
