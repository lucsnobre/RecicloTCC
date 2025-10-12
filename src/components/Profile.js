import React from 'react';
import './Profile.css';
import engrenagem from '../assets/engrenagem.png';
import navPerfil from '../assets/tutorial_3.png';
import navMapa from '../assets/tutorial_2.png';
import navRanking from '../assets/tutorial_6.png';
import navHome from '../assets/tutorial_1.png';
import navComunidade from '../assets/tutorial_4.png';
import navChat from '../assets/tutorial_8.png';
import navNotif from '../assets/tutorial_5.png';
import navBusca from '../assets/tutorial_7.png';

const Profile = ({ onNavigateToSettings, onNavigateToHome, userData }) => {
  // Dados padrão caso o usuário não tenha se cadastrado ainda
  const defaultUserData = {
    name: "Usuário",
    profileImage: null,
    bottlesCollected: 0,
    tShirtsEarned: 0,
    objectives: "Bem-vindo ao Reciclo! Complete seu cadastro para personalizar seu perfil.",
    achievements: [
      { id: 1, icon: "🍶", title: "Reciclar 10 garrafas", earned: false },
      { id: 2, icon: "🚗", title: "Visitar 5 locais de coleta", earned: false },
      { id: 3, icon: "🌊", title: "Reciclar em 5 pontos diferentes", earned: false },
      { id: 4, icon: "🏆", title: "Chegar ao top 10 do ranking", earned: false }
    ],
    posts: Array(8).fill(null) // 8 posts vazios para a grid
  };

  // Usar dados do usuário ou dados padrão
  const currentUserData = {
    ...defaultUserData,
    ...userData,
    // Sempre manter as conquistas e posts
    achievements: defaultUserData.achievements,
    posts: defaultUserData.posts
  };

  // Atualizar conquistas baseado no progresso
  if (currentUserData.bottlesCollected >= 10) {
    currentUserData.achievements[0].earned = true;
  }

  return (
    <div className="profile-container">
      {/* Header com configurações */}
      <div className="profile-header">
        {/* Ícone do sol */}
        <div className="sun-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        </div>
        
        <button className="settings-button" onClick={onNavigateToSettings}>
          <img src={engrenagem} alt="Configurações" className="settings-icon" />
        </button>
        
        {/* Foto de perfil */}
        <div className="profile-photo-section">
          <div className="profile-photo">
            {currentUserData.profileImage ? (
              <img src={currentUserData.profileImage} alt="Foto de perfil" className="profile-image" />
            ) : (
              <div className="profile-placeholder">
                <span className="profile-initial">{currentUserData.name.charAt(0)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="profile-content">
        {/* Nome do usuário */}
        <h1 className="profile-name">{currentUserData.name}</h1>
        
        {/* Objetivo */}
        <div className="profile-objective">
          <p>{currentUserData.objectives}</p>
        </div>

        {/* Estatísticas */}
        <div className="profile-stats">
          <div className="stat-card bottles-card">
            <div className="stat-info">
              <h3>Quantidade de garrafas coletadas por você:</h3>
              <div className="stat-number">{currentUserData.bottlesCollected}</div>
            </div>
            <div className="stat-icon bottles-icon">
              🍶
            </div>
          </div>
          
          <div className="stat-card shirts-card">
            <div className="stat-icon shirt-icon">
              👕
            </div>
            <div className="stat-info">
              <h3>Faltam {Math.max(0, 10 - currentUserData.bottlesCollected)} garrafas para uma camiseta</h3>
            </div>
          </div>
        </div>

        {/* Conquistas */}
        <div className="profile-section">
          <h2 className="section-title">Conquistas:</h2>
          <div className="achievements-grid">
            {currentUserData.achievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`achievement-item ${achievement.earned ? 'earned' : 'not-earned'}`}
              >
                <div className="achievement-icon">{achievement.icon}</div>
                <p className="achievement-title">{achievement.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Posts */}
        <div className="profile-section">
          <h2 className="section-title">Posts Feitos:</h2>
          <div className="posts-grid">
            {currentUserData.posts.map((_, index) => (
              <div key={index} className="post-placeholder">
                <div className="post-content"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Barra de navegação */}
      <div className="profile-navigation">
        <button className="nav-button active" aria-label="Perfil">
          <img src={navPerfil} alt="Perfil" className="nav-icon-image" />
        </button>
        <button className="nav-button" aria-label="Mapa">
          <img src={navMapa} alt="Mapa" className="nav-icon-image" />
        </button>
        <button className="nav-button" aria-label="Ranking">
          <img src={navRanking} alt="Ranking" className="nav-icon-image" />
        </button>
        <button className="nav-button" onClick={onNavigateToHome} aria-label="Home">
          <img src={navHome} alt="Home" className="nav-icon-image" />
        </button>
        <button className="nav-button" aria-label="Comunidade">
          <img src={navComunidade} alt="Comunidade" className="nav-icon-image" />
        </button>
        <button className="nav-button" aria-label="Chat">
          <img src={navChat} alt="Chat" className="nav-icon-image" />
        </button>
        <button className="nav-button" aria-label="Notificações">
          <img src={navNotif} alt="Notificações" className="nav-icon-image" />
        </button>
        <button className="nav-button" aria-label="Busca">
          <img src={navBusca} alt="Busca" className="nav-icon-image" />
        </button>
      </div>
    </div>
  );
};

export default Profile;
