import React from 'react';
import './Welcome.css';
import logo from '../assets/logo.png';

const Welcome = ({ onNavigateToRegister, onNavigateToLogin }) => {
  return (
    <div className="welcome-container">
      <div className="content-wrapper">
        <div className="logo-section">
          <img src={logo} alt="Reciclo Logo" className="logo" />
          <h1 className="app-name">Reciclo</h1>
        </div>
        
        <button className="welcome-button" onClick={onNavigateToLogin}>Bem Vindo</button>
        
        <p className="or-text">ou</p>
        
        <div className="register-section">
          <div className="divider-container">
            <span className="divider-line left"></span>
            <span className="register-text">
              clique aqui para o<br />
              <span className="cadastro" onClick={onNavigateToRegister}>CADASTRO</span>
            </span>
            <span className="divider-line right"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
