import React from 'react';

interface CardProps {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      {children}
    </div>
  );
};
