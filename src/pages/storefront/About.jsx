import React from 'react';
import { brandConfig } from '../../config/brand';

const About = () => {
  return (
    <div style={{ padding: '3rem 0 4rem', backgroundColor: 'var(--warm-ivory)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>About {brandConfig.displayName}</h1>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem', color: 'var(--secondary-gray)' }}>
          {brandConfig.displayName} is a premium men's fashion brand dedicated to delivering modern essentials 
          designed for confidence, comfort, and timeless style. We curate a sophisticated collection of clothing 
          and accessories that blend contemporary aesthetics with classic elegance.
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem', color: 'var(--secondary-gray)' }}>
          Our philosophy is simple: {brandConfig.tagline.toLowerCase()}. Every piece is thoughtfully selected 
          to help you express your unique style with sophistication and grace.
        </p>
      </div>
    </div>
  );
};

export default About;
