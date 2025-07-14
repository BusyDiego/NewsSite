import React from 'react';
import './Text.css';

interface TextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption';
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'muted';
  className?: string;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  color,
  className = '',
}) => {
  const Tag = variant === 'body' || variant === 'caption' ? 'p' : variant;
  
  return (
    <Tag 
      className={`text text--${variant} ${color ? `text--${color}` : ''} ${className}`}
    >
      {children}
    </Tag>
  );
};