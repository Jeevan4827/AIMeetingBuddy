import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SchedulerPage = ({ scheduleData, contextData }) => {
  const { state: navState } = useLocation();

  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // months are 0-based
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  // --- State Management ---
  const [mode, setMode] = useState('discovery');
  const [date, setDate] = useState(getTodayDate());
  const [duration, setDuration] = useState('60');
  const [title, setTitle] = useState('');
  const [timeSlot, setTimeSlot] = useState('');

  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Helper function to format time
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-IN', { hour: 'numeric', minute: 'numeric', hour12: true });
  };
  
  useEffect(() => {
    if (navState?.startTime) {
      setMode('prefilled');
      setDate(new Date(navState.startTime).toISOString().split('T')[0]);
      setTitle(navState.title || '');
      setTimeSlot(`${formatTime(navState.startTime)} - ${formatTime(navState.endTime)}`);
    } else {
      setMode('discovery');
      setTitle(contextData?.title || 'Follow-up Meeting');
    }
  }, [navState, contextData]);


  // --- Updated handleSubmit Function ---
  const handleSubmit = (e) => {
    e.preventDefault();
    let meetingDetails;

    if (mode === 'prefilled') {
      // Logic for prefilled mode is already correct
      meetingDetails = `Title: ${title}\nDate: ${date}\nTime Slot: ${timeSlot}`;
    } else {
      // Updated logic for discovery mode
      if (!selectedSlot) { 
        alert('Please select a time slot.'); 
        return; 
      }
      
      // 1. Find the full slot object from the availableSlots array
      const fullSlot = availableSlots.find(slot => slot.start === selectedSlot);

      if (!fullSlot) {
        alert('Error: Could not find the selected slot. Please try again.');
        return;
      }

      // 2. Create the same "Time Slot" string format
      const finalTimeSlot = `${formatTime(fullSlot.start)} - ${formatTime(fullSlot.end)}`;
      
      // 3. Construct the final details string
      meetingDetails = `Title: ${title}\nDate: ${date}\nTime Slot: ${finalTimeSlot}`;
    }
    
    alert(`Meeting Request Sent!\n\n${meetingDetails}`);
  };

  const handleFindSlots = (e) => {
    e.preventDefault(); setHasSearched(true); setSelectedSlot('');
    if (!date || !duration) { setAvailableSlots([]); return; }
    const foundSlots = scheduleData.slots.filter(slot => {
      if (slot.start.split('T')[0] !== date) return false;
      const slotDuration = (new Date(slot.end) - new Date(slot.start)) / (60 * 1000);
      return slotDuration >= parseInt(duration, 10);
    });
    setAvailableSlots(foundSlots);
  };
  
  const formatSlotForDisplay = (slot) => {
    const startTime = formatTime(slot.start);
    const endTime = formatTime(slot.end);
    return `${startTime} - ${endTime}`;
  };

  return (
    <>
      <header className="app-header">
        <h2>Schedule a New Meeting</h2>
      </header>
      <div className="scheduler-container">
        <form className="scheduler-form" onSubmit={handleSubmit}>
          {/* Title and Date inputs */}
          <div className="form-group">
            <label htmlFor="title">Meeting Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} disabled={mode === 'prefilled'}/>
          </div>

          {/* Conditionally Render Time Slot or Duration */}
          {mode === 'prefilled' ? (
            <div className="form-group">
              <label htmlFor="timeSlot">Time Slot</label>
              <input 
                type="text"
                id="timeSlot"
                value={timeSlot}
                readOnly
              />
            </div>
          ) : (
            <div className="form-group">
              <label htmlFor="duration">Duration (in minutes)</label>
              <input type="number" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g., 60"/>
            </div>
          )}

          {/* Conditional UI for Discovery Mode */}
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