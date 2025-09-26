import React from 'react';

const AgendaCard = ({ agendaData }) => {
  if (!agendaData || !agendaData.items) {
    return (
      <div className="card">
        <h3>📝&nbsp; AI Generated Agenda</h3>
        <p>Loading agenda...</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>📝&nbsp; AI Generated Agenda</h3>
      <div className="card-content">
        <ol className="agenda-list">
          {agendaData.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default AgendaCard;