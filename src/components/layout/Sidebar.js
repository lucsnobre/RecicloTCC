import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  HomeIcon,
  CameraIcon,
  MapIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  AcademicCapIcon,
  TrophyIcon,
  GiftIcon,
  BellIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const Sidebar = ({ onClose }) => {
  const { logout, userStats } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, badge: null },
    { name: 'Scanner', href: '/scanner', icon: CameraIcon, badge: 'NOVO' },
    { name: 'Mapa de Coleta', href: '/map', icon: MapIcon, badge: null },
    { name: 'Loja Eco', href: '/store', icon: ShoppingBagIcon, badge: null },
    { name: 'Comunidade', href: '/community', icon: UserGroupIcon, badge: null },
    { name: 'Reciclo Educa', href: '/education', icon: AcademicCapIcon, badge: null },
    { name: 'Desafios', href: '/challenges', icon: SparklesIcon, badge: '3' },
    { name: 'Recompensas', href: '/rewards', icon: GiftIcon, badge: null },
  ];

  const secondaryNavigation = [
    { name: 'Perfil', href: '/profile', icon: UserCircleIcon },
    { name: 'Notificações', href: '/notifications', icon: BellIcon },
    { name: 'Configurações', href: '/settings', icon: Cog6ToothIcon },
  ];

  return (
    <div className="flex flex-col h-full bg-white shadow-xl">
      {/* Logo and Close Button */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <div className="flex items-center">
          <span className="text-3xl mr-3">♻️</span>
          <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
            RECICLO
          </h1>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* User Stats Card */}
      <div className="mx-4 mt-4 p-4 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-gray-600">Seu Rank</p>
            <p className="text-lg font-bold text-primary-700">
              {userStats?.rank || 'Iniciante'}
            </p>
          </div>
          <div className="text-3xl">
            {userStats?.currentLevel >= 10 ? '👑' :
             userStats?.currentLevel >= 7 ? '🦸' :
             userStats?.currentLevel >= 5 ? '⚔️' :
             userStats?.currentLevel >= 3 ? '🛡️' :
             userStats?.currentLevel >= 2 ? '🌱' : '🌰'}
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Nível {userStats?.currentLevel || 1}</span>
              <span>{userStats?.totalPoints || 0}/{userStats?.nextLevelPoints || 100} pts</span>
            </div>
            <div className="w-full bg-white/50 rounded-full h-2">
              <motion.div 
                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ 
                  width: `${((userStats?.totalPoints || 0) % 300) / 3}%` 
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            onClick={onClose}
            className={({ isActive }) =>
              `group flex items-center px-2 py-2 text-sm font-medium rounded-lg transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-700 border-l-4 border-primary-500'
                  : 'text-gray-700 hover:bg-gray-50'
              }`
            }
          >
            <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
            <span className="flex-1">{item.name}</span>
            {item.badge && (
              <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${
                item.badge === 'NOVO' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-primary-100 text-primary-800'
              }`}>
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}

        <div className="pt-6">
          <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Conta
          </p>
          <div className="mt-2 space-y-1">
            {secondaryNavigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-center px-2 py-2 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => {
            logout();
            onClose && onClose();
          }}
          className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5" />
          Sair
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
