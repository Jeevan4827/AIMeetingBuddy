import React from 'react';
import InstantScheduleCard from '../components/InstantScheduleCard';
import KeyContextCard from '../components/KeyContextCard';
import AgendaCard from '../components/AgendaCard';
import FollowUpCard from '../components/FollowUpCard';

const HomePage = ({ scheduleData, contextData, agendaData, followUpsData }) => {
  return (
    <>
      <header className="app-header">
        <h2>Meeting: Zoho (Chennai) & Distributor (Germany)</h2>
      </header>
      <main className="dashboard-grid">
        {/* Pass contextData down to the schedule card to get the title */}
        <InstantScheduleCard scheduleData={scheduleData} contextData={contextData} />
        <KeyContextCard contextData={contextData} />
        <AgendaCard agendaData={agendaData} />
        <FollowUpCard followUpsData={followUpsData} />
      </main>
    </>
  );
};

export default HomePage;