import React, { useState, useEffect } from 'react';
import './App.css';

import Sidebar from './components/Sidebar';
import InstantScheduleCard from './components/InstantScheduleCard';
import KeyContextCard from './components/KeyContextCard';
import AgendaCard from './components/AgendaCard';
import FollowUpCard from './components/FollowUpCard';

function App() {
  const [scheduleData, setScheduleData] = useState(null);
  const [contextData, setContextData] = useState(null);
  const [agendaData, setAgendaData] = useState(null);
  const [followUpsData, setFollowUpsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/schedule.json').then(res => res.json()),
      fetch('/context.json').then(res => res.json()),
      fetch('/agenda.json').then(res => res.json()),
      fetch('/follow_ups.json').then(res => res.json()),
    ])
    .then(([schedule, context, agenda, followUps]) => {
      setScheduleData(schedule);
      setContextData(context);
      setAgendaData(agenda);
      setFollowUpsData(followUps);
      setLoading(false);
    })
    .catch(error => {
      console.error("Failed to fetch data:", error);
      setLoading(false);
    });
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <header className="app-header">
          <h2>Meeting: Zoho (Chennai) & Distributor (Germany)</h2>
        </header>

        {loading ? (
          <div className="loading-screen">Loading Meeting Data...</div>
        ) : (
          <main className="dashboard-grid">
            <InstantScheduleCard scheduleData={scheduleData} />
            <KeyContextCard contextData={contextData} />
            <AgendaCard agendaData={agendaData} />
            <FollowUpCard followUpsData={followUpsData} />
          </main>
        )}
      </div>
    </div>
  );
}

export default App;