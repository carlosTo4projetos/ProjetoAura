import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Card({ children, className = '', style }: CardProps) {
  // A classe 'card' já existe no index.css com as regras globais
  // background: white; border-radius: 25px; box-shadow...
  return (
    <div className={`card ${className}`} style={style}>
      {children}
    </div>
  );
}
