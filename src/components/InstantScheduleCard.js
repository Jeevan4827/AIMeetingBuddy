import React from 'react';

const InstantScheduleCard = ({ scheduleData }) => {
  const findNextAvailableSlot = () => {
    if (!scheduleData || !scheduleData.slots) return null;

    const now = new Date();
    // Set availability to 30 mins from now
    const availabilityStarts = new Date(now.getTime() + 30 * 60 * 1000);

    // Find the first slot that starts after the availability time and is at least 1 hour long
    const nextSlot = scheduleData.slots.find(slot => {
        const slotStart = new Date(slot.start);
        const slotEnd = new Date(slot.end);
  
        // New: Calculate the duration of the slot in milliseconds
        const durationMs = slotEnd.getTime() - slotStart.getTime();
        const oneHourMs = 60 * 60 * 1000;
  
        // Updated: Check both conditions - must be in the future AND have sufficient duration
        return slotStart > availabilityStarts && durationMs >= oneHourMs;
    });

    return nextSlot;
  };

  const nextSlot = findNextAvailableSlot();

  const formatTime = (date) => {
    return date.toLocaleString('en-IN', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'Asia/Kolkata' // IST
    });
  };

  const formatDate = (date) => {
    // Check if the date is today, tomorrow, or another day
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }
    return date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' });
  };


  return (
    <div className="card">
      <h3>🕒&nbsp; Instant Schedule</h3>
      <div className="card-content">
        {nextSlot ? (
          <div className="schedule-info">
            <p>Next available slot is:</p>
            <div className="time">{formatTime(new Date(nextSlot.start))} - {formatTime(new Date(nextSlot.end))}</div>
            <div className="date">{formatDate(new Date(nextSlot.start))}</div>
            <button className="button-primary">Schedule Now</button>
          </div>
        ) : (
          <p>No available slots found for the near future.</p>
        )}
      </div>
    </div>
  );
};

export default InstantScheduleCard;