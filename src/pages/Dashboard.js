import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  CameraIcon,
  MapPinIcon,
  TrophyIcon,
  SparklesIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  GiftIcon,
  FireIcon,
  ClockIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

const Dashboard = () => {
  const { user, userStats, addPoints } = useAuth();
  const [timeOfDay, setTimeOfDay] = useState('');
  const [dailyGoal, setDailyGoal] = useState({ current: 3, target: 10 });
  const [streak, setStreak] = useState(7);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('Bom dia');
    else if (hour < 18) setTimeOfDay('Boa tarde');
    else setTimeOfDay('Boa noite');
  }, []);

  // Mock data for charts
  const weeklyData = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    datasets: [{
      label: 'Garrafas Coletadas',
      data: [12, 8, 15, 7, 20, 25, 18],
      borderColor: '#2fbf80',
      backgroundColor: 'rgba(47, 191, 128, 0.1)',
      tension: 0.4
    }]
  };

  const impactData = {
    labels: ['PET', 'Vidro', 'Papel', 'Metal', 'Orgânico'],
    datasets: [{
      data: [45, 20, 15, 10, 10],
      backgroundColor: [
        '#2fbf80',
        '#3aadff',
        '#fbbf24',
        '#fb923c',
        '#92400e'
      ],
      borderWidth: 0
    }]
  };

  const quickActions = [
    {
      icon: <CameraIcon className="h-6 w-6" />,
      title: 'Escanear',
      description: 'Registre suas coletas',
      link: '/scanner',
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: <MapPinIcon className="h-6 w-6" />,
      title: 'Mapa',
      description: 'Pontos próximos',
      link: '/map',
      color: 'from-secondary-500 to-secondary-600'
    },
    {
      icon: <TrophyIcon className="h-6 w-6" />,
      title: 'Desafios',
      description: '3 ativos',
      link: '/challenges',
      color: 'from-eco-yellow to-eco-orange'
    },
    {
      icon: <GiftIcon className="h-6 w-6" />,
      title: 'Recompensas',
      description: '2 disponíveis',
      link: '/rewards',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const achievements = [
    { id: 1, title: 'Primeira Semana', progress: 100, icon: '🌱' },
    { id: 2, title: '50 Garrafas', progress: 85, icon: '♻️' },
    { id: 3, title: 'Eco Influencer', progress: 45, icon: '🌟' }
  ];

  const leaderboard = [
    { rank: 1, name: 'Maria Silva', points: 2850, avatar: '👩', trend: 'up' },
    { rank: 2, name: 'João Santos', points: 2720, avatar: '👨', trend: 'up' },
    { rank: 3, name: 'Ana Costa', points: 2650, avatar: '👩‍🦰', trend: 'down' },
    { rank: 4, name: 'Você', points: userStats?.totalPoints || 850, avatar: '😊', trend: 'up', highlight: true }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 text-white shadow-xl"
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              {timeOfDay}, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-white/90">
              Você está fazendo a diferença! Continue assim! 🌍
            </p>
          </div>
          
          <div className="mt-4 lg:mt-0 flex items-center gap-4">
            <div className="text-center">
              <div className="flex items-center gap-1">
                <FireIcon className="h-5 w-5" />
                <span className="text-2xl font-bold">{streak}</span>
              </div>
              <p className="text-xs text-white/80">dias seguidos</p>
            </div>
            
            <div className="h-12 w-px bg-white/30"></div>
            
            <div className="text-center">
              <p className="text-2xl font-bold">{userStats?.totalBottles || 0}</p>
              <p className="text-xs text-white/80">garrafas totais</p>
            </div>
          </div>
        </div>

        {/* Daily Progress */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Meta Diária</span>
            <span>{dailyGoal.current}/{dailyGoal.target} garrafas</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <motion.div
              className="bg-white h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(dailyGoal.current / dailyGoal.target) * 100}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link to={action.link}>
              <div className={`bg-gradient-to-br ${action.color} p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition-all`}>
                <div className="flex items-center justify-between mb-3">
                  {action.icon}
                  <SparklesIcon className="h-4 w-4 opacity-50" />
                </div>
                <h3 className="font-semibold">{action.title}</h3>
                <p className="text-sm text-white/80">{action.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weekly Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Atividade Semanal</h2>
            <ChartBarIcon className="h-5 w-5 text-gray-400" />
          </div>
          <Line 
            data={weeklyData} 
            options={{
              responsive: true,
              plugins: {
                legend: { display: false }
              },
              scales: {
                y: { beginAtZero: true }
              }
            }}
          />
          <div className="mt-4 flex justify-around text-center">
            <div>
              <p className="text-2xl font-bold text-primary-600">105</p>
              <p className="text-xs text-gray-500">Total da Semana</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary-600">15</p>
              <p className="text-xs text-gray-500">Média Diária</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-eco-green">+23%</p>
              <p className="text-xs text-gray-500">vs Semana Passada</p>
            </div>
          </div>
        </motion.div>

        {/* Impact Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Seu Impacto</h2>
            <ArrowTrendingUpIcon className="h-5 w-5 text-gray-400" />
          </div>
          <div className="flex justify-center">
            <div className="w-48 h-48">
              <Doughnut 
                data={impactData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: { boxWidth: 12, padding: 8 }
                    }
                  }
                }}
              />
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Você evitou <span className="font-bold text-primary-600">2.5kg</span> de CO₂
            </p>
          </div>
        </motion.div>
      </div>

      {/* Achievements & Leaderboard */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Conquistas Recentes</h2>
            <Link to="/profile" className="text-sm text-primary-600 hover:text-primary-700">
              Ver todas
            </Link>
          </div>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center gap-4">
                <div className="text-3xl">{achievement.icon}</div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{achievement.title}</p>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                      style={{ width: `${achievement.progress}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {achievement.progress}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mini Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Ranking Local</h2>
            <Link to="/community" className="text-sm text-primary-600 hover:text-primary-700">
              Ver completo
            </Link>
          </div>
          <div className="space-y-3">
            {leaderboard.map((user) => (
              <div
                key={user.rank}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  user.highlight ? 'bg-primary-50 border border-primary-200' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`font-bold ${
                    user.rank === 1 ? 'text-yellow-500' :
                    user.rank === 2 ? 'text-gray-400' :
                    user.rank === 3 ? 'text-orange-600' :
                    'text-gray-600'
                  }`}>
                    #{user.rank}
                  </div>
                  <div className="text-2xl">{user.avatar}</div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.points} pts</p>
                  </div>
                </div>
                {user.trend === 'up' && (
                  <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Atividade Recente</h2>
          <ClockIcon className="h-5 w-5 text-gray-400" />
        </div>
        <div className="space-y-3">
          {[
            { time: 'Há 2 horas', action: 'Registrou 5 garrafas PET', points: '+50', icon: '♻️' },
            { time: 'Ontem', action: 'Completou desafio semanal', points: '+100', icon: '🏆' },
            { time: '2 dias atrás', action: 'Visitou ponto de coleta', points: '+20', icon: '📍' },
            { time: '3 dias atrás', action: 'Compartilhou com amigos', points: '+30', icon: '🤝' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{activity.icon}</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-primary-600">{activity.points}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
