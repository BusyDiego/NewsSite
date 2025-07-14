import React from 'react';
import { Text, Image } from '../atoms';
import './Card.css';

interface CardProps {
  title: string;
  description?: string;
  image?: {
    src: string;
    alt: string;
  };
  children?: React.ReactNode;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  children,
  onClick,
}) => {
  return (
    <div className={`card ${onClick ? 'card--clickable' : ''}`} onClick={onClick}>
      {image && (
        <div className="card-image">
          <Image src={image.src} alt={image.alt} />
        </div>
      )}
      <div className="card-content">
        <Text variant="h3" className="card-title">
          {title}
        </Text>
        {description && (
          <Text variant="body" className="card-description">
            {description}
          </Text>
        )}
        {children && <div className="card-children">{children}</div>}
      </div>
    </div>
  );
};