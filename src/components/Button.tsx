import React from 'react';
import classNames from 'classnames';

interface ButtonProps {
  variant: 'fill' | 'outline';
  color: 'primary' | 'secondary' | 'tertiary';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  color,
  className,
  children,
  onClick,
}) => {
  const baseClasses = 'font-montserrat font-semibold px-4 py-2 rounded-md transition-colors duration-300';
  const variantClasses = variant === 'fill' ? `bg-${color} text-white` : `border border-2 border-${color} text-${color}`;
  const hoverClasses = variant === 'fill' ? `hover:bg-transparent hover:text-${color} hover:border-${color}` : `hover:bg-${color} hover:border-2 hover:text-white`;

  const combinedClasses = classNames(baseClasses, variantClasses, hoverClasses, className);

  return (
    <button className={combinedClasses} onClick={onClick}>      
      {children}      
    </button>
  );
};

export default Button;
