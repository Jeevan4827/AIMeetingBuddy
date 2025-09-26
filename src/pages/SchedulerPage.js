import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

const SchedulerPage = () => {
  const { user, addNotification } = useAuth(); // Get the logged-in user for the header
  const { state: navState } = useLocation();

  // --- State for Data Fetching ---
  const [loading, setLoading] = useState(true);
  const [scheduleData, setScheduleData] = useState(null);
  const [contextData, setContextData] = useState(null);

  // --- State for Form Logic ---
  const [mode, setMode] = useState('discovery');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('60');
  const [title, setTitle] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Effect to fetch required data when the component mounts
  useEffect(() => {
    Promise.all([
      fetch('/schedule.json').then(res => res.json()),
      fetch('/context.json').then(res => res.json()),
    ])
    .then(([schedule, context]) => {
      setScheduleData(schedule);
      setContextData(context);
      setLoading(false); // Data fetching is complete
    });
  }, []); // Empty dependency array ensures this runs only once

  // Effect to set up the form's initial state after data has been fetched
  useEffect(() => {
    // Only run this logic after the initial data has loaded
    if (!loading) {
      if (navState?.startTime) {
        // USE CASE 1: Navigated from Home page (Prefilled Mode)
        setMode('prefilled');
        setDate(new Date(navState.startTime).toISOString().split('T')[0]);
        setTitle(navState.title || '');
        setTimeSlot(`${formatTime(navState.startTime)} - ${formatTime(navState.endTime)}`);
      } else {
        // USE CASE 2: Navigated from Sidebar (Discovery Mode)
        setMode('discovery');
        setTitle(contextData?.title || 'Follow-up Meeting');
        // Set the date to today by default in discovery mode
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        setDate(`${yyyy}-${mm}-${dd}`);
      }
    }
  }, [loading, navState, contextData]); // Re-run if any of these change

  // --- Helper Functions ---
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-IN', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  const handleFindSlots = (e) => {
    e.preventDefault();
    setHasSearched(true);
    setSelectedSlot('');
    if (!date || !duration || !scheduleData) {
      setAvailableSlots([]);
      return;
    }
    const foundSlots = scheduleData.slots.filter(slot => {
      if (slot.start.split('T')[0] !== date) return false;
      const slotDuration = (new Date(slot.end) - new Date(slot.start)) / (60 * 1000);
      return slotDuration >= parseInt(duration, 10);
    });
    setAvailableSlots(foundSlots);
  };

  const formatSlotForDisplay = (slot) => {
    return `${formatTime(slot.start)} - ${formatTime(slot.end)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let meetingDetails;
    if (mode === 'prefilled') {
      meetingDetails = `Title: ${title}\nDate: ${date}\nTime Slot: ${timeSlot}`;
    } else {
      if (!selectedSlot) { alert('Please select a time slot.'); return; }
      const fullSlot = availableSlots.find(slot => slot.start === selectedSlot);
      if (!fullSlot) { alert('Error: Slot not found.'); return; }
      const finalTimeSlot = formatSlotForDisplay(fullSlot);
      meetingDetails = `Title: ${title}\nDate: ${date}\nTime Slot: ${finalTimeSlot}`;
    }
    alert(`Meeting Request Sent!\n\n${meetingDetails}`);
    addNotification(meetingDetails, user); // Send the notification
  };

  // Render a loading state while fetching data
  if (loading) {
    return <div className="loading-screen">Loading Scheduler...</div>;
  }

  return (
    <>
      <header className="app-header">
        <h2 className="page-subtitle">Schedule a New Meeting</h2>
      </header>
      <div className="scheduler-container">
        <form className="scheduler-form" onSubmit={handleSubmit}>
          {/* Form fields */}
          <div className="form-group">
            <label htmlFor="title">Meeting Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} disabled={mode === 'prefilled'}/>
          </div>

          {mode === 'prefilled' ? (
            <div className="form-group">
              <label htmlFor="timeSlot">Time Slot</label>
              <input type="text" id="timeSlot" value={timeSlot} readOnly />
            </div>
          ) : (
            <div className="form-group">
              <label htmlFor="duration">Duration (in minutes)</label>
              <input type="number" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g., 60"/>
            </div>
          )}

          {mode === 'discovery' && (
            <>
              <button type="button" className="button-primary" onClick={handleFindSlots}>
                Find Available Slots
              </button>
              {hasSearched && (
                <div className="form-group" style={{ marginTop: '1.5rem' }}>
                  <label htmlFor="slots">Select a Time Slot</label>
                  <select id="slots" value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)}>
                    <option value="" disabled>{availableSlots.length > 0 ? `${availableSlots.length} slots found...` : 'No slots available.'}</option>
                    {availableSlots.map((slot, index) => (<option key={index} value={slot.start}>{formatSlotForDisplay(slot)}</option>))}
                  </select>
                </div>
              )}
            </>
          )}

          {(mode === 'prefilled' || selectedSlot) && (
            <button type="submit" className="button-primary">Send Request</button>
          )}
        </form>
      </div>
    </>
  );
};

export default SchedulerPage;