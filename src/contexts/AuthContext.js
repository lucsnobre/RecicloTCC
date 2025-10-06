import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState({
    totalPoints: 0,
    totalBottles: 0,
    currentLevel: 1,
    nextLevelPoints: 100,
    rank: 'Iniciante',
    achievements: [],
    activeChallenges: []
  });

  // Verifica autenticação ao carregar
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const storedUser = localStorage.getItem('reciclo_user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        await loadUserStats(userData.id);
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserStats = async (userId) => {
    // Simula carregamento de estatísticas do usuário
    const mockStats = {
      totalPoints: 850,
      totalBottles: 85,
      currentLevel: 3,
      nextLevelPoints: 1000,
      rank: 'Eco Guerreiro',
      achievements: [
        { id: 1, name: 'Primeira Coleta', icon: '🌱', date: '2024-01-15' },
        { id: 2, name: '10 Garrafas', icon: '♻️', date: '2024-01-20' },
        { id: 3, name: 'Semana Verde', icon: '🌿', date: '2024-01-25' }
      ],
      activeChallenges: [
        { id: 1, name: 'Desafio Semanal', progress: 60, target: 100 },
        { id: 2, name: 'Meta do Mês', progress: 250, target: 500 }
      ]
    };
    setUserStats(mockStats);
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Simula chamada de API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock de usuário autenticado
      const userData = {
        id: '123456',
        name: 'Usuário Eco',
        email: email,
        avatar: '/api/placeholder/150/150',
        createdAt: new Date().toISOString(),
        preferences: {
          notifications: true,
          newsletter: true,
          publicProfile: true
        }
      };
      
      localStorage.setItem('reciclo_user', JSON.stringify(userData));
      setUser(userData);
      await loadUserStats(userData.id);
      
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
      toast.error('Erro ao fazer login. Verifique suas credenciais.');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      // Simula chamada de API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        avatar: '/api/placeholder/150/150',
        createdAt: new Date().toISOString(),
        preferences: {
          notifications: true,
          newsletter: true,
          publicProfile: true
        }
      };
      
      localStorage.setItem('reciclo_user', JSON.stringify(newUser));
      setUser(newUser);
      
      toast.success('Cadastro realizado com sucesso!');
      return { success: true };
    } catch (error) {
      toast.error('Erro ao criar conta.');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('reciclo_user');
    setUser(null);
    setUserStats({
      totalPoints: 0,
      totalBottles: 0,
      currentLevel: 1,
      nextLevelPoints: 100,
      rank: 'Iniciante',
      achievements: [],
      activeChallenges: []
    });
    toast.success('Logout realizado com sucesso!');
    navigate('/');
  };

  const updateProfile = async (updates) => {
    try {
      const updatedUser = { ...user, ...updates };
      localStorage.setItem('reciclo_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success('Perfil atualizado com sucesso!');
      return { success: true };
    } catch (error) {
      toast.error('Erro ao atualizar perfil.');
      return { success: false, error: error.message };
    }
  };

  const addPoints = (points, bottles = 0) => {
    setUserStats(prev => {
      const newPoints = prev.totalPoints + points;
      const newBottles = prev.totalBottles + bottles;
      
      // Calcula nível
      let newLevel = Math.floor(newPoints / 300) + 1;
      let nextLevelPoints = newLevel * 300;
      
      // Define rank baseado no nível
      let rank = 'Iniciante';
      if (newLevel >= 10) rank = 'Eco Mestre';
      else if (newLevel >= 7) rank = 'Eco Herói';
      else if (newLevel >= 5) rank = 'Eco Guerreiro';
      else if (newLevel >= 3) rank = 'Eco Protetor';
      else if (newLevel >= 2) rank = 'Eco Amigo';
      
      return {
        ...prev,
        totalPoints: newPoints,
        totalBottles: newBottles,
        currentLevel: newLevel,
        nextLevelPoints,
        rank
      };
    });
    
    toast.success(`+${points} pontos ganhos!`);
  };

  const value = {
    user,
    userStats,
    loading,
    login,
    register,
    logout,
    updateProfile,
    addPoints,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
