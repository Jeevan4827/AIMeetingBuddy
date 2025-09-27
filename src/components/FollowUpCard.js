import React from 'react';

const FollowUpCard = ({ followUpsData }) => {
  if (!followUpsData || !followUpsData.items || followUpsData.items.length === 0) {
    return (
      <div className="card">
        <h3>✅&nbsp; Follow up from last meet</h3>
        <div className="card-content">
          <p>No follow-ups found.</p>
        </div>
      </div>
    );
  }

  const allDates = followUpsData.items.map(item => item.date);
  const latestDate = allDates.sort().pop();

  // 2. Filter the items to get only those from the latest date.
  const latestFollowUps = followUpsData.items.filter(item => item.date === latestDate);

  const getStatusClass = (status) => {
    return (status || 'pending').toLowerCase();
  };

  return (
    <div className="card">
      <h3>
        ✅&nbsp; Follow up from last meet
      </h3>
      <div className="card-content">
        {/* 3. Map over the newly filtered 'latestFollowUps' array */}
        {latestFollowUps.map((item, index) => (
          <div key={item.id || index} className="follow-up-item">
            <p className="task-text">{item.task}</p>
            <span className={`status ${getStatusClass(item.status)}`}>
              {item.status || 'Pending'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowUpCard;