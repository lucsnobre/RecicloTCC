import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Contexts
import { useAuth } from './contexts/AuthContext';

// Layout Components
import Layout from './components/layout/Layout';
import SplashScreen from './components/common/SplashScreen';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Onboarding from './pages/auth/Onboarding';
import Dashboard from './pages/Dashboard';
import Scanner from './pages/Scanner';
import Map from './pages/Map';
import Store from './pages/Store';
import Community from './pages/Community';
import Education from './pages/Education';
import Profile from './pages/Profile';
import Rewards from './pages/Rewards';
import Challenges from './pages/Challenges';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const { user, loading } = useAuth();

  useEffect(() => {
    // Simula carregamento inicial
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash || loading) {
    return <SplashScreen />;
  }

  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={!user ? <Landing /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/onboarding" />} />
        <Route path="/onboarding" element={!user ? <Navigate to="/login" /> : <Onboarding />} />
        
        {/* Rotas Protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/map" element={<Map />} />
            <Route path="/store" element={<Store />} />
            <Route path="/community" element={<Community />} />
            <Route path="/education" element={<Education />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
        
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
