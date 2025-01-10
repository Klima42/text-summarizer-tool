// src/components/ui/card.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => (
  <div className={`card ${className}`}>{children}</div>
);

export const CardHeader: React.FC<CardProps> = ({ children, className }) => (
  <div className={`card-header ${className}`}>{children}</div>
);

export const CardTitle: React.FC<CardProps> = ({ children, className }) => (
  <h2 className={`card-title ${className}`}>{children}</h2>
);

export const CardContent: React.FC<CardProps> = ({ children, className }) => (
  <div className={`card-content ${className}`}>{children}</div>
);