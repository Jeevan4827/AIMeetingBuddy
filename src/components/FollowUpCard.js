import React from 'react';

const FollowUpCard = ({ followUpsData }) => {
  if (!followUpsData || !followUpsData.items) {
    return (
      <div className="card">
        <h3>✅&nbsp; Follow up from last meet</h3>
        <p>Loading follow-ups...</p>
      </div>
    );
  }

  // Helper function to get the right CSS class for each status
  const getStatusClass = (status) => {
    return status.toLowerCase(); // Returns 'done', 'overdue', or 'pending'
  };

  return (
    <div className="card">
      <h3>✅&nbsp; Follow up from last meet</h3>
      <div className="card-content">
        {followUpsData.items.map((item, index) => (
          <div key={index} className="follow-up-item">
            <p className="task-text">{item.task}</p>
            <span className={`status ${getStatusClass(item.status)}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowUpCard;