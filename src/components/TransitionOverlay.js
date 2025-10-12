import React from 'react';
import './TransitionOverlay.css';
import logoFlor from '../assets/logo-flor.png';

const TransitionOverlay = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="transition-overlay">
      <div className="transition-content">
        <div className="loading-logo">
          <img src={logoFlor} alt="Carregando..." className="loading-logo-image" />
        </div>
        <div className="loading-text">Preparando sua experiência...</div>
        <div className="loading-particles">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="particle" 
              style={{
                '--delay': `${i * 0.2}s`,
                '--duration': `${2 + i * 0.1}s`
              }}
            />
          ))}
        </div>
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default TransitionOverlay;
