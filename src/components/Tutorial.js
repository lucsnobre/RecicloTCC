import React from 'react';
import './Tutorial.css';
import logoFlor from '../assets/logo-flor.png';
import tutorial1 from '../assets/tutorial_1.png';
import tutorial2 from '../assets/tutorial_2.png';
import tutorial3 from '../assets/tutorial_3.png';
import tutorial4 from '../assets/tutorial_4.png';
import tutorial5 from '../assets/tutorial_5.png';
import tutorial6 from '../assets/tutorial_6.png';
import tutorial7 from '../assets/tutorial_7.png';

// Ícones para navegação
import navPerfil from '../assets/tutorial_3.png';    // Perfil
import navMapa from '../assets/tutorial_2.png';      // Mapa  
import navRanking from '../assets/tutorial_6.png';   // Ranking
import navHome from '../assets/tutorial_1.png';      // Home
import navComunidade from '../assets/tutorial_4.png'; // Comunidade
import navNotif from '../assets/tutorial_5.png';     // Notificações
import navBusca from '../assets/tutorial_7.png';     // Busca
import navChat from '../assets/tutorial_8.png';       // Chat
import engrenagem from '../assets/engrenagem.png';   // Configurações

const Tutorial = ({ onNavigateToHome, onNavigateToProfile, onNavigateToSettings }) => {
  const tutorialItems = [
    {
      id: 1,
      title: "Tela de início da aplicação reciclo",
      icon: tutorial1
    },
    {
      id: 2,
      title: "Mapa de pontos de coleta",
      icon: tutorial2
    },
    {
      id: 3,
      title: "Seu perfil de usuário",
      icon: tutorial3
    },
    {
      id: 4,
      title: "Comunidade Verde, compartilhe experiências, vídeos e fotos",
      icon: tutorial4
    },
    {
      id: 5,
      title: "Notificações e personalização",
      icon: tutorial5
    },
    {
      id: 6,
      title: "Ranking de reciclagem",
      icon: tutorial6
    },
    {
      id: 7,
      title: "Pesquisas por abas ou informações dentro do app",
      icon: tutorial7
    }
  ];

  const navigationItems = [
    { id: 1, icon: navPerfil, label: "Perfil" },
    { id: 2, icon: navMapa, label: "Mapa" },
    { id: 3, icon: navRanking, label: "Ranking" },
    { id: 4, icon: navHome, label: "Home" },
    { id: 5, icon: navComunidade, label: "Comunidade" },
    { id: 6, icon: navChat, label: "Chat" },
    { id: 7, icon: navNotif, label: "Notificações" },
    { id: 8, icon: navBusca, label: "Busca" }
  ];

  return (
    <div className="tutorial-container">
      {/* Header */}
      <div className="tutorial-header">
        <div className="settings-icon" onClick={onNavigateToSettings}>
          <img src={engrenagem} alt="Configurações" className="settings-icon-image" />
        </div>
        <h1 className="tutorial-app-title">Reciclo</h1>
        
        {/* Logo */}
        <div className="tutorial-logo">
          <img src={logoFlor} alt="Logo Flor" className="logo-flor-image" />
        </div>
        
        <h2 className="functions-title">FUNÇÕES</h2>
      </div>

      {/* Main Content Card */}
      <div className="tutorial-content">
        <div className="tutorial-card">
          <h3 className="tutorial-welcome-title">
            Bem vindo as funções do site<br />
            Reciclo!
          </h3>
          
          <div className="tutorial-list">
            {tutorialItems.map((item, index) => (
              <div key={item.id} className="tutorial-item" style={{animationDelay: `${0.2 + index * 0.1}s`}}>
                <div className="tutorial-item-icon">
                  <img src={item.icon} alt={`Ícone ${item.id}`} className="tutorial-icon-image" />
                </div>
                <span className="tutorial-item-text">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="tutorial-navigation">
        {navigationItems.map((item, index) => (
          <button 
            key={item.id} 
            className="nav-item"
            style={{
              animationDelay: `${1.5 + index * 0.05}s`,
              '--item-index': index
            }}
            onClick={() => {
              if (item.id === 1 && onNavigateToProfile) onNavigateToProfile(); // Perfil
              if (item.id === 4 && onNavigateToHome) onNavigateToHome(); // Home
            }}
          >
            <img src={item.icon} alt={item.label} className="nav-icon-image" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tutorial;
