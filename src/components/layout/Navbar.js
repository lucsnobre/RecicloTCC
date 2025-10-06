import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { 
  Bars3Icon, 
  BellIcon,
  UserCircleIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const Navbar = ({ onMenuClick }) => {
  const { user, userStats } = useAuth();
  const { unreadCount } = useNotification();

  return (
    <nav className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left side */}
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            
            <div className="ml-4 lg:ml-0">
              <h2 className="text-lg font-semibold text-gray-900">
                Olá, {user?.name?.split(' ')[0] || 'Eco Amigo'}! 👋
              </h2>
              <p className="text-sm text-gray-500">
                Vamos salvar o planeta hoje?
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Points Display */}
            <motion.div 
              className="hidden sm:flex items-center bg-gradient-to-r from-primary-50 to-secondary-50 px-4 py-2 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-2xl mr-2">🌟</span>
              <div>
                <p className="text-xs text-gray-600">Pontos</p>
                <p className="text-lg font-bold text-primary-600">
                  {userStats?.totalPoints || 0}
                </p>
              </div>
            </motion.div>

            {/* Level Badge */}
            <motion.div 
              className="hidden sm:flex items-center bg-gradient-to-r from-eco-green/10 to-eco-blue/10 px-4 py-2 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-2xl mr-2">🏆</span>
              <div>
                <p className="text-xs text-gray-600">Nível</p>
                <p className="text-lg font-bold text-eco-green">
                  {userStats?.currentLevel || 1}
                </p>
              </div>
            </motion.div>

            {/* Notifications */}
            <Link 
              to="/notifications"
              className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <BellIcon className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* Settings */}
            <Link 
              to="/settings"
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block"
            >
              <Cog6ToothIcon className="h-6 w-6" />
            </Link>

            {/* Profile */}
            <Link 
              to="/profile"
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <UserCircleIcon className="h-6 w-6" />
            </Link>
          </div>
        </div>

        {/* Mobile Stats Bar */}
        <div className="flex sm:hidden items-center justify-between py-2 border-t border-gray-100">
          <div className="flex items-center">
            <span className="text-xl mr-1">🌟</span>
            <span className="text-sm font-semibold">{userStats?.totalPoints || 0} pts</span>
          </div>
          <div className="flex items-center">
            <span className="text-xl mr-1">🏆</span>
            <span className="text-sm font-semibold">Nível {userStats?.currentLevel || 1}</span>
          </div>
          <div className="flex items-center">
            <span className="text-xl mr-1">♻️</span>
            <span className="text-sm font-semibold">{userStats?.totalBottles || 0} garrafas</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
