import React from 'react';

// We'll add the specific CSS for the sidebar in our main App.css file
// so we don't need to import a separate stylesheet here.

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h3>AI Meeting Buddy</h3>
      </div>
      <ul className="nav-list">
        <li className="nav-item active">
          {/* In a real app, you would use React Router's <Link> component here */}
          <a href="#">
            🏠&nbsp; Home
          </a>
        </li>
        <li className="nav-item">
          <a href="#">
            📅&nbsp; Scheduler
          </a>
        </li>

        <li className="nav-item">
          <a href="#">
            ✅&nbsp; Follow Ups
          </a>
        </li>

        <li className="nav-item">
          <a href="#">
            🔔&nbsp; Reminders
          </a>
        </li>

        <li className="nav-item">
          <a href="#">
            ⚙️&nbsp; Settings
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;