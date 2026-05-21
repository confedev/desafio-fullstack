import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'outline';
  icon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', icon, className = '', ...props }) => {
  const baseClass = `btn btn-${variant} ${icon ? 'btn-icon' : ''} ${className}`;
  return (
    <button className={baseClass} {...props}>
      {children}
    </button>
  );
};
