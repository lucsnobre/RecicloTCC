import React from 'react';
import { motion } from 'framer-motion';
import { useNotification } from '../contexts/NotificationContext';
import { 
  BellIcon, 
  TrashIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Notifications = () => {
  const { notifications, markAsRead, markAllAsRead, deleteNotification, clearAll } = useNotification();

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'reward':
        return '🎁';
      case 'challenge':
        return '🏆';
      case 'community':
        return '🌟';
      case 'education':
        return '📚';
      case 'reminder':
        return '⏰';
      default:
        return '🔔';
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = Math.floor((now - time) / 1000);
    
    if (diff < 60) return 'agora';
    if (diff < 3600) return `${Math.floor(diff / 60)} min atrás`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h atrás`;
    return `${Math.floor(diff / 86400)} dias atrás`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Notificações
          </h1>
          <p className="text-gray-600">
            {notifications.filter(n => !n.read).length} não lidas
          </p>
        </div>
        
        {notifications.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <CheckIcon className="h-4 w-4" />
              Marcar todas como lidas
            </button>
            <button
              onClick={clearAll}
              className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2"
            >
              <TrashIcon className="h-4 w-4" />
              Limpar todas
            </button>
          </div>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="card p-12 text-center">
          <BellIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nenhuma notificação
          </h3>
          <p className="text-gray-600">
            Suas notificações aparecerão aqui
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`card p-4 ${!notification.read ? 'border-l-4 border-primary-500 bg-primary-50/30' : ''}`}
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {notification.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500">
                    {getTimeAgo(notification.timestamp)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Marcar como lida"
                    >
                      <CheckIcon className="h-4 w-4 text-gray-600" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Remover"
                  >
                    <XMarkIcon className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Notifications;
