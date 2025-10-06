import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const NotificationContext = createContext({});

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification deve ser usado dentro de NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [preferences, setPreferences] = useState({
    push: true,
    email: true,
    sms: false,
    collectReminders: true,
    challengeUpdates: true,
    communityActivity: true,
    promotions: true,
    educationalContent: true,
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00'
    }
  });

  // Carrega notificações ao montar o componente
  useEffect(() => {
    loadNotifications();
    loadPreferences();
  }, []);

  // Atualiza contador de não lidas
  useEffect(() => {
    const count = notifications.filter(n => !n.read).length;
    setUnreadCount(count);
  }, [notifications]);

  const loadNotifications = () => {
    // Simula carregamento de notificações
    const mockNotifications = [
      {
        id: '1',
        type: 'reward',
        title: 'Novo Voucher Disponível!',
        message: 'Você ganhou um voucher de 10% de desconto na loja eco.',
        icon: '🎁',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        read: false,
        actionUrl: '/rewards'
      },
      {
        id: '2',
        type: 'challenge',
        title: 'Desafio Semanal',
        message: 'Faltam apenas 5 garrafas para completar o desafio!',
        icon: '🏆',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        read: false,
        actionUrl: '/challenges'
      },
      {
        id: '3',
        type: 'community',
        title: 'Nova conquista desbloqueada',
        message: 'Você alcançou o nível Eco Guerreiro!',
        icon: '🌟',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        read: true,
        actionUrl: '/profile'
      },
      {
        id: '4',
        type: 'education',
        title: 'Novo conteúdo disponível',
        message: 'Aprenda sobre o processo de reciclagem de PET',
        icon: '📚',
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        read: true,
        actionUrl: '/education'
      }
    ];
    
    setNotifications(mockNotifications);
  };

  const loadPreferences = () => {
    const saved = localStorage.getItem('reciclo_notification_prefs');
    if (saved) {
      setPreferences(JSON.parse(saved));
    }
  };

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false,
      ...notification
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Mostra toast se for uma notificação importante
    if (notification.priority === 'high') {
      toast(notification.message, {
        icon: notification.icon || '🔔',
        duration: 5000
      });
    }
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
    toast.success('Todas as notificações foram marcadas como lidas');
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev =>
      prev.filter(n => n.id !== notificationId)
    );
  };

  const clearAll = () => {
    setNotifications([]);
    toast.success('Todas as notificações foram removidas');
  };

  const updatePreferences = (newPreferences) => {
    const updated = { ...preferences, ...newPreferences };
    setPreferences(updated);
    localStorage.setItem('reciclo_notification_prefs', JSON.stringify(updated));
    toast.success('Preferências de notificação atualizadas');
  };

  const scheduleReminder = (type, time) => {
    // Simula agendamento de lembrete
    const reminderTypes = {
      daily: 'Lembrete diário de coleta',
      weekly: 'Resumo semanal',
      challenge: 'Lembrete de desafio'
    };
    
    addNotification({
      type: 'reminder',
      title: reminderTypes[type] || 'Lembrete',
      message: `Agendado para ${time}`,
      icon: '⏰',
      priority: 'medium'
    });
  };

  const value = {
    notifications,
    unreadCount,
    preferences,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    updatePreferences,
    scheduleReminder
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
