import React, { useState } from 'react';
import './App.css';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';
import Tutorial from './components/Tutorial';
import TransitionOverlay from './components/TransitionOverlay';
import camada1 from './assets/Camada_1.png';

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAuthTransitioning, setIsAuthTransitioning] = useState(false);

  const navigateToRegister = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentScreen('register');
        setIsTransitioning(false);
      }, 300);
    }
  };

  const navigateToLogin = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentScreen('login');
        setIsTransitioning(false);
      }, 300);
    }
  };

  const navigateToTutorial = () => {
    if (!isTransitioning && !isAuthTransitioning) {
      setIsTransitioning(true);
      setIsAuthTransitioning(true);
      
      // Fade out da tela atual e mostrar overlay
      setTimeout(() => {
        setCurrentScreen('tutorial');
      }, 1000);
      
      // Reset dos estados de transição após a animação completa
      setTimeout(() => {
        setIsTransitioning(false);
        setIsAuthTransitioning(false);
      }, 2000);
    }
  };

  const navigateToHome = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentScreen('home');
        setIsTransitioning(false);
      }, 300);
    }
  };

  const navigateToWelcome = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentScreen('welcome');
        setIsTransitioning(false);
      }, 300);
    }
  };

  return (
    <div className={`App ${currentScreen === 'tutorial' ? 'tutorial-active' : ''} ${currentScreen === 'login' ? 'login-active' : ''} ${isAuthTransitioning ? 'auth-transitioning' : ''}`}>
      <div className="content-area">
        <div className={`content-container ${currentScreen === 'welcome' && !isTransitioning ? 'active' : ''} ${isAuthTransitioning && currentScreen !== 'welcome' ? 'fade-out' : ''}`}>
          <Welcome onNavigateToRegister={navigateToRegister} onNavigateToLogin={navigateToLogin} />
        </div>
        <div className={`content-container ${currentScreen === 'login' && !isTransitioning ? 'active' : ''} ${isAuthTransitioning && currentScreen !== 'login' ? 'fade-out' : ''}`}>
          <Login onNavigateToRegister={navigateToRegister} onBack={navigateToWelcome} onLogin={navigateToTutorial} />
        </div>
        <div className={`content-container ${currentScreen === 'register' && !isTransitioning ? 'active' : ''} ${isAuthTransitioning && currentScreen !== 'register' ? 'fade-out' : ''}`}>
          <Register onBack={navigateToWelcome} onRegister={navigateToTutorial} />
        </div>
        <div className={`content-container ${currentScreen === 'tutorial' && !isTransitioning ? 'active' : ''} ${currentScreen === 'tutorial' && isAuthTransitioning ? 'tutorial-enter' : ''}`}>
          <Tutorial onNavigateToHome={navigateToHome} />
        </div>
      </div>
      
      {/* Ondas fixas */}
      <div className="fixed-waves-container">
        <img src={camada1} alt="Ondas decorativas" className="fixed-waves-image" />
      </div>
      
      {/* Overlay de transição sofisticado */}
      <TransitionOverlay isVisible={isAuthTransitioning} />
    </div>
  );
}

export default App;
