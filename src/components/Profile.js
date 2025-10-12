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

const Profile = ({ onNavigateToSettings, onNavigateToHome }) => {
  // Dados mock do usuário - em um app real viria de uma API/banco de dados
  const userData = {
    name: "Julia Verônica",
    profileImage: null, // Placeholder - será uma imagem padrão
    bottlesCollected: 10,
    tShirtsEarned: 1,
    objectives: "Estou no app com objetivo em ser uma pessoa aficional da Reciclo :)",
    achievements: [
      { id: 1, icon: "🍶", title: "Reciclou 10 garrafas", earned: true },
      { id: 2, icon: "🚗", title: "Visitou 5 locais de coleta", earned: true },
      { id: 3, icon: "🌊", title: "Reciclou em 5 pontos diferentes", earned: false },
      { id: 4, icon: "🏆", title: "Chegou ao top 10 do ranking", earned: false }
    ],
    posts: Array(8).fill(null) // 8 posts vazios para a grid
  };

  return (
    <div className="profile-container">
      {/* Header com configurações */}
      <div className="profile-header">
        <button className="settings-button" onClick={onNavigateToSettings}>
          <img src={engrenagem} alt="Configurações" className="settings-icon" />
        </button>
        
        {/* Foto de perfil */}
        <div className="profile-photo-section">
          <div className="profile-photo">
            {userData.profileImage ? (
              <img src={userData.profileImage} alt="Foto de perfil" className="profile-image" />
            ) : (
              <div className="profile-placeholder">
                <span className="profile-initial">{userData.name.charAt(0)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="profile-content">
        {/* Nome do usuário */}
        <h1 className="profile-name">{userData.name}</h1>
        
        {/* Objetivo */}
        <div className="profile-objective">
          <p>{userData.objectives}</p>
        </div>

        {/* Estatísticas */}
        <div className="profile-stats">
          <div className="stat-card bottles-card">
            <div className="stat-info">
              <h3>Quantidade de garrafas coletadas por você:</h3>
              <div className="stat-number">{userData.bottlesCollected}</div>
            </div>
            <div className="stat-icon bottles-icon">
              🍶
            </div>
          </div>
          
          <div className="stat-card shirts-card">
            <div className="stat-info">
              <h3>Faltam 4 garrafas para uma camiseta</h3>
            </div>
            <div className="stat-icon shirt-icon">
              👕
            </div>
          </div>
        </div>

        {/* Conquistas */}
        <div className="profile-section">
          <h2 className="section-title">Conquistas:</h2>
          <div className="achievements-grid">
            {userData.achievements.map((achievement) => (
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
            {userData.posts.map((_, index) => (
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
