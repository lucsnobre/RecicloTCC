import React from 'react';

const LogoPlaceholder = () => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* Centro da flor */}
      <circle cx="100" cy="100" r="20" fill="#FFA500" />
      
      {/* Pétalas */}
      <g transform="translate(100, 100)">
        {/* Pétala superior */}
        <ellipse cx="0" cy="-40" rx="25" ry="35" fill="white" transform="rotate(0)" />
        {/* Pétala superior direita */}
        <ellipse cx="0" cy="-40" rx="25" ry="35" fill="white" transform="rotate(60)" />
        {/* Pétala inferior direita */}
        <ellipse cx="0" cy="-40" rx="25" ry="35" fill="white" transform="rotate(120)" />
        {/* Pétala inferior */}
        <ellipse cx="0" cy="-40" rx="25" ry="35" fill="white" transform="rotate(180)" />
        {/* Pétala inferior esquerda */}
        <ellipse cx="0" cy="-40" rx="25" ry="35" fill="white" transform="rotate(240)" />
        {/* Pétala superior esquerda */}
        <ellipse cx="0" cy="-40" rx="25" ry="35" fill="white" transform="rotate(300)" />
      </g>
    </svg>
  );
};

export default LogoPlaceholder;
