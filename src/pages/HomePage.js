import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import InstantScheduleCard from '../components/InstantScheduleCard';
import KeyContextCard from '../components/KeyContextCard';
import AgendaCard from '../components/AgendaCard';
import FollowUpCard from '../components/FollowUpCard';

const HomePage = () => {
  const { user } = useAuth(); // Get the logged-in user
  const [loading, setLoading] = useState(true);
  const [scheduleData, setScheduleData] = useState(null);
  const [contextData, setContextData] = useState(null);
  const [agendaData, setAgendaData] = useState(null);
  const [followUpsData, setFollowUpsData] = useState(null);

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
    });
  }, []);

  if (loading) {
    return <div className="loading-screen">Loading Meeting Data...</div>;
  }
  
  return (
    <>
      <header className="app-header">
        {/* Dynamic Header based on user type */}
        <h2>
          {user.type === 'vendor' 
            ? `Vendor: ${user.name}` 
            : `Distributor: ${user.name}`}
        </h2>
      </header>
      <main className="dashboard-grid">
        <InstantScheduleCard scheduleData={scheduleData} contextData={contextData} />
        <KeyContextCard contextData={contextData} />
        <AgendaCard agendaData={agendaData} />
        <FollowUpCard followUpsData={followUpsData} />
      </main>
    </>
  );
};

export default HomePage;