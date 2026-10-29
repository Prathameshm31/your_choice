import React from 'react';
import { brandConfig } from '../../config/brand';

const Logo = ({ className = '', style = {} }) => {
  const [imgError, setImgError] = React.useState(false);

  const handleError = () => {
    setImgError(true);
  };

  if (imgError) {
    return (
      <div className={className} style={{ ...style, fontFamily: 'Georgia, serif', fontSize: '1.5rem', fontWeight: '600', letterSpacing: '0.05em' }}>
        {brandConfig.displayName.toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={brandConfig.logoPath}
      alt={brandConfig.displayName}
      className={className}
      style={{ height: '50px', width: 'auto', objectFit: 'contain', ...style }}
      onError={handleError}
    />
  );
};

export default Logo;
