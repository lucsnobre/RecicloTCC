import React from 'react';
import './Welcome.css';
import logo from '../assets/logo.png';
import camada1 from '../assets/Camada_1.png';

const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="content-wrapper">
        <div className="logo-section">
          <img src={logo} alt="Reciclo Logo" className="logo" />
          <h1 className="app-name">Reciclo</h1>
        </div>
        
        <button className="welcome-button">Bem Vindo</button>
        
        <div className="login-section">
          <div className="divider-container">
            <span className="divider-line left"></span>
            <span className="login-text">LOGIN</span>
            <span className="divider-line right"></span>
          </div>
        </div>
        
        <p className="or-text">ou</p>
        
        <div className="register-section">
          <div className="divider-container">
            <span className="divider-line left"></span>
            <span className="register-text">
              clique aqui para o<br />
              <span className="cadastro">CADASTRO</span>
            </span>
            <span className="divider-line right"></span>
          </div>
        </div>
      </div>
      
      <div className="waves-container">
        <img src={camada1} alt="Ondas decorativas" className="waves-image" />
      </div>
    </div>
  );
};

export default Welcome;
