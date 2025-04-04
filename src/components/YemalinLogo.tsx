
import React from 'react';

interface YemalinLogoProps {
  className?: string;
}

const YemalinLogo: React.FC<YemalinLogoProps> = ({ className = 'h-10 w-auto' }) => {
  return (
    <div className={`relative ${className}`}>
      <img 
        src="/lovable-uploads/05041e4a-fbae-449d-817c-6ca1b7719e39.png" 
        alt="Yemalin" 
        className="h-full w-auto" 
      />
    </div>
  );
};

export default YemalinLogo;
