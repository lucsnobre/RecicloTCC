import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  CameraIcon, 
  PencilIcon,
  TrophyIcon,
  ChartBarIcon,
  ShareIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const Profile = () => {
  const { user, userStats } = useAuth();

  const achievements = [
    { id: 1, name: 'Primeira Coleta', icon: '🌱', unlocked: true },
    { id: 2, name: '100 Garrafas', icon: '♻️', unlocked: true },
    { id: 3, name: 'Semana Verde', icon: '🌿', unlocked: true },
    { id: 4, name: 'Eco Mestre', icon: '👑', unlocked: false },
    { id: 5, name: 'Influenciador', icon: '📢', unlocked: false },
    { id: 6, name: '1000 Pontos', icon: '⭐', unlocked: false }
  ];

  const stats = [
    { label: 'Total de Pontos', value: userStats?.totalPoints || 0, icon: '🌟' },
    { label: 'Garrafas Recicladas', value: userStats?.totalBottles || 0, icon: '♻️' },
    { label: 'CO₂ Economizado', value: '2.5kg', icon: '🌍' },
    { label: 'Árvores Salvas', value: '3', icon: '🌳' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      {/* Profile Header */}
      <div className="card p-8 mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center">
              <span className="text-5xl">😊</span>
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow">
              <CameraIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{user?.name || 'Eco Usuário'}</h1>
              <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                <PencilIcon className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-4">{user?.email}</p>
            
            {/* Rank Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full mb-4">
              <TrophyIcon className="h-5 w-5 text-primary-600" />
              <span className="font-semibold text-primary-700">{userStats?.rank || 'Iniciante'}</span>
              <span className="text-sm text-gray-600">• Nível {userStats?.currentLevel || 1}</span>
            </div>
            
            {/* Progress to Next Level */}
            <div className="max-w-sm mx-auto md:mx-0">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progresso para Nível {(userStats?.currentLevel || 0) + 1}</span>
                <span>{userStats?.totalPoints || 0}/{userStats?.nextLevelPoints || 100}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                  style={{ width: `${((userStats?.totalPoints || 0) % 300) / 3}%` }}
                />
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex md:flex-col gap-3">
            <button className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <ShareIcon className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <CogIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="card p-4 text-center"
          >
            <span className="text-3xl mb-2 block">{stat.icon}</span>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Achievements */}
      <div className="card p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <TrophyIcon className="h-6 w-6 mr-2 text-primary-600" />
          Conquistas
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              whileHover={{ scale: achievement.unlocked ? 1.1 : 1 }}
              className={`text-center p-4 rounded-lg ${
                achievement.unlocked 
                  ? 'bg-gradient-to-br from-primary-50 to-secondary-50' 
                  : 'bg-gray-100 opacity-50'
              }`}
            >
              <span className="text-4xl mb-2 block">
                {achievement.unlocked ? achievement.icon : '🔒'}
              </span>
              <p className="text-xs text-gray-600">{achievement.name}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Activity Chart */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <ChartBarIcon className="h-6 w-6 mr-2 text-primary-600" />
          Atividade dos Últimos 7 Dias
        </h2>
        <div className="h-48 flex items-end justify-between gap-2">
          {[12, 8, 15, 7, 20, 25, 18].map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-gradient-to-t from-primary-500 to-secondary-500 rounded-t"
                style={{ height: `${(value / 25) * 100}%` }}
              />
              <span className="text-xs text-gray-500 mt-2">
                {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'][index]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
