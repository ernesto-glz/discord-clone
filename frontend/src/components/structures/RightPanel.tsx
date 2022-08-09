import React from 'react';

const RightPanel: React.FC = () => (
  <div className="right-panel">
    <h3 className="title">Active Now</h3>
    <div className="empty-card">
      <h5 className="sub-title">It's quiet for now...</h5>
      <div className="content">
        When a friend starts an activity—like playing a game or hanging out on
        voice—we'll show it here!
      </div>
    </div>
  </div>
);

export default RightPanel;
