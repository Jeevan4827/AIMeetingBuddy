import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import SchedulerPage from './pages/SchedulerPage'; 

function App() {
  const [scheduleData, setScheduleData] = useState(null);
  const [contextData, setContextData] = useState(null);
  const [agendaData, setAgendaData] = useState(null);
  const [followUpsData, setFollowUpsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Data fetching remains the same
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
    });
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        {loading ? (
          <div className="loading-screen">Loading App Data...</div>
        ) : (
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  scheduleData={scheduleData}
                  contextData={contextData}
                  agendaData={agendaData}
                  followUpsData={followUpsData}
                />
              } 
            />
            <Route 
              path="/scheduler" 
              element={<SchedulerPage scheduleData={scheduleData} contextData={contextData} />} 
            />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;