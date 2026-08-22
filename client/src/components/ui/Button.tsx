import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: React.ReactNode;
}

export function Button({ children, variant = 'primary', icon, className = '', ...props }: ButtonProps) {
  // O CSS global e as regras de App.css/index.css já definem o estilo de <button>.
  // Adicionamos classes de variação, mas o padrão do AURA (bordas 25px, cor azul, font Open Sans)
  // já é nativamente respeitado.
  
  const baseClass = "btn";
  const variantClass = `btn-${variant}`;
  
  return (
    <button 
      className={`${baseClass} ${variantClass} ${className}`}
      {...props}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
}
