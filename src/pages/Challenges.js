import React from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon, FireIcon, TrophyIcon, ClockIcon } from '@heroicons/react/24/outline';

const Challenges = () => {
  const challenges = [
    {
      id: 1,
      title: 'Desafio Semanal',
      description: 'Colete 50 garrafas esta semana',
      progress: 35,
      target: 50,
      reward: 200,
      timeLeft: '3 dias',
      icon: '🎯',
      difficulty: 'Médio'
    },
    {
      id: 2,
      title: 'Maratona Verde',
      description: 'Registre coletas por 7 dias seguidos',
      progress: 5,
      target: 7,
      reward: 150,
      timeLeft: '2 dias',
      icon: '🏃',
      difficulty: 'Fácil'
    },
    {
      id: 3,
      title: 'Eco Mestre',
      description: 'Recicle 5 tipos diferentes de materiais',
      progress: 3,
      target: 5,
      reward: 300,
      timeLeft: '5 dias',
      icon: '🏆',
      difficulty: 'Difícil'
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Fácil':
        return 'bg-green-100 text-green-800';
      case 'Médio':
        return 'bg-yellow-100 text-yellow-800';
      case 'Difícil':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <SparklesIcon className="h-16 w-16 text-primary-500 mx-auto mb-4" />
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Desafios Ativos
        </h1>
        <p className="text-gray-600">
          Complete desafios e ganhe recompensas extras!
        </p>
      </div>

      {/* Active Challenges */}
      <div className="grid gap-6 mb-8">
        {challenges.map((challenge) => (
          <motion.div
            key={challenge.id}
            whileHover={{ scale: 1.01 }}
            className="card p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <span className="text-4xl">{challenge.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {challenge.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{challenge.description}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                {challenge.difficulty}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progresso: {challenge.progress}/{challenge.target}</span>
                <span>{Math.round((challenge.progress / challenge.target) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>

            {/* Challenge Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <TrophyIcon className="h-4 w-4 text-primary-600" />
                  <strong className="text-primary-600">{challenge.reward} pts</strong>
                </span>
                <span className="flex items-center gap-1 text-gray-500">
                  <ClockIcon className="h-4 w-4" />
                  {challenge.timeLeft} restantes
                </span>
              </div>
              <button className="btn-primary px-4 py-2 text-sm">
                Ver Detalhes
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Daily Challenges */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <FireIcon className="h-6 w-6 mr-2 text-orange-500" />
          Desafios Diários
        </h2>
        <div className="grid gap-3">
          {[
            { title: 'Registre 5 garrafas', points: 50, completed: true },
            { title: 'Visite um ponto de coleta', points: 30, completed: false },
            { title: 'Compartilhe com um amigo', points: 20, completed: false }
          ].map((daily, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg ${
                daily.completed ? 'bg-green-50' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={daily.completed}
                  readOnly
                  className="h-5 w-5 text-primary-600 rounded"
                />
                <span className={daily.completed ? 'line-through text-gray-500' : ''}>
                  {daily.title}
                </span>
              </div>
              <span className="text-sm font-medium text-primary-600">
                +{daily.points} pts
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Challenges;
