import React from 'react';

const KeyContextCard = ({ contextData }) => {
  // Gracefully handle the case where data might not be loaded yet
  if (!contextData) {
    return (
      <div className="card">
        <h3>📊&nbsp; Key Context</h3>
        <p>Loading context...</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>📊&nbsp; Key Context</h3>
      <div className="card-content">
        <h4>{contextData.title}</h4>
        <p>{contextData.detail}</p>
      </div>
    </div>
  );
};

export default KeyContextCard;