import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const ServerName: React.FC = () => (
  <div className="ServerName">
    <h1 className="title">BlackHole</h1>
    <FontAwesomeIcon icon={faAngleDown} className="expandIcon" />
  </div>
);

export default ServerName;
