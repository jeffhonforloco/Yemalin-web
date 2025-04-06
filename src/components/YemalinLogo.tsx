
import React from 'react';

interface YemalinLogoProps {
  className?: string;
  onClick?: () => void;
}

const YemalinLogo = ({ className = 'h-12 w-auto', onClick }: YemalinLogoProps) => {
  return (
    <div 
      className={`relative ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <img 
        src="/lovable-uploads/05041e4a-fbae-449d-817c-6ca1b7719e39.png" 
        alt="Yemalin" 
        className="h-full w-auto" 
      />
    </div>
  );
};

export default YemalinLogo;
