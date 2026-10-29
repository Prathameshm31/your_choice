import React from 'react';
import { brandConfig } from '../../config/brand';
import './AnnouncementBar.css';

const AnnouncementBar = () => {
  return (
    <div className="announcement-bar">
      <p>{brandConfig.defaultAnnouncement}</p>
    </div>
  );
};

export default AnnouncementBar;
