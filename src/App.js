import React from 'react';
import './App.css';

// Componente do Logo (imagem)
const LogoIcon = () => (
  <img 
    src="/logo_reciclo.png" 
    alt="Reciclo Logo" 
    className="logo-image"
  />
);

// Componente das ondas
const WavesFooter = () => (
  <div className="waves-container">
    <svg className="waves" viewBox="0 0 400 120" preserveAspectRatio="none">
      <path className="wave-back" d="M0,60 C100,20 300,100 400,60 L400,120 L0,120 Z" fill="#F7931E" opacity="0.8"/>
      <path className="wave-middle" d="M0,80 C150,40 250,120 400,80 L400,120 L0,120 Z" fill="#F26722" opacity="0.9"/>
      <path className="wave-front" d="M0,100 C100,60 300,140 400,100 L400,120 L0,120 Z" fill="#FF5300"/>
    </svg>
  </div>
);

function App() {
  const handleWelcomeClick = () => {
    // Redireciona para tela de login
    alert('Redirecionando para Login...');
  };

  const handleCadastroClick = () => {
    // Redireciona para tela de cadastro
    alert('Redirecionando para Cadastro...');
  };

  return (
    <div className="app">
      <div className="container">
        <div className="main-card">
          {/* Logo e Título */}
          <div className="logo-section">
            <div className="logo-icon">
              <LogoIcon />
            </div>
            <h1 className="app-title">Reciclo</h1>
          </div>

          {/* Botão Bem Vindo */}
          <button className="welcome-button" onClick={handleWelcomeClick}>
            Bem Vindo
          </button>

          {/* Seção LOGIN */}
          <div className="login-section">
            <div className="section-title">
              <span className="line"></span>
              <span className="text">LOGIN</span>
              <span className="line"></span>
            </div>
          </div>

          {/* Texto "ou" */}
          <div className="or-text">ou</div>

          {/* Seção CADASTRO */}
          <div className="cadastro-section">
            <div className="section-title">
              <span className="line"></span>
              <span className="cadastro-text" onClick={handleCadastroClick}>
                clique aqui para o <span className="cadastro-highlight">CADASTRO</span>
              </span>
              <span className="line"></span>
            </div>
          </div>

          {/* Ondas do rodapé */}
          <WavesFooter />
        </div>
      </div>
    </div>
  );
}

export default App;
